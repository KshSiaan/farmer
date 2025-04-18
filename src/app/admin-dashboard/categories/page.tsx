import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";
import { getFetcher } from "@/lib/simplifier";
import EditCategory from "./edit-category";
import Image from "next/image";
import AddCategory from "./add-category";

interface CatType {
  id: string;
  farmer_id: string;
  name: string;
  icon: string;
  description: string;
  created_at: string;
  updated_at: string;
  farmer: {
    id: number;
    name: string;
  };
}

export default async function MyFarms() {
  const token = (await cookies()).get("token")?.value;

  const call = await getFetcher({ link: "/all-categories", token });

  const data = call.data.data;

  return (
    <main className="!py-8 !px-[2%]">
      <div className="flex flex-row justify-between items-center">
        <div className=""></div>
        <AddCategory />
      </div>
      <div className="!py-8">
        <Table className="bg-secondary">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sr.No</TableHead>
              <TableHead>Category Icon</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: CatType, i: number) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <Image
                    src={item.icon}
                    height={28}
                    width={28}
                    alt="thumbnail"
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item?.description
                    ? `${item.description.slice(0, 20)}${
                        item.description.length > 20 ? "..." : ""
                      }`
                    : "N/A"}
                </TableCell>

                <TableCell>{item.updated_at}</TableCell>
                <TableCell className="flex justify-center items-center gap-4">
                  <EditCategory id={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
