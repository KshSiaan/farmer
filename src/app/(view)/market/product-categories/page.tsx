"use server";
import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return <>Please login first</>;
  }
  const call = await getFetcher({ link: "/all-categories", token });
  if (!call.status) {
    return <>{call.message}</>;
  }
  const data = call.data.data;
  return (
    <main className="!py-8 !px-[7%]">
      <div className="h-[50dvh] flex flex-col gap-8 justify-center items-center">
        <h1 className="text-6xl font-bold">Product Categories</h1>
        <p className="text-base text-gray-400">
          List of all the product categories comes fresh from farmers
        </p>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {data.map((i: { id: string; icon: string; name: string }) => (
          <Link href={"/market/product"} key={i.id}>
            <div className="border rounded-xl hover:scale-105 transition-all hover:shadow-sm cursor-pointer">
              <Image
                src={i.icon}
                height={500}
                width={500}
                alt="thumbnail"
                className="w-full h-[200px] bg-zinc-200 rounded-xl shadow-sm object-cover object-center"
              />
              <div className="!p-2">
                <h4 className="text-lg font-bold">{i.name}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
