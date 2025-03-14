"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import setImg from "@/lib/imgSetter";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="!py-8 !px-[7%]">
      <div className="h-[50dvh] flex flex-col gap-8 justify-center items-center">
        <h1 className="text-6xl font-bold">Find your own product</h1>
        <p className="text-base text-gray-400">
          List of all the products that comes fresh from farmers
        </p>
      </div>
      <div className="w-2/3 !mx-auto flex flex-row justify-center items-center gap-4 !py-4 !mb-12">
        <Input className="flex-1" placeholder="Search here.." />
        <Button>
          <SearchIcon /> Search
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {Array.from(Array(7).keys()).map((i) => (
          <Link href="product/bleh" key={i}>
            <div
              key={i}
              className="w-full h-[200px] bg-zinc-200 rounded-xl shadow-sm"
              style={{ backgroundImage: `${setImg()}` }}
            ></div>
          </Link>
        ))}
      </div>
    </main>
  );
}
