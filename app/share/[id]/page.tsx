import { notFound } from "next/navigation"
import { sharedDocuments, type SharedDocument } from "@/lib/shared-documents"

export default function SharedDocumentPage({ params }: { params: { id: string } }) {
  const document = sharedDocuments.get(params.id) as SharedDocument | undefined

  if (!document) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex items-baseline gap-4 mb-1">
            <h1 className="text-lg font-medium text-slate-900 dark:text-white">Shared Document</h1>
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Expires: {new Date(document.expiresAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
            <div className="p-6">
              <div className="mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {document.sourceLanguage}
                </span>
              </div>
              <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 text-base leading-relaxed">
                {document.originalText}
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {document.targetLanguage}
                </span>
              </div>
              <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 text-base leading-relaxed">
                {document.translatedText}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            This shared document will expire on {new Date(document.expiresAt).toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  )
}
