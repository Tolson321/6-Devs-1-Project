"use server";

import { mistral } from "@ai-sdk/mistral";
import { generateText } from "ai";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

// Custom type definitions for file metadata
type FileMetadata = {
  userId?: string;
  originalName?: string;
  uploadedAt?: string;
  expiresAt?: string;
};

type FileWithMetadata = {
  url: string;
  pathname: string;
  size: number;
  contentType?: string;
  metadata?: FileMetadata;
};

// Helper function to schedule file deletion
async function scheduleFileDeletion(filePath: string) {
  // Calculate one week from now in milliseconds
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

  // Update the expires_at in the database
  const { error } = await supabase
    .from('files')
    .update({ expires_at: oneWeekFromNow.toISOString() })
    .eq('file_path', filePath);

  if (error) {
    console.error(`Failed to schedule file deletion for ${filePath}:`, error);
  }
}

// Helper function to store document for sharing
async function storeDocumentForSharing(documentData: {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  expiresAt: string;
}) {
  const shareId = nanoid();
  
  const { error } = await supabase
    .from('shared_documents')
    .insert({
      share_id: shareId,
      original_text: documentData.originalText,
      translated_text: documentData.translatedText,
      source_language: documentData.sourceLanguage,
      target_language: documentData.targetLanguage,
      expires_at: documentData.expiresAt
    });

  if (error) throw error;

  return shareId;
}

export async function getUserUploadsToday(userId: string) {
  if (!userId) return 0;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('files')
      .select('uploaded_at')
      .eq('user_id', userId)
      .gte('uploaded_at', today.toISOString());

    if (error) throw error;

    return data.length;
  } catch (error) {
    console.error("Error counting today's uploads:", error);
    return 0;
  }
}

export async function processDocument(formData: FormData, userId?: string) {
  let filePath: string | null = null;
  try {
    // Get the file and target language from the form data
    const file = formData.get("file") as File;
    const targetLanguage = (formData.get("targetLanguage") as string) || "English";

    if (!file) {
      throw new Error("No file provided");
    }

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId ? `user-${userId}/` : ''}${nanoid()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('files')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;
    filePath = uploadData.path;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('files')
      .getPublicUrl(fileName);

    // Calculate expiry date (7 days from now)
    const uploadDate = new Date();
    const expiryDate = new Date(uploadDate);
    expiryDate.setDate(expiryDate.getDate() + 7);

    // Store file metadata in database
    const { error: dbError } = await supabase
      .from('files')
      .insert({
        user_id: userId || 'anonymous',
        original_name: file.name,
        file_path: fileName,
        content_type: file.type,
        size: file.size,
        uploaded_at: uploadDate.toISOString(),
        expires_at: expiryDate.toISOString()
      });

    if (dbError) throw dbError;

    // Schedule file deletion
    await scheduleFileDeletion(fileName);

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
          [isImage ? "image_url" : "document_url"]: publicUrl,
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
    const shareId = await storeDocumentForSharing({
      originalText: extractedText,
      translatedText: translationResult.text,
      sourceLanguage,
      targetLanguage,
      expiresAt: expiryDate.toISOString(),
    });

    // Generate shareable link
    const shareableLink = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/share/${shareId}`;

    // Return the results
    const result = {
      originalText: extractedText,
      translatedText: translationResult.text,
      sourceLanguage,
      targetLanguage,
      shareableLink,
      expiresAt: expiryDate.toISOString(),
    };

    revalidatePath("/");
    return result;
  } catch (error) {
    console.error("Error processing document:", error);
    if (filePath) {
      await supabase.storage.from('files').remove([filePath]);
    }
    throw new Error("Failed to process document");
  }
}

export async function getUserFiles(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('user_id', userId)
      .order('uploaded_at', { ascending: false });

    if (error) throw error;

    return data.map((file: {
      file_path: string;
      size: number;
      uploaded_at: string;
      original_name: string;
      content_type: string;
      expires_at: string;
    }) => ({
      url: supabase.storage.from('files').getPublicUrl(file.file_path).data.publicUrl,
      pathname: file.file_path,
      size: file.size,
      uploadedAt: file.uploaded_at,
      originalName: file.original_name,
      contentType: file.content_type,
      expiresAt: file.expires_at
    }));
  } catch (error) {
    console.error("Error fetching user files:", error);
    throw new Error("Failed to fetch user files");
  }
}

export async function deleteUserFile(pathname: string) {
  try {
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('files')
      .remove([pathname]);

    if (storageError) throw storageError;

    // Delete from database
    const { error: dbError } = await supabase
      .from('files')
      .delete()
      .eq('file_path', pathname);

    if (dbError) throw dbError;

    revalidatePath("/files");
    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
}
