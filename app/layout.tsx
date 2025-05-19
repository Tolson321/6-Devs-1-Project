import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"
import GlobalNavbar from "@/components/GlobalNavbar"

const inter = Inter({ subsets: ["latin"] })

// Make the layout dynamic
export const dynamic = "force-dynamic"

export const metadata = {
  title: "DocTranslate - Document Translation Service",
  description: "Translate your documents with AI-powered accuracy",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('🎨 Root layout rendering');
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <GlobalNavbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
