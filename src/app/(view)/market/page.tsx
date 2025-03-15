"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import setImg from "@/lib/imgSetter";
import Link from "next/link";
import React from "react";

console.log(setImg());

export default function Page() {
  return (
    <div>
      <div className="h-[50dvh] flex flex-col gap-8 justify-center items-center w-screen">
        <h1 className="text-6xl font-bold">Farmer&apos;s Marketplace</h1>
        <p className="text-base text-gray-400">
          This is where farmers sells and offers other users to buy the goods
        </p>
      </div>
      <div className="!px-6 w-screen h-auto !py-8">
        <h3 className="font-bold text-lg text-center !mb-8">Find poducts</h3>
        <div className="w-2/3 !mx-auto flex flex-row justify-center items-center gap-4">
          <div className="flex-1">
            <Input placeholder="Search Product.." />
          </div>
          <Button variant="farm">
            <Link href="market/product">Search Product</Link>
          </Button>
          <Button>
            <Link href="market/product-categories">
              Explore Product Categories
            </Link>
          </Button>
        </div>
      </div>
      <div className="!px-6 w-screen h-auto !py-8">
        <h3 className="font-bold text-lg text-center">Top Offers</h3>
        <div className="!pt-8 grid grid-cols-7 gap-6">
          {Array.from(Array(7).keys()).map((item, index) => (
            <div
              key={index}
              className="wfull h-[200px] bg-gray-400"
              style={{ backgroundImage: `${setImg()}` }}
            ></div>
          ))}
        </div>
      </div>
      <div className="!py-8 !px-6 w-screen h-auto">
        <h3 className="font-bold text-lg text-center">Today&apos;s trends</h3>
        <div className="!pt-8 grid grid-cols-4 gap-6">
          {Array.from(Array(10).keys()).map((item, index) => (
            <div
              key={index}
              className="wfull h-[200px] bg-gray-400"
              style={{ backgroundImage: `${setImg()}` }}
            ></div>
          ))}
        </div>
      </div>
      <div className="!px-6 w-screen h-auto !py-8">
        <h3 className="font-bold text-lg text-center">Active farms</h3>
        <div className="!pt-8 grid grid-cols-4 gap-6">
          {Array.from(Array(4).keys()).map((item, index) => (
            <div
              key={index}
              className="wfull h-[200px] bg-gray-400"
              style={{ backgroundImage: `${setImg()}` }}
            ></div>
          ))}
        </div>
      </div>
      <div className="!px-6 w-screen h-auto !py-8">
        <h3 className="font-bold text-lg text-center">Farmers you may know</h3>
        <div className="!pt-8 grid grid-cols-6 gap-6">
          {Array.from(Array(6).keys()).map((item, index) => (
            <div
              key={index}
              className="wfull h-[200px] bg-gray-400"
              style={{ backgroundImage: `${setImg()}` }}
            ></div>
          ))}
        </div>
      </div>
      <div className="!px-6 w-screen h-auto !py-8">
        <div className="h-[300px] flex justify-center items-center bg-zinc-100 font-bold text-4xl text-center">
          We encourage you <br /> to donate and help the farmers
        </div>
      </div>
    </div>
  );
}
