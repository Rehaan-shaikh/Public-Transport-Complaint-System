"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadCloudIcon, XIcon } from "lucide-react"

export function UploadMediaInput({ state }) {
  const [mediaFiles, setMediaFiles] = useState([]);
  const inputRef = useRef(null);

  // ✅ Clear files only when submission is successful
  useEffect(() => {
    if (state?.success) {
      setMediaFiles([]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [state?.success]);

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    setMediaFiles(files);
  }

  function handleRemoveFile(index) {
    const updatedFiles = mediaFiles.filter((_, i) => i !== index);
    setMediaFiles(updatedFiles);

    if (updatedFiles.length === 0 && inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Label htmlFor="mediaFiles" className="font-medium">
        Upload Media
      </Label>
      <div className="border-2 border-dashed rounded-lg p-4 mt-2">
        <Input
          id="mediaFiles"
          type="file"
          name="mediaFiles"
          multiple
          accept="image/*,video/*"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />

        {!mediaFiles.length ? (
          <Label
            htmlFor="mediaFiles"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>click to upload files</span>
          </Label>
        ) : (
          <div className="space-y-2">
            {mediaFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-md p-2"
              >
                <div className="flex items-center gap-2">
                  <UploadCloudIcon className="w-6 h-6 text-primary" />
                  <p className="text-sm font-medium truncate max-w-[200px]">
                    {file.name}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveFile(index)}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

