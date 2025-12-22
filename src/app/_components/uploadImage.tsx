"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

type ImageUploadProps = {
  reset: boolean;
  onResetDone: () => void;
};

export function ImageUpload({ reset, onResetDone }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  useEffect(() => {
    if (reset) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      onResetDone();
    }
  }, [reset, onResetDone]);

  return (
    <div className="flex flex-col gap-3">
      <Input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        className="cursor-pointer"
      />

      {preview && (
        <div className="flex items-center justify-center rounded-md border border-input bg-background p-2">
          <img
            src={preview}
            alt="Preview"
            className="max-h-40 rounded-md object-contain"
          />
        </div>
      )}
    </div>
  );
}