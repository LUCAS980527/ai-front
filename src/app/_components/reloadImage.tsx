"use client";

import { useState } from "react";
import ReloadIcon from "../../../public/ReloadIcon";

export function ImageReload() {
  const [image, setImage] = useState<string>();

  const handleReload = () => {
    setImage(`https://picsum.photos/200?${Date.now()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src={image}
        alt="preview"
        className="h-20 w-20 rounded-md border object-cover"
      />

      <button
        onClick={handleReload}
        className="flex h-10 items-center justify-center gap-2 rounded-md border border-[#E4E4E7] bg-white px-4 py-2 hover:opacity-100 opacity-50 transition cursor-pointer"
      >
        <ReloadIcon />
      </button>
    </div>
  );
}
