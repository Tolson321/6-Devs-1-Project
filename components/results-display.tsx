"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Share2, RotateCcw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ResultsDisplayProps {
  results: {
    originalText: string
    translatedText: string
    sourceLanguage: string
    targetLanguage: string
    shareableLink: string
  }
  onReset: () => void
}

export default function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState("translated")
  const { toast } = useToast()

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: `The ${type} text has been copied to your clipboard.`,
    })
  }

  const shareResults = () => {
    navigator.clipboard.writeText(results.shareableLink)
    toast({
      title: "Link copied to clipboard",
      description: "Share this link with others to view your translated document.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Document Processed</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {results.sourceLanguage} → {results.targetLanguage}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            New Document
          </Button>
          <Button size="sm" onClick={shareResults}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Tabs defaultValue="translated" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="translated">Translated Text</TabsTrigger>
          <TabsTrigger value="original">Original Text</TabsTrigger>
        </TabsList>

        <TabsContent value="translated">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">{results.targetLanguage} Translation</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(results.translatedText, "translated")}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-4 rounded-md max-h-96 overflow-y-auto">
                {results.translatedText}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="original">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">Original Text ({results.sourceLanguage})</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(results.originalText, "original")}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-4 rounded-md max-h-96 overflow-y-auto">
                {results.originalText}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
