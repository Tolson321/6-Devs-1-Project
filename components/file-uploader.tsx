"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText, ImageIcon, Loader2, XCircle, X, Trash2, File, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { processDocument } from "@/app/actions"
import ResultsDisplay from "./results-display"
import LanguageSelector from "./language-selector"
import { useAuth } from "@clerk/nextjs"

interface FileUploaderProps {
  isLimitReached?: boolean
}

export default function FileUploader({ isLimitReached = false }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<Array<{
    originalText: string
    translatedText: string
    sourceLanguage: string
    targetLanguage: string
    shareableLink: string
    fileName?: string
  }>>([])
  const [targetLanguageGlobal, setTargetLanguageGlobal] = useState("English")
  const [processingInterval, setProcessingInterval] = useState<NodeJS.Timeout | null>(null)
  const { toast } = useToast()
  const { userId } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    setProcessingInterval(interval)
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

    if (isLimitReached) {
      toast({
        title: "Daily limit reached",
        description: "You've reached your daily upload limit. Please try again tomorrow or upgrade to PRO.",
        variant: "destructive",
      })
      return
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      validateAndAddFiles(droppedFiles)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLimitReached) {
      toast({
        title: "Daily limit reached",
        description: "You've reached your daily upload limit. Please try again tomorrow or upgrade to PRO.",
        variant: "destructive",
      })
      return
    }
    
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      validateAndAddFiles(selectedFiles)
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  const validateAndAddFiles = (newFiles: File[]) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    const maxSize = 10 * 1024 * 1024 // 10MB
    let allFilesValid = true
    const validatedNewFiles: File[] = []

    newFiles.forEach(file => {
      if (!validTypes.includes(file.type)) {
        toast({
          title: `Invalid file type: ${file.name}`,
          description: "Please upload PDF or image files (JPEG, PNG).",
          variant: "destructive",
        })
        allFilesValid = false
        return // Skip this file
      }

      if (file.size > maxSize) {
        toast({
          title: `File too large: ${file.name}`,
          description: "Please upload files smaller than 10MB.",
          variant: "destructive",
        })
        allFilesValid = false
        return // Skip this file
      }
      validatedNewFiles.push(file)
    })

    if (validatedNewFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...validatedNewFiles])
      setResults([])
    }
  }

  const removeFile = (fileNameToRemove: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileNameToRemove));
  };

  const cancelUpload = () => {
    if (processingInterval) {
      clearInterval(processingInterval)
      setProcessingInterval(null)
    }
    
    setIsProcessing(false)
    setProgress(0)
    
    toast({
      title: "Upload cancelled",
      description: "Your document upload has been cancelled.",
    })
  }

  const handleSubmit = async () => {
    if (files.length === 0) return

    setIsProcessing(true)
    setProgress(0)
    setResults([])

    const overallInterval = progressInterval()

    const newResults = []
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const formData = new FormData()
        formData.append("file", file)
        formData.append("targetLanguage", targetLanguageGlobal)

        const result = await processDocument(formData, userId || undefined)
        newResults.push({ 
          ...result, 
          fileName: file.name, 
          targetLanguage: targetLanguageGlobal
        })
        
        setProgress(Math.round(((i + 1) / files.length) * 95)) 
      }
      setResults(newResults)
      setProgress(100)

      toast({
        title: "Processing complete",
        description: `Successfully processed ${newResults.length} document(s).`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Processing failed",
        description: "There was an error processing one or more documents. Please try again.",
        variant: "destructive",
      })
    } finally {
      clearInterval(overallInterval)
      setProcessingInterval(null)
      setIsProcessing(false)
    }
  }

  const resetForm = () => {
    setFiles([])
    setResults([])
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // Helper function to get file icon based on type
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <FileText className="h-5 w-5 text-slate-500" />;
    } else if (fileType.includes('image')) {
      return <ImageIcon className="h-5 w-5 text-slate-500" />;
    }
    return <File className="h-5 w-5 text-slate-500" />;
  };

  // Helper to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Get estimated time based on file size and progress
  const getEstimatedTime = (progress: number): string => {
    if (progress > 90) return "Almost done";
    if (progress > 70) return "< 10 sec left";
    return "< 2 sec left"; // For demonstration purposes
  };

  return (
    <div className="relative">
      {results.length === 0 && (
        <div>
          {/* Modal-style Header with Close Button */}
          <div className="flex justify-between items-center p-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                Upload and attach files
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Attachments will be a part of this translation
              </p>
            </div>
            <button className="text-slate-500 hover:text-slate-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Warning message when limit is reached */}
            {isLimitReached && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-md">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <h3 className="font-medium text-red-800 dark:text-red-400">Upload limit reached</h3>
                    <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                      You've reached your daily upload limit of 5 files. Please try again tomorrow or upgrade to PRO for unlimited uploads.
                    </p>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white" 
                  onClick={() => window.location.href = "/pricing"}
                >
                  Upgrade to PRO
                </Button>
              </div>
            )}
            
            {/* Conditional block for non-processing state */}
            {!isProcessing && (
              <>
                {/* Language Selection */}
                <div className="mb-6">
                  <LanguageSelector value={targetLanguageGlobal} onChange={setTargetLanguageGlobal} disabled={isProcessing || isLimitReached} />
                </div>
                
                {/* Upload Area */}
                <div 
                  className={`
                    border-2 border-dashed ${isLimitReached ? 'border-red-300 dark:border-red-800/50' : 'border-slate-300 dark:border-slate-600'} rounded-lg
                    ${files.length > 0 ? 'mb-4' : 'mb-6'}
                    ${isLimitReached ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  onDragOver={!isLimitReached ? handleDragOver : undefined}
                  onDragLeave={!isLimitReached ? handleDragLeave : undefined}
                  onDrop={handleDrop}
                >
                  <div 
                    className={`
                      flex flex-col items-center justify-center py-10 px-6 text-center
                      transition-colors duration-200 ease-in-out ${isLimitReached ? 'cursor-not-allowed' : 'cursor-pointer'}
                      ${isDragging ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}
                    `}
                    onClick={!isLimitReached ? () => fileInputRef.current?.click() : undefined}
                  >
                    <div className="relative mb-4">
                      <div className="h-20 w-20 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-800/40 flex items-center justify-center">
                          <Upload className={`h-8 w-8 ${isLimitReached ? 'text-slate-400 dark:text-slate-600' : 'text-indigo-500 dark:text-indigo-400'}`} />
                        </div>
                      </div>
                    </div>

                    {/* Text inside dropzone based on files selected */}
                    {files.length === 0 ? (
                      <>
                        <h3 className="text-lg font-medium mb-2 text-slate-700 dark:text-slate-200">
                          {isLimitReached ? "Upload limit reached" : "Click to Upload or drag and drop"}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                          {isLimitReached ? "Please try again tomorrow or upgrade to PRO" : "(Max. File size: 10 MB)"}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-indigo-500 font-medium">
                        Upload more files
                      </p>
                    )}

                    <input
                      type="file"
                      ref={fileInputRef}
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      disabled={isProcessing || isLimitReached}
                    />
                  </div>
                </div>

                {/* Display Selected Files */}
                {files.length > 0 && !isLimitReached && (
                  <div className="mb-6 space-y-3 max-h-60 overflow-y-auto p-1">
                    <h4 className="text-sm font-medium text-slate-600 dark:text-slate-300">Selected Files:</h4>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/50 rounded-md border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-2 overflow-hidden">
                          {getFileIcon(file.type)}
                          <span className="text-sm text-slate-700 dark:text-slate-200 truncate" title={file.name}>
                            {file.name}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            ({formatFileSize(file.size)})
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(file.name)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            
            {/* Conditional block for processing state */}
            {isProcessing && (
              <div className="px-4 pb-4">
                {/* Progress Bar and Processing Info */}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {progress < 30
                      ? "Uploading..."
                      : progress < 70
                        ? "Processing..."
                        : "Translating..."}
                  </span>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {getEstimatedTime(progress)}
                    </span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {progress}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`flex ${files.length > 0 && !isProcessing ? 'justify-between' : 'justify-end'} items-center p-6 border-t border-slate-100 dark:border-slate-700`}>
            {files.length > 0 && !isProcessing && (
              <Button variant="outline" onClick={resetForm} className="dark:text-slate-300 dark:border-slate-600 hover:dark:bg-slate-700">
                Clear All
              </Button>
            )}
            <Button 
              onClick={handleSubmit} 
              disabled={files.length === 0 || isProcessing || isLimitReached}
              className="min-w-[120px]"
            >
              {isProcessing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              {isProcessing ? `Processing (${progress}%)` : (files.length > 1 ? `Process ${files.length} Files` : 'Process File')}
            </Button>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <ResultsDisplay
          results={results} 
          onReset={resetForm} 
        />
      )}
    </div>
  )
}
