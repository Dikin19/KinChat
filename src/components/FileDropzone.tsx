'use client';

import { useState } from 'react';
import { Upload, X, FileText, Image, Mic } from 'lucide-react';
import { FileUpload } from '@/types';

interface FileDropzoneProps {
    onFilesAdded: (files: FileUpload[]) => void;
    maxFiles?: number;
    acceptedTypes?: string[];
}

export default function FileDropzone({ onFilesAdded, maxFiles = 5, acceptedTypes }: FileDropzoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        processFiles(files);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            processFiles(files);
        }
    };

    const processFiles = (files: File[]) => {
        const newFiles: FileUpload[] = files.slice(0, maxFiles).map(file => {
            let type: 'image' | 'document' | 'audio' = 'document';

            if (file.type.startsWith('image/')) {
                type = 'image';
            } else if (file.type.startsWith('audio/')) {
                type = 'audio';
            }

            return { file, type };
        });

        onFilesAdded(newFiles);
    };

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />;
        if (type.startsWith('audio/')) return <Mic className="w-8 h-8 text-red-500" />;
        return <FileText className="w-8 h-8 text-green-500" />;
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${isDragOver
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                multiple
                onChange={handleFileInput}
                accept={acceptedTypes?.join(',') || 'image/*,audio/*,.pdf,.doc,.docx,.txt'}
                className="hidden"
                id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                    Drop files here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                    Supports images, audio files, and documents (Max {maxFiles} files)
                </p>
            </label>
        </div>
    );
}
