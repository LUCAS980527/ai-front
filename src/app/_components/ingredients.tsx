"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ReloadIcon from "../../../public/ReloadIcon";


export function IngredientRecognition() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setResult([
        "Spaghetti",
        "Eggs",
        "Parmesan cheese",
        "Pancetta",
        "Black pepper",
        "Garlic",
        "Salt (a pinch)",
      ]);
      setLoading(false);
    }, 1200);
  };

  const handleReload = () => {
    setText("");
    setResult(null);
  };

  return (
    <div className="space-y-6">
 
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">✨ Ingredient recognition</h2>
          <p className="text-sm text-muted-foreground">
            Describe the food, and AI will detect the ingredients.
          </p>
        </div>

        <button
          onClick={handleReload}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background opacity-50 hover:opacity-100 transition"
        >
          <ReloadIcon />
        </button>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe your food..."
        className="min-h-[140px]"
      />

      <Button
        onClick={handleGenerate}
        disabled={!text || loading}
        className="w-fit"
      >
        {loading ? "Generating..." : "Generate"}
      </Button>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>📄 Identified Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              Here’s a quick summary of the ingredients you used:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {result.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground pt-2">
              Simple, classic, and delicious!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
