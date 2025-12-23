"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ReloadIcon from "../../../public/ReloadIcon";
import StarIcon from "../../../public/StarIcon";
import axios from "axios";
import { BACK_END_URL } from "../_constants";

export function IngredientRecognition() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // const handleGenerate = async () => {
  //   if (!text.trim()) return;

  //   try {
  //     setLoading(true);

  //     const res = await axios.post(`${BACK_END_URL}/Text-To-Text-Generator`, {
  //       prompt: text,
  //     });
  //     console.log("BACKEND RESPONSE ", res.data);

  //     setResult(res.data);
  //   } catch (err) {
  //     console.error(err);
  //     setResult([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGenerate = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(`${BACK_END_URL}/Text-To-Text-Generator`, {
        prompt: text,
      });

      const rawText = res.data.text || "";

      const ingredientsArray = rawText
        .split(/[,\n]/)
        .map((i: string) => i.trim())
        .filter((i: string) => i !== "");

      setResult(ingredientsArray);
    } catch (err) {
      console.error(err);
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReload = () => {
    setText("");
  };
  return (
    <div className="space-y-6 flex flex-col ">
      <div className="flex justify-between items-center gap-6">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold flex gap-3">
            <StarIcon /> Ingredient recognition
          </h2>
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
        placeholder="Орц тодорхойлох"
        className="min-h-[140px]"
      />

      <Button
        onClick={handleGenerate}
        disabled={!text || loading}
        className="w-fit border items-end flex"
      >
        {loading ? "Generating..." : "Generate"}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>📄 Identified Ingredients</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          {result.length > 0 ? (
            <>
              <p>Here’s a quick summary of the ingredients:</p>
              <ul className="list-disc pl-5 space-y-1">
                {result.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-muted-foreground">
              {loading ? "Analyzing..." : "No ingredients identified yet."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
