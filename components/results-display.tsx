"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Share2, ArrowLeft, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ResultItem {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  shareableLink: string;
  fileName?: string; 
}

interface ResultsDisplayProps {
  results: ResultItem[];
  onReset: () => void;
}

export default function ResultsDisplay({
  results,
  onReset
}: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState("translated")
  const { toast } = useToast()
  const [copied, setCopied] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0);

  const currentResult = results[currentPage];
  const totalResults = results.length;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
    
    toast({
      title: "Copied to clipboard",
      description: `The ${type} text has been copied to your clipboard.`,
    })
  }

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalResults - 1));
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  if (!currentResult) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-500 dark:text-slate-400">No results to display.</p>
        <Button onClick={onReset} className="mt-4">Upload New Files</Button>
      </div>
    );
  }

  const { originalText, translatedText, sourceLanguage, targetLanguage, shareableLink, fileName } = currentResult;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Minimal Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onReset}
          className="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </button>
        
        {totalResults > 1 && (
          <div className="flex items-center gap-3">
            <button 
              onClick={goToPrevious} 
              disabled={currentPage === 0}
              className="p-2 rounded-full disabled:opacity-30 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <span className="text-sm font-mono">
              {currentPage + 1}/{totalResults}
            </span>
            
            <button 
              onClick={goToNext} 
              disabled={currentPage === totalResults - 1}
              className="p-2 rounded-full disabled:opacity-30 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:hover:bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Document Info */}
      <div className="mb-6">
        <div className="flex items-baseline gap-4 mb-1">
          <h2 className="text-lg font-medium text-slate-900 dark:text-white">{fileName || "Translation Result"}</h2>
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {sourceLanguage} → {targetLanguage}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden mb-8">
        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-800">
          <Tabs defaultValue="translated" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex h-12 bg-transparent p-0 border-b-0">
              <TabsTrigger 
                value="translated" 
                className="flex-1 h-full rounded-none border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=inactive]:border-transparent bg-transparent data-[state=active]:bg-transparent text-sm"
              >
                Translated
              </TabsTrigger>
              <TabsTrigger 
                value="original"
                className="flex-1 h-full rounded-none border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=inactive]:border-transparent bg-transparent data-[state=active]:bg-transparent text-sm"
              >
                Original
              </TabsTrigger>
            </TabsList>

            {/* Translated Content */}
            <TabsContent value="translated" className="border-0 p-0 mt-0">
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {targetLanguage}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(translatedText, "translated")}
                    className="flex items-center gap-1 p-2 rounded-md text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {copied === "translated" ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 max-h-72 overflow-y-auto text-base leading-relaxed">
                  {translatedText}
                </div>
              </div>
            </TabsContent>

            {/* Original Content */}
            <TabsContent value="original" className="border-0 p-0 mt-0">
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {sourceLanguage}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(originalText, "original")}
                    className="flex items-center gap-1 p-2 rounded-md text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {copied === "original" ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 max-h-72 overflow-y-auto text-base leading-relaxed">
                  {originalText}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Shareable Link - Minimalist Design */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Shareable Link
          </span>
          <button 
            onClick={() => copyToClipboard(shareableLink, "link")}
            className="flex items-center gap-1 p-2 rounded-md text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {copied === "link" ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Share2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-md bg-slate-50 dark:bg-slate-900">
          <p className="font-mono text-xs text-slate-600 dark:text-slate-400 break-all">
            {shareableLink}
          </p>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          This link expires in 7 days
        </p>
      </div>

      {/* Privacy Note - Minimalist Version */}
      <div className="mt-12 text-center">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Your uploaded files have been processed and deleted from our servers
        </p>
      </div>
    </div>
  )
}
