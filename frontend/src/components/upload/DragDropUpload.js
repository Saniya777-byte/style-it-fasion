"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, File, AlertCircle, CheckCircle, Trash2 } from "lucide-react";
import { cn } from "../../utils/cn";

export function DragDropUpload({ onFileSelect, selectedFile, onClear }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSelectFile(file);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSelectFile(file);
    }
  };

  const validateAndSelectFile = (file) => {
    // Basic validations
    const allowedTypes = ["video/mp4", "audio/mpeg", "audio/wav", "audio/mp3", "application/pdf"];
    const maxSize = 500 * 1024 * 1024; // 500MB

    if (file.size > maxSize) {
      alert("File exceeds the 500MB size limit.");
      return;
    }
    
    onFileSelect(file);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all min-h-64",
            isDragActive
              ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10 scale-101"
              : "border-zinc-200 hover:border-indigo-400 dark:border-zinc-800 dark:hover:border-indigo-600 bg-white/50 dark:bg-zinc-950/20"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp4,.mp3,.wav,.pdf"
            onChange={handleChange}
            className="hidden"
          />
          <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <UploadCloud size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-zinc-850 dark:text-zinc-200">
              Drag & drop meeting file or <span className="text-indigo-650 font-bold hover:underline">browse</span>
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
              Supports MP4, MP3, WAV, or PDF (Max 500MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <File size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
              {selectedFile.name}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              {formatBytes(selectedFile.size)} • Ready for upload
            </p>
          </div>
          <button
            onClick={onClear}
            className="p-2 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default DragDropUpload;
