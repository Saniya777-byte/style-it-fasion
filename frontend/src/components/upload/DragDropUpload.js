"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, File, Trash2 } from "lucide-react";
import { cn } from "../../utils/cn";

export function DragDropUpload({ onFileSelect, selectedFile, onClear }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    else if (e.type === "dragleave") setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files?.[0]) validateAndSelectFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files?.[0]) validateAndSelectFile(e.target.files[0]);
  };

  const validateAndSelectFile = (file) => {
    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) { alert("File exceeds the 500MB size limit."); return; }
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
            "w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 min-h-56",
            isDragActive
              ? "border-teal-500 bg-teal-50/30 dark:bg-teal-950/10"
              : "border-stone-200 hover:border-teal-400 dark:border-stone-700 dark:hover:border-teal-600 bg-stone-50/30 dark:bg-stone-950/20"
          )}
        >
          <input ref={fileInputRef} type="file" accept=".mp4,.mp3,.wav,.pdf,.txt,.docx,.json" onChange={handleChange} className="hidden" />
          <div className="w-11 h-11 rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <UploadCloud size={22} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-stone-600 dark:text-stone-200">
              Drag & drop or <span className="text-teal-650 dark:text-teal-400 font-semibold">browse</span>
            </p>
            <p className="text-[12px] text-stone-400 dark:text-stone-500 mt-1">MP4, MP3, WAV, PDF, TXT (Max 500MB)</p>
          </div>
        </div>
      ) : (
        <div className="border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 rounded-xl p-4 flex items-center gap-3 shadow-card">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <File size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-stone-800 dark:text-stone-100 truncate">{selectedFile.name}</p>
            <p className="text-[12px] text-stone-400 dark:text-stone-500 mt-0.5">{formatBytes(selectedFile.size)} • Ready</p>
          </div>
          <button onClick={onClear} className="p-1.5 text-stone-400 hover:text-red-500 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer">
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

export default DragDropUpload;
