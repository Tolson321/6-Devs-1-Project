"use server"

import { put } from "@vercel/blob"
import { nanoid } from "nanoid"
import { mistral } from "@ai-sdk/mistral"
import { generateText } from "ai"
import { revalidatePath } from "next/cache"

export async function processDocument(formData: FormData) {
  try {
    // Get the file and target language from the form data
    const file = formData.get("file") as File
    const targetLanguage = (formData.get("targetLanguage") as string) || "English"

    if (!file) {
      throw new Error("No file provided")
    }

    // Upload file to Vercel Blob
    const filename = `${nanoid()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
    })

    // Determine file type
    const fileType = file.type
    const isImage = fileType.startsWith("image/")
    const isPdf = fileType === "application/pdf"

    // Create a prompt for Mistral based on file type
    let prompt = ""
    if (isImage) {
      prompt = `This is an image file. Please extract all the text from this image using OCR. The image is available at: ${blob.url}`
    } else if (isPdf) {
      prompt = `This is a PDF document. Please extract all the text from this PDF using OCR. The PDF is available at: ${blob.url}`
    } else {
      throw new Error("Unsupported file type")
    }

    // Use Mistral to extract text from the document
    const extractionResult = await generateText({
      model: mistral("mistral-large-latest"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "file",
              data: new URL(blob.url),
              mimeType: file.type,
            },
          ],
        },
      ],
    })

    // Detect the source language
    const detectionResult = await generateText({
      model: mistral("mistral-large-latest"),
      messages: [
        {
          role: "system",
          content:
            "You are a language detection expert. Identify the language of the provided text and respond with only the language name.",
        },
        {
          role: "user",
          content: extractionResult.text.substring(0, 1000), // Use first 1000 chars for detection
        },
      ],
    })

    const sourceLanguage = detectionResult.text.trim()

    // Translate the extracted text to the target language
    const translationResult = await generateText({
      model: mistral("mistral-large-latest"),
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate the following text from ${sourceLanguage} to ${targetLanguage}. Maintain the original formatting as much as possible.`,
        },
        {
          role: "user",
          content: extractionResult.text,
        },
      ],
    })

    // Generate a shareable link (in a real app, this would be a proper URL)
    const shareableLink = `${process.env.VERCEL_URL || "http://localhost:3000"}/share/${nanoid()}`

    // Return the results
    const result = {
      originalText: extractionResult.text,
      translatedText: translationResult.text,
      sourceLanguage,
      targetLanguage,
      shareableLink,
    }

    revalidatePath("/")
    return result
  } catch (error) {
    console.error("Error processing document:", error)
    throw new Error("Failed to process document")
  }
}
