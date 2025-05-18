import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"
import AuthLayout from "@/components/auth-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DocTranslate - Document Translation Service",
  description: "Translate your documents with AI-powered accuracy",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AuthLayout>{children}</AuthLayout>
        </body>
      </html>
    </ClerkProvider>
  )
}
