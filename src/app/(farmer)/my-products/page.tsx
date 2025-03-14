import { Button } from "@/components/ui/button";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { PenIcon, Trash2Icon } from "lucide-react";

const products = [
  {
    id: "01",
    name: "Tomato",
    category: "Vegitable",
    price: "20/-",
    harvest_date: "12-03-2025",
  },
  {
    id: "02",
    name: "Tomato",
    category: "Vegitable",
    price: "20/-",
    harvest_date: "12-03-2025",
  },
];

export default function MyProducts() {
  return (
    <main className="!py-8 !px-[7%]">
      <div className="!py-8">
        <h2 className="text-lg font-semibold text-center">My products</h2>
        <p className="text-muted-foreground text-sm text-center">
          Add,edit and delete products
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className=""></div> <Button>Add product</Button>
      </div>
      <div className="!py-8">
        <Table className="bg-secondary">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sr.No</TableHead>
              <TableHead>Product name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Harvest Date</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.harvest_date}</TableCell>
                <TableCell className=" flex justify-center items-center gap-4">
                  <Button variant="farm" className="" asChild disabled>
                    <Link href="#">
                      <PenIcon />
                      Edit product
                    </Link>
                  </Button>
                  <Button variant="destructive" className="" asChild disabled>
                    <Link href="#">
                      <Trash2Icon />
                      Delete product
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
