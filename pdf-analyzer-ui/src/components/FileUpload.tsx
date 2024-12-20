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
      uploadFile(files[0]); // Upload the first dropped file
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files);
      uploadFile(e.target.files[0]); // Upload the first selected file
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/arxiv/inject', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error(`Failed to upload file. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
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
            onChange={handleFileChange}
            multiple
        />
        <div className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-600">
          <Upload className="w-5 h-5" />
          <span className="text-sm">Upload arxiv pdf</span>
        </div>
      </div>
  );
}
