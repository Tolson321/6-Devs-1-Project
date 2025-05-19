"use server";

import { mistral } from "@ai-sdk/mistral";
import { put, del, list } from "@vercel/blob";
import { generateText } from "ai";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import type { PutBlobResult } from "@vercel/blob";
import { sharedDocuments, type SharedDocument } from "@/lib/shared-documents";

// Custom type definitions for Vercel Blob API
type BlobMetadata = {
  userId?: string;
  originalName?: string;
  uploadedAt?: string;
  expiresAt?: string;
};

type BlobWithMetadata = {
  url: string;
  pathname: string;
  size: number;
  contentType?: string;
  metadata?: BlobMetadata;
};

// Helper function to schedule blob deletion
async function scheduleBlobDeletion(blobUrl: string) {
  // Calculate one week from now in milliseconds
  const oneWeekFromNow = Date.now() + 7 * 24 * 60 * 60 * 1000;

  // Store the deletion schedule in a database or cache
  // For now, we'll use a simple setTimeout (Note: this is not persistent across server restarts)
  setTimeout(async () => {
    try {
      await del(blobUrl);
    } catch (error) {
      console.error(`Failed to delete blob ${blobUrl}:`, error);
    }
  }, oneWeekFromNow - Date.now());
}

// Helper function to store document for sharing
function storeDocumentForSharing(
  documentData: Omit<SharedDocument, "createdAt">
) {
  const shareId = nanoid();
  sharedDocuments.set(shareId, {
    ...documentData,
    createdAt: new Date().toISOString(),
  });

  // Schedule document deletion after 1 week
  setTimeout(() => {
    sharedDocuments.delete(shareId);
  }, 7 * 24 * 60 * 60 * 1000);

  return shareId;
}

export async function processDocument(formData: FormData, userId?: string) {
  let blob: PutBlobResult | null = null;
  try {
    // Get the file and target language from the form data
    const file = formData.get("file") as File;
    const targetLanguage =
      (formData.get("targetLanguage") as string) || "English";

    if (!file) {
      throw new Error("No file provided");
    }

    // Include user ID in filename if available
    const prefix = userId ? `user-${userId}/` : "";
    const filename = `${prefix}${nanoid()}-${file.name}`;

    // Calculate the expiry date (7 days from now)
    const uploadDate = new Date();
    const expiryDate = new Date(uploadDate);
    expiryDate.setDate(expiryDate.getDate() + 7);
    const expiresAt = expiryDate.toISOString();

    // Use @ts-ignore for metadata as the types may be outdated
    // @ts-ignore
    blob = await put(filename, file, {
      access: "public",
      cacheControlMaxAge: 60 * 60 * 24 * 7, // 1 week in seconds
      metadata: {
        userId: userId || "anonymous",
        originalName: file.name,
        uploadedAt: uploadDate.toISOString(),
        expiresAt: expiresAt,
      },
    });

    // Schedule the blob for deletion after 1 week
    if (blob.url) {
      await scheduleBlobDeletion(blob.url);
    }

    // Determine file type
    const fileType = file.type;
    const isImage = fileType.startsWith("image/");
    const isPdf = fileType === "application/pdf";

    if (!isImage && !isPdf) {
      throw new Error("Unsupported file type");
    }

    // Process document using Mistral OCR API
    let extractedText = "";

    // Direct API call to Mistral OCR endpoint
    const response = await fetch("https://api.mistral.ai/v1/ocr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-ocr-latest",
        document: {
          type: isImage ? "image_url" : "document_url",
          [isImage ? "image_url" : "document_url"]: blob.url,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OCR API error: ${errorData}`);
    }

    const ocrResult = await response.json();

    // Extract text from OCR result
    if (ocrResult.pages && ocrResult.pages.length > 0) {
      extractedText = ocrResult.pages
        .map((page: any) => page.markdown)
        .join("\n\n");
    } else {
      throw new Error("No text extracted from document");
    }

    // Use mistral-small-latest for language detection and translation
    const languageModel = mistral("mistral-small-latest");

    // Detect the source language
    const detectionResult = await generateText({
      model: languageModel,
      messages: [
        {
          role: "system",
          content:
            "You are a language detection expert. Identify the language of the provided text and respond with only the language name.",
        },
        {
          role: "user",
          content: extractedText.substring(0, 1000), // Use first 1000 chars for detection
        },
      ],
    });

    const sourceLanguage = detectionResult.text.trim();

    // Translate the extracted text to the target language
    const translationResult = await generateText({
      model: languageModel,
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate the following text from ${sourceLanguage} to ${targetLanguage}. Maintain the original formatting as much as possible.`,
        },
        {
          role: "user",
          content: extractedText,
        },
      ],
    });

    // Store document for sharing and generate share ID
    const shareId = storeDocumentForSharing({
      originalText: extractedText,
      translatedText: translationResult.text,
      sourceLanguage,
      targetLanguage,
      expiresAt,
    });

    // Generate shareable link
    const shareableLink = `${
      process.env.VERCEL_URL || "http://localhost:3000"
    }/share/${shareId}`;

    // Return the results
    const result = {
      originalText: extractedText,
      translatedText: translationResult.text,
      sourceLanguage,
      targetLanguage,
      shareableLink,
      expiresAt,
    };

    revalidatePath("/");
    return result;
  } catch (error) {
    console.error("Error processing document:", error);
    if (blob) {
      await del(blob.url);
    }
    throw new Error("Failed to process document");
  }
}

export async function getUserFiles(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // List all files in the user's folder
    const prefix = `user-${userId}/`;
    const { blobs } = await list({ prefix });

    // Format the results for display
    return (blobs as unknown as BlobWithMetadata[]).map((blob) => {
      const uploadedAt = blob.metadata?.uploadedAt || new Date().toISOString();

      // Calculate expiry date (7 days from upload)
      const uploadDate = new Date(uploadedAt);
      const expiryDate = new Date(uploadDate);
      expiryDate.setDate(expiryDate.getDate() + 7);

      // Use stored expiresAt or calculate if not available
      const expiresAt = blob.metadata?.expiresAt || expiryDate.toISOString();

      return {
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt,
        originalName:
          blob.metadata?.originalName ||
          blob.pathname.split("/").pop() ||
          "Unknown",
        contentType: blob.contentType || "application/octet-stream",
        expiresAt,
      };
    });
  } catch (error) {
    console.error("Error fetching user files:", error);
    throw new Error("Failed to fetch user files");
  }
}

export async function deleteUserFile(pathname: string) {
  try {
    await del(pathname);
    revalidatePath("/files");
    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
}
