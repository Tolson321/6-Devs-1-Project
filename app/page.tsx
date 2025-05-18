import { Suspense } from "react"
import FileUploader from "@/components/file-uploader"
import { Toaster } from "@/components/ui/toaster"
import IntroSection from "@/components/intro-section"
import { HeaderWrapper } from "@/components/header-wrapper"
import { ProtectedRoute } from "@/components/protected-route"

export default function Home() {
  console.log('🏠 Home page rendering');
  
  return (
    <>
      <HeaderWrapper />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container max-w-5xl mx-auto px-4 py-8 md:py-16">
          <IntroSection />

          <ProtectedRoute>
            <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 md:p-8">
              <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading uploader...</div>}>
                <FileUploader />
              </Suspense>
            </div>
          </ProtectedRoute>
        </div>
        <Toaster />
      </main>
    </>
  )
}
