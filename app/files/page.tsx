"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { getUserFiles } from "@/app/actions";
import { ProtectedRoute } from "@/components/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { type FileType } from "@/components/user-files-table";
import dynamic from "next/dynamic";

// Dynamic import for UserFilesTable which is a default export
const UserFilesTable = dynamic(
  () => import("@/components/user-files-table"), 
  { ssr: false }
);

// Import FloatingDocuments with client-side only rendering
const FloatingDocuments = dynamic(
  () => import("@/components/floating-documents"),
  { ssr: false }
);

const FilesPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  let files: FileType[] = [];
  let error: string | null = null;
  
  try {
    files = await getUserFiles(user.id);
  } catch (e) {
    error = "Failed to load your files. Please try again later.";
    console.error(e);
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 relative">
        {/* Floating documents background - positioned absolutely within the relative container */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingDocuments />
        </div>
        
        <div className="container max-w-5xl mx-auto px-4 py-8 md:py-16 relative z-10">
          <ProtectedRoute>
            <Card className="bg-white/80 dark:bg-slate-800/80 rounded-xl shadow-sm backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Your Files</CardTitle>
              </CardHeader>
              <CardContent>
                {error ? (
                  <div className="text-red-500">{error}</div>
                ) : files.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500 mb-4">You haven't uploaded any files yet.</p>
                    <a 
                      href="/upload"
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-slate-800 inline-block"
                    >
                      Upload a Document
                    </a>
                  </div>
                ) : (
                  <UserFilesTable files={files} />
                )}
              </CardContent>
            </Card>
          </ProtectedRoute>
        </div>
        <Toaster />
      </main>
    </>
  );
};

export default FilesPage; 