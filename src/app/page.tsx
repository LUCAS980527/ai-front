'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import StarIcon from "../../public/StarIcon";
import ReloadIcon from "../../public/ReloadIcon";
import { ImageUpload } from "./_components/uploadImage";
import { IngredientRecognition } from "./_components/ingredients";
import { FoodImageCreator } from "./_components/imageCreator";


export default function Home() {
  const [resetUpload, setResetUpload] = useState(false);

  
  return (
    <div className="flex flex-col w-full items-center gap-6">
      <div className="flex w-full h-[56px] ont-sans font-semibold text-base leading-6 tracking-normal align-middl tems-center self-stretch px-12 py-4 border-b border-[#E4E4E7] bg-white ">
        AI tools
      </div>
      <div className="flex  w-[540px] h-[888px]">
        <Tabs defaultValue="analysis" className="w-full flex flex-col gap-3">
          <TabsList className="w-full h-9 rounded-lg p-1 opacity-100 bg-muted flex gap-3  border ">
            <TabsTrigger
              value="analysis"
              className="flex items-center justify-center px-3 py-1 gap-2.5 rounded-md bg-white opacity-50 cursor-pointer "
            >
              Image analysis
            </TabsTrigger>
            <TabsTrigger
              value="ingredient"
              className="flex items-center justify-center px-3 py-1 gap-2.5 rounded-md bg-white opacity-50 cursor-pointer"

            >
              Ingredient recognition
            </TabsTrigger>
            <TabsTrigger
              value="creator"
              className="flex items-center justify-center px-3 py-1 gap-2.5 rounded-md bg-white opacity-50 cursor-pointer"
            >
              Image creator
            </TabsTrigger>
          </TabsList>



          <TabsContent value="analysis" className="mt-6 space-y-4">
                      <div className="flex justify-between">
            <div className="flex gap-2">
              <StarIcon />
              <h1 className="text-[#09090B] font-sans text-xl font-semibold leading-7 tracking-normal">
                Image analysis
              </h1>
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background opacity-50 hover:opacity-100 transition"
            onClick={() => setResetUpload(true)}>
              <ReloadIcon />
            </button>
          </div>
            
            <ImageUpload  reset={resetUpload} onResetDone={() => setResetUpload(false)} />

            <Button disabled className="w-fit border">
              Generate
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>Here is the summary</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                First, enter your image to recognize ingredients.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ingredient">
                 <IngredientRecognition />
             </TabsContent>
          <TabsContent value="creator">
                 <FoodImageCreator/>
             </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
