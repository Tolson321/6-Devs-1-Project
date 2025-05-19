import { Suspense } from "react"
import FileUploader from "@/components/file-uploader"
import { Toaster } from "@/components/ui/toaster"
import IntroSection from "@/components/intro-section"
// import { HeaderWrapper } from "@/components/header-wrapper"; // REMOVED
import { ProtectedRoute } from "@/components/protected-route"
import dynamic from "next/dynamic"

// Import FloatingDocuments with client-side only rendering
const FloatingDocuments = dynamic(
  () => import("@/components/floating-documents"),
  { ssr: false }
)

export default function UploadPage() { // Renamed from Home to UploadPage
  console.log('🏠 Upload page rendering'); // Optional: Update console log
  
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 flex items-center justify-center py-10 relative">
        {/* Floating documents background - positioned absolutely within the relative container */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingDocuments />
        </div>
        
        <div className="container max-w-3xl mx-auto px-4 relative z-10">
          <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
            <ProtectedRoute>
              <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading uploader...</div>}>
                <FileUploader />
              </Suspense>
            </ProtectedRoute>
          </div>
        </div>
        <Toaster />
      </main>
    </>
  )
} 