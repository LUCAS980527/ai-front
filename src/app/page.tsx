"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { IngredientRecognition } from "./_components/ingredients";
import { FoodImageCreator } from "./_components/imageCreator";
import ImageAnalysis from "./_components/ImageAnalysis";
import ChatButton from "./_components/ChatBot";
export default function Home() {
  return (
    <div className="flex flex-col w-full items-center gap-6">
      <div className="flex w-full h-[56px] font-sans font-semibold text-base leading-6 tracking-normal items-center self-stretch px-12 py-4 border-b border-[#E4E4E7] bg-white">
        AI tools
      </div>
      <div className="flex  w-[540px] h-[888px]">
        <Tabs defaultValue="analysis" className="w-full flex flex-col gap-3">
          <TabsList className="w-full h-9 rounded-lg p-1 opacity-100 bg-muted flex  border justify-around">
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
            <ImageAnalysis />
          </TabsContent>
          <TabsContent value="ingredient" className="mt-6">
            <IngredientRecognition />
          </TabsContent>
          <TabsContent value="creator" className="mt-6">
            <FoodImageCreator />
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <ChatButton />
      </div>
    </div>
  );
}
