"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ProductType } from "@/types/itemTypes";
import { getFetcher } from "@/lib/simplifier";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const pageSearch = useSearchParams().get("name");
  const navig = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const call = await getFetcher({
          link: `/all-products${pageSearch ? "?name=" + pageSearch : ""}`,
          token,
        });

        if (call?.status && Array.isArray(call.data?.data)) {
          setProductList(call.data.data);
        } else {
          setProductList([]); // Handle unexpected structure
          // console.error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error:", error);
        setProductList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageSearch]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchValue);

    try {
      if (!searchValue) {
        navig.push("/market/product");
        return;
      }

      navig.push(`/market/product?name=${searchValue}`);
    } catch (error) {
      console.error(error);
    }

    // Future: Add actual search logic here if needed
  };

  if (loading) {
    return (
      <div className="h-[50dvh] flex flex-col gap-8 justify-center items-center w-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="!py-8 !px-[7%]">
      <div className="h-[50dvh] flex flex-col gap-8 justify-center items-center">
        <h1 className="text-6xl font-bold">Find your own product</h1>
        <p className="text-base text-gray-400">
          List of all the products that comes fresh from farmers
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="w-2/3 !mx-auto flex flex-row justify-center items-center gap-4 !py-4 !mb-12"
      >
        <Input
          className="flex-1"
          placeholder="Search here.."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button type="submit">
          <SearchIcon /> Search
        </Button>
      </form>

      <div className="grid grid-cols-3 gap-6">
        {productList.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 text-xl py-12">
            No products found.
          </div>
        ) : (
          productList.map((item) => (
            <Link key={item.id} href={`/market/product/${item.id}`}>
              <Card>
                <Image
                  src={item.image}
                  height={500}
                  width={300}
                  alt="thumbnail"
                  className="w-full h-[200px] bg-gray-400 bg-center bg-cover bg-no-repeat"
                />
                <CardContent>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <div className="w-full !py-4 text-right">${item.price}</div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
