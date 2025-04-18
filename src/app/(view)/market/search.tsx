"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const navig = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!searchQuery) {
        navig.push("/market/product");
        return;
      }

      navig.push(`/market/product?name=${searchQuery}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full flex-1">
      <div className="w-full">
        <Input
          placeholder="Search Product.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button type="submit" variant="farm">
        Search Product
      </Button>
      <Button asChild>
        <Link href="market/product-categories">Explore Product Categories</Link>
      </Button>
    </form>
  );
}
