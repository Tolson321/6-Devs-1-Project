"use client"

import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface UploadCounterProps {
  uploadCount: number
  maxUploads: number
}

export default function UploadCounter({ uploadCount, maxUploads }: UploadCounterProps) {
  const [percent, setPercent] = useState(0)
  
  useEffect(() => {
    // Calculate percentage for progress bar
    const calculatedPercent = Math.min((uploadCount / maxUploads) * 100, 100)
    setPercent(calculatedPercent)
  }, [uploadCount, maxUploads])
  
  const uploadsRemaining = maxUploads - uploadCount
  const isLimitReached = uploadCount >= maxUploads
  
  return (
    <div className="w-full bg-white/90 dark:bg-slate-800/90 rounded-lg p-4 backdrop-blur-sm border border-slate-200 dark:border-slate-700 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Daily Upload Limit</h3>
        <span className={`text-sm font-semibold ${isLimitReached ? 'text-red-500' : 'text-slate-600 dark:text-slate-400'}`}>
          {uploadCount} / {maxUploads}
        </span>
      </div>
      
      <Progress value={percent} className="h-2 mb-2" />
      
      {isLimitReached ? (
        <div className="flex items-center mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded text-red-600 dark:text-red-400 text-xs">
          <AlertTriangle className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
          <span>Daily upload limit reached. Please try again tomorrow or upgrade to PRO for unlimited uploads.</span>
        </div>
      ) : (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          You have <span className="font-medium">{uploadsRemaining}</span> upload{uploadsRemaining !== 1 ? 's' : ''} remaining today.
        </p>
      )}
    </div>
  )
} 