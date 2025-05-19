"use client";

import { useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { Trash, Download, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteUserFile } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";

export type FileType = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  originalName: string;
  contentType: string;
  expiresAt: string;
};

export default function UserFilesTable({ files }: { files: FileType[] }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  };

  const handleDelete = async (pathname: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        setDeleting(pathname);
        await deleteUserFile(pathname);
        toast({
          title: "File deleted",
          description: `"${name}" has been deleted.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete the file. Please try again.",
          variant: "destructive",
        });
      } finally {
        setDeleting(null);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.pathname}>
              <TableCell className="font-medium max-w-[200px] truncate" title={file.originalName}>
                {file.originalName}
              </TableCell>
              <TableCell>
                {file.contentType.split("/")[1]?.toUpperCase() || file.contentType}
              </TableCell>
              <TableCell>{formatFileSize(file.size)}</TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-amber-600">
                  <Clock className="h-3 w-3" />
                  <span title={format(new Date(file.expiresAt), "PPPp")}>
                    {formatDistanceToNow(new Date(file.expiresAt), { addSuffix: true })}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => window.open(file.url, "_blank")}
                  title="View file"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={file.url} download={file.originalName} title="Download file">
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleDelete(file.pathname, file.originalName)}
                  disabled={deleting === file.pathname}
                  title="Delete file"
                >
                  {deleting === file.pathname ? (
                    <span className="animate-spin">●</span>
                  ) : (
                    <Trash className="h-4 w-4 text-red-500" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 