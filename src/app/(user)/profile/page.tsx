"use server";
import { Button } from "@/components/ui/button";
import { getFetcher } from "@/lib/simplifier";
import { ProductType } from "@/types/itemTypes";
import { User } from "@/types/userType";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { ProductCard } from "./prodCard";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const call = await getFetcher({ link: "/auth/profile", token: token });

  const prodCall = await getFetcher({ link: "/all-products", token });

  const prods = prodCall.data.data;

  const user: User = call.data;

  return (
    <main className="min-h-screen !py-8 !px-2 md:!px-[7%]">
      <section className="w-full max-h-[300px] flex flex-row justify-between items-start">
        <div
          className="size-[200px] rounded-full bg-zinc-300 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${user.image}')` }}
        ></div>
        <div className="flex flex-col gap-4">
          <Button variant="farm" asChild>
            <Link href="/my-dashboard">Manage & Monitor</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="settings">Settings</Link>
          </Button>
        </div>
      </section>
      <section className="!mt-8 !space-y-4">
        <h2 className="text-4xl font-bold">{user.name}</h2>
        <p className="text-secondary-foreground text-sm">{user.email}</p>
        <p className="text-secondary-foreground text-sm capitalize">
          Role: {user.role}
        </p>
        <p className="text-secondary-foreground text-sm capitalize">
          Address: {user.address}
        </p>
      </section>

      {/* <section className="!py-8">
        <h2 className="font-bold w-full border-b !pb-4">My farms</h2>
        <div className="w-full h-auto grid grid-cols-4 !py-4 gap-4">
          <Link href="/my-dashboard">
            <div className="relative w-full h-[300px] bg-zinc-300">
              <div className="absolute h-full w-full top-0 left-0 bg-zinc-400  transition-all text-xl text-background flex flex-row justify-center items-center gap-2 opacity-0 hover:opacity-100 cursor-pointer">
                <EyeIcon /> View Farm
              </div>
            </div>
          </Link>
        </div>
      </section> */}

      {user.role === "farmer" && (
        <section className="!py-8">
          <h2 className="font-bold w-full border-b !pb-4">My Prodcuts</h2>
          <div className="w-full h-auto grid grid-cols-4 gap-4 !py-4">
            {prods.map((i: ProductType) => (
              <ProductCard product={i} key={i.id} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
