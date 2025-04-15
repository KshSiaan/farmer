import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ProductType } from "@/types/itemTypes";
import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
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
      <div className="grid grid-cols-3 gap-6">
        {productList.map((item) => (
          <Link key={item.id} href={`/market/product/${item.id}`}>
            <Card>
              <Image
                src={item.image}
                height={500}
                width={300}
                alt="thumbnail"
                className="w-full h-[200px] bg-gray-400 bg-center bg-cover bg-no-repeat"
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
    </main>
  );
}
