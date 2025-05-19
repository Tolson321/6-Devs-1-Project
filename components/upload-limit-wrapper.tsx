"use client"

import UploadCounter from "@/components/upload-counter"

interface UploadLimitWrapperProps {
  uploadCount: number
  maxUploads: number
}

export default function UploadLimitWrapper({ uploadCount, maxUploads }: UploadLimitWrapperProps) {
  return <UploadCounter uploadCount={uploadCount} maxUploads={maxUploads} />
} 