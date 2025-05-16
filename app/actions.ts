"use server";

import { mistral } from "@ai-sdk/mistral";
import { put } from "@vercel/blob";
import { generateText } from "ai";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function processDocument(formData: FormData) {
  try {
    // Get the file and target language from the form data
    const file = formData.get("file") as File;
    const targetLanguage = (formData.get("targetLanguage") as string) || "English";

    if (!file) {
      throw new Error("No file provided");
    }

    // Upload file to Vercel Blob
    const filename = `${nanoid()}-${file.name}`;
    const blob = await put(filename, file, {
      access: "public",
    });

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
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-ocr-latest",
        document: {
          type: isImage ? "image_url" : "document_url",
          [isImage ? "image_url" : "document_url"]: blob.url
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OCR API error: ${errorData}`);
    }

    const ocrResult = await response.json();
    
    // Extract text from OCR result
    if (ocrResult.pages && ocrResult.pages.length > 0) {
      extractedText = ocrResult.pages.map((page: any) => page.markdown).join("\n\n");
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

    // Generate a shareable link (in a real app, this would be a proper URL)
    const shareableLink = `${process.env.VERCEL_URL || "http://localhost:3000"}/share/${nanoid()}`;

    // Return the results
    const result = {
      originalText: extractedText,
      translatedText: translationResult.text,
      sourceLanguage,
      targetLanguage,
      shareableLink,
    };

    revalidatePath("/");
    return result;
  } catch (error) {
    console.error("Error processing document:", error);
    throw new Error("Failed to process document");
  }
}
