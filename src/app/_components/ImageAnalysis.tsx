"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import StarIcon from "../../../public/StarIcon";
import ReloadIcon from "../../../public/ReloadIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BACK_END_URL } from "../_constants";

export default function ImageAnalysis() {
  const [resetUpload, setResetUpload] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleGenerate = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACK_END_URL}/Text-Generator`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("response", response);

      setAnalysisResult(response.data.data.content);
      console.log("response.data.data.", response.data.data.content);
    } catch (err) {
      console.log(err);
      setAnalysisResult("Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  };

  const handleReload = () => {
    setPreview(null);
    setAnalysisResult(null);
    setResetUpload(true);
  };

  useEffect(() => {
    if (resetUpload) {
      if (inputRef.current) inputRef.current.value = "";
      setResetUpload(false);
    }
  }, [resetUpload]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <StarIcon />
          <h1 className="text-[#09090B] font-sans text-xl font-semibold leading-7 tracking-normal">
            Image analysis
          </h1>
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background opacity-50 hover:opacity-100 transition cursor-pointer"
          onClick={handleReload}
        >
          <ReloadIcon />
        </button>
      </div>

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

      <Button
        className=" w-fit 
    bg-black text-white border border-black cursor-pointer
    hover:bg-black
    disabled:bg-white disabled:text-black disabled:cursor-not-allowed"
        onClick={handleGenerate}
        disabled={!preview || loading}
      >
        {loading ? "Analyzing..." : "Generate"}
      </Button>

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {analysisResult}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
