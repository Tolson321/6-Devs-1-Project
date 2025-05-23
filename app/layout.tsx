import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// Make the layout dynamic
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Document Translation App",
  description: "Upload and translate your documents with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('🎨 Root layout rendering');
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
