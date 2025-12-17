"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ImageGenerate() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleGenerate = () => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
      />

      <Button
        onClick={handleGenerate}
        disabled={!file}
        className="w-fit border"
      >
        Generate
      </Button>

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="h-20 w-20 rounded-md object-cover border"
        />
      )}
    </div>
  );
}
