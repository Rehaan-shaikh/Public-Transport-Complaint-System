"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { uploadMedia } from "@/lib/convertFiles";

export function UploadMediaInput({ state, onUploadingChange }) {
  // THE ISSUE : the prblm was the files are getting lost after 1st failed attemot , the browser was loosing them
  //   elaboraton:When the form was submitted the first time and failed, the component re-rendered.
  //   The <input type="file"> doesn’t keep its selected files after a re-render (or failed submit).
  // So even though prev mediaFiles state had the uploaded files, the <input> itself was empty, and if you relied on it for re-upload, the browser “lost” the files.

  const [mediaUrls, setMediaUrls] = useState([]); // now stores objects {url, type}
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);

  //only clearing meduaUrls when successly submitted the form
  useEffect(() => {
    if (state?.success) {
      setMediaUrls([]);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [state?.success]);

  async function handleFileChange(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    onUploadingChange?.(true);

    try {
      //calling uploadMedia cloudinary fun directly here 
      // uploadMedia should accept File[] and return array of objects [{url, type}, {url, type},...]
      const uploadedFiles = await uploadMedia(files);
      setMediaUrls((prev) => [...prev, ...uploadedFiles]); //It updates the state mediaUrls by adding the new uploaded files to the existing ones
    } catch (err) {
      console.error("Upload failed:", err);
      // optionally show toast / UI error
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemoveFile(index) {
    setMediaUrls((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Label htmlFor="mediaFiles" className="font-medium">
        Upload Media
      </Label>
      <div className="border-2 border-dashed rounded-lg p-4 mt-2">
        {/* this input doesnt do anything except callig the  handleFileChange*/}
        <input
          id="mediaFiles"
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
          disabled={isUploading}
        />

        {!mediaUrls.length ? (
          <Label
            htmlFor="mediaFiles"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>
              {isUploading ? "Uploading..." : "click to upload files"}
            </span>
          </Label>
        ) : (
          <div className="space-y-2">
            {mediaUrls.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-md p-2"
              >
                <div className="flex items-center gap-2">
                  <UploadCloudIcon className="w-6 h-6 text-primary" />
                  <p className="text-sm font-medium truncate max-w-[200px]">
                    {file.url.split("/").pop()}{" "}
                    {/* display filename from URL */}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveFile(index)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* SOLUTION  */}
        {/* Hidden inputs so the form submits the objects */}
        {mediaUrls.map((file, i) => (
          <input
            key={i}
            type="hidden"
            name="mediaFiles"
            //solution to that browser file pblm : set default value for the input name mediaFiles to submit the file data on every submit attempt
            value={JSON.stringify(file)} //converts {url, type} object to string so the browser can submit it.
            //as the browser cannot submit raw JavaScript objects via a standard HTML form
          />
          //Ex of whats generating
          //<input type="hidden" name="mediaFiles" value='{"url":"https://...jpg","type":"image"}'>
          //<input type="hidden" name="mediaFiles" value='{"url":"https://...mp4","type":"video"}'>
          //we get all of them grouped as the same name via. const mediaFilesRaw = formData.getAll("mediaFiles")
        ))}
      </div>
    </motion.div>
  );
}
