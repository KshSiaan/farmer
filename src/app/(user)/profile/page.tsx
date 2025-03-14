import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <main className="min-h-screen !py-8 !px-2 md:!px-[7%]">
      <section className="w-full max-h-[300px] flex flex-row justify-between items-start">
        <div className="size-[200px] rounded-full bg-zinc-300 "></div>
        <div className="flex flex-col gap-4">
          <Button variant="farm">Manage & Monitor</Button>
          <Button variant="outline">Settings</Button>
        </div>
      </section>
      <section className="!mt-8 !space-y-4">
        <h2 className="text-4xl font-bold">Porter Robinson</h2>
        <p className="text-secondary-foreground text-sm">
          Some more info about the user
        </p>
      </section>
      <section className="!py-8">
        <h2 className="font-bold w-full border-b !pb-4">My farms</h2>
        <div className="w-full h-auto grid grid-cols-4 !py-4 gap-4">
          <div className="relative w-full h-[300px] bg-zinc-300">
            <div className="absolute h-full w-full top-0 left-0 bg-zinc-400  transition-all text-xl text-background flex flex-row justify-center items-center gap-2 opacity-0 hover:opacity-100 cursor-pointer">
              <EyeIcon /> View Farm
            </div>
          </div>
        </div>
      </section>
      <section className="!py-8">
        <h2 className="font-bold w-full border-b !pb-4">My Prodcuts</h2>
        <div className="w-full h-auto grid grid-cols-4 gap-4 !py-4">
          <div className="relative w-full h-[300px] bg-zinc-300">
            <div className="absolute h-full w-full top-0 left-0 bg-zinc-400  transition-all text-xl text-background flex flex-row justify-center items-center gap-2 opacity-0 hover:opacity-100 cursor-pointer">
              <EyeIcon /> View Product
            </div>
          </div>
          <div className="relative w-full h-[300px] bg-zinc-300">
            <div className="absolute h-full w-full top-0 left-0 bg-zinc-400  transition-all text-xl text-background flex flex-row justify-center items-center gap-2 opacity-0 hover:opacity-100 cursor-pointer">
              <EyeIcon /> View Product
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
