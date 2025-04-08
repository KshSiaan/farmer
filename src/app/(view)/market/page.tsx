// "use client";
"use server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import setImg from "@/lib/imgSetter";
import { getFetcher } from "@/lib/simplifier";
import { ProductType } from "@/types/itemTypes";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token?.value) {
    return (
      <div className="h-[400px] w-full flex justify-center items-center font-bold">
        Please log in first
      </div>
    );
  }

  const call = await getFetcher({ link: "/all-products", token: token?.value });
  // console.log(call);

  if (!call.status) {
    return (
      <div className="h-[50dvh] flex flex-col gap-8 justify-center items-center w-screen">
        Internal server error
      </div>
    );
  }

  const data = call.data;

  const productList: ProductType[] = data.data;

  let offers = productList;
  if (offers.length >= 7) {
    offers = productList.slice(0, 7);
  }

  console.log(productList);

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
          {offers.map((item, index) => (
            <div
              key={index}
              className="w-full bg-cover bg-center h-[200px] bg-gray-400 rounded-full bg-no-repeat hover:shadow-md shadow-black/50"
              style={{ backgroundImage: item.image }}
            ></div>
          ))}
        </div>
      </div>
      <div className="!py-8 !px-6 w-screen h-auto">
        <h3 className="font-bold text-lg text-center">Today&apos;s trends</h3>
        <div className="!pt-8 grid grid-cols-4 gap-6">
          {productList.map((item, index) => (
            <Link key={index} href={`/market.product`}>
              <Card>
                <CardHeader
                  className="w-full h-[200px] bg-gray-400 bg-center bg-cover bg-no-repeat"
                  style={{ backgroundImage: item.image }}
                />
                <CardContent className="">
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <div className="w-full !py-4 text-right">${item.price}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="!px-6 w-screen h-auto !py-8">
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
      </div> */}
      {/* <div className="!px-6 w-screen h-auto !py-8">
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
      </div> */}
      <div className="!px-6 w-screen h-auto !py-8">
        <div className="h-[300px] flex justify-center items-center bg-zinc-100 font-bold text-4xl text-center">
          We encourage you <br /> to donate and help the farmers
        </div>
      </div>
    </div>
  );
}
