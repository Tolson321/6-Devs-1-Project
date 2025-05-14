import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// In a real app, this would fetch the shared document from a database
// For this demo, we'll use mock data
const getMockSharedDocument = (id: string) => {
  // This is just for demonstration - in a real app, you would fetch from a database
  return {
    id,
    originalText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    translatedText:
      "This is a translated version of the Latin text above. It demonstrates how the shared view would look.",
    sourceLanguage: "Latin",
    targetLanguage: "English",
    createdAt: new Date().toISOString(),
  }
}

export default function SharedDocumentPage({ params }: { params: { id: string } }) {
  // In a real app, this would be an async function that fetches the document
  const document = getMockSharedDocument(params.id)

  if (!document) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-16">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Translator
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3">Shared Document</h1>
          <p className="text-slate-600 dark:text-slate-300">
            {document.sourceLanguage} → {document.targetLanguage}
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Tabs defaultValue="translated">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="translated">Translated Text</TabsTrigger>
              <TabsTrigger value="original">Original Text</TabsTrigger>
            </TabsList>

            <TabsContent value="translated">
              <Card>
                <CardHeader>
                  <CardTitle>{document.targetLanguage} Translation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                    {document.translatedText}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="original">
              <Card>
                <CardHeader>
                  <CardTitle>Original Text ({document.sourceLanguage})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                    {document.originalText}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Suspense>
      </div>
    </main>
  )
}
