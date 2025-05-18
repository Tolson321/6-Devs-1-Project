import { notFound } from "next/navigation"
import { Card } from "@/components/ui/card"
import { sharedDocuments, type SharedDocument } from "@/lib/shared-documents"

export default function SharedDocumentPage({ params }: { params: { id: string } }) {
  const document = sharedDocuments.get(params.id) as SharedDocument | undefined

  if (!document) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-16">
        <Card className="p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Shared Document</h1>
              <p className="text-sm text-muted-foreground">
                Expires: {new Date(document.expiresAt).toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Original Text ({document.sourceLanguage})</h2>
                <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                  {document.originalText}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Translated Text ({document.targetLanguage})</h2>
                <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                  {document.translatedText}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
