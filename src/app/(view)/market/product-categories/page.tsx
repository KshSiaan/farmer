"use client";
import setImg from "@/lib/imgSetter";
import React from "react";

export default function Page() {
  return (
    <main className="!py-8 !px-[7%]">
      <div className="h-[50dvh] flex flex-col gap-8 justify-center items-center">
        <h1 className="text-6xl font-bold">Product Categories</h1>
        <p className="text-base text-gray-400">
          List of all the product categories comes fresh from farmers
        </p>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {Array.from(Array(7).keys()).map((i) => (
          <div
            key={i}
            className="w-full h-[200px] bg-zinc-200 rounded-xl shadow-sm"
            style={{ backgroundImage: `${setImg()}` }}
          ></div>
        ))}
      </div>
    </main>
  );
}
