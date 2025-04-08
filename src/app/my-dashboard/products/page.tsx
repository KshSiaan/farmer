import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";
import React from "react";
import ControlButts from "./control-butts";
import ProdAdd from "./prod-add";

interface Product {
  id: string;
  farmer_id: number;
  category_id: number;
  name: string;
  description: string;
  price: string;
  harvest_date: string;
  image: string;
  created_at: string;
  updated_at: string;
  farmer: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
    icon: string;
  };
}

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const call = await getFetcher({ link: "/all-products", token });

  return (
    <div className="overflow-y-auto overflow-x-hidden !p-4 h-full">
      <div className="flex flex-row justify-end items-center">
        <ProdAdd />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product name</TableHead>
            <TableHead>Product Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {call.data.data.map((i: Product) => (
            <TableRow key={i.id}>
              <TableCell>{i.id}</TableCell>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.category.name}</TableCell>
              <TableCell>{i.price}</TableCell>
              <TableCell className="!space-x-2 flex flex-row justify-center items-center">
                <ControlButts id={i.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
