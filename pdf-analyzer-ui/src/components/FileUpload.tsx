import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (files: FileList) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files);
    }
  };

  return (
    <div
      className="relative"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => e.target.files && onFileSelect(e.target.files)}
        multiple
      />
      <div className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-600">
        <Upload className="w-5 h-5" />
        <span className="text-sm">Upload files</span>
      </div>
    </div>
  );
}