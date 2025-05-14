"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { processDocument } from "@/app/actions"
import ResultsDisplay from "./results-display"
import LanguageSelector from "./language-selector"

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<{
    originalText: string
    translatedText: string
    sourceLanguage: string
    targetLanguage: string
    shareableLink: string
  } | null>(null)
  const [targetLanguage, setTargetLanguage] = useState("English")
  const { toast } = useToast()

  const progressInterval = () => {
    // Simulate progress for better UX
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15
      if (currentProgress > 95) {
        currentProgress = 95
        clearInterval(interval)
      }
      setProgress(Math.min(Math.round(currentProgress), 95))
    }, 1000)
    return interval
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      validateAndSetFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or image file (JPEG, PNG).",
        variant: "destructive",
      })
      return
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    setFile(file)
    setResults(null)
  }

  const handleSubmit = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)

    const interval = progressInterval()

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("targetLanguage", targetLanguage)

      const result = await processDocument(formData)
      setResults(result)
      setProgress(100)

      toast({
        title: "Processing complete",
        description: "Your document has been successfully processed.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Processing failed",
        description: "There was an error processing your document. Please try again.",
        variant: "destructive",
      })
    } finally {
      clearInterval(interval)
      setIsProcessing(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setResults(null)
    setProgress(0)
  }

  return (
    <div className="space-y-6">
      {!results && (
        <>
          <div className="space-y-4">
            <LanguageSelector value={targetLanguage} onChange={setTargetLanguage} disabled={isProcessing} />

            <Card
              className={`border-2 border-dashed rounded-lg ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                  : "border-slate-300 dark:border-slate-700"
              } transition-colors duration-200 ease-in-out`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <div className="mb-4 rounded-full bg-slate-100 dark:bg-slate-700 p-3">
                  <Upload className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100">
                  {file ? file.name : "Drag and drop your file here"}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  {file
                    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB · ${file.type}`
                    : "Or click to browse (PDF, JPEG, PNG)"}
                </p>

                {!file && (
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                      <FileText className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">PDF</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                      <ImageIcon className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">Images</span>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={isProcessing}
                />

                {!file && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={isProcessing}
                  >
                    Select File
                  </Button>
                )}

                {file && !isProcessing && (
                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" onClick={resetForm}>
                      Change File
                    </Button>
                    <Button onClick={handleSubmit}>Process Document</Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {isProcessing && (
            <div className="space-y-4 mt-6">
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-center gap-3 text-slate-600 dark:text-slate-300">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>
                  {progress < 30
                    ? "Uploading document..."
                    : progress < 70
                      ? "Extracting text with OCR..."
                      : "Translating content..."}
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {results && <ResultsDisplay results={results} onReset={resetForm} />}
    </div>
  )
}
