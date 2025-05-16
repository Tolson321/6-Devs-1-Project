import { Suspense } from "react"
import FileUploader from "@/components/file-uploader"
import { Toaster } from "@/components/ui/toaster"
import IntroSection from "@/components/intro-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-16">
        <IntroSection />

        <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 md:p-8">
          <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading uploader...</div>}>
            <FileUploader />
          </Suspense>
        </div>
      </div>
      <Toaster />
    </main>
  )
}
