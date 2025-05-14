import { BookOpen } from "lucide-react"

export default function IntroSection() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full mb-4">
        <BookOpen className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3">
        Document Translator
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        Upload an image or PDF document and our AI will extract and translate the text for you. Simple, fast, and
        accurate.
      </p>
    </div>
  )
}
