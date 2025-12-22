"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StarIcon from "../../../public/StarIcon";
import ReloadIcon from "../../../public/ReloadIcon";


export function FoodImageCreator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setImage(`https://picsum.photos/512?${Date.now()}`);
      setLoading(false);
    }, 1200);
  };

  const handleReload = () => {
    setPrompt("");
    setImage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <StarIcon/>
          <h1 className="text-xl font-semibold">Food image creator</h1>
        </div>

        <button
          onClick={handleReload}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background opacity-50 hover:opacity-100 transition"
        >
          <ReloadIcon />
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        What food image do you want? Describe it briefly.
      </p>

      <Textarea
        placeholder="Хоолны тайлбар"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[140px]"
      />

      <Button
        onClick={handleGenerate}
        disabled={!prompt || loading}
        className="w-fit"
      >
        {loading ? "Generating..." : "Generate"}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🖼 Result
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          {!image && "First, enter your text to generate an image."}

          {image && (
            <img
              src={image}
              alt="Generated food"
              className="mt-4 rounded-md border object-cover"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
