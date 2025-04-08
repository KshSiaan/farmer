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
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { getFetcher } from "@/lib/simplifier";
import { FarmType } from "@/types/itemTypes";

export default async function MyFarms() {
  const token = (await cookies()).get("token")?.value;

  const call = await getFetcher({ link: "/farms", token });

  const data = call.data.data;

  return (
    <main className="!py-8 !px-[7%]">
      <div className="!py-8">
        <h2 className="text-lg font-semibold text-center">My Farms</h2>
        <p className="text-muted-foreground text-sm text-center">
          Add, edit, and delete farm details
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className=""></div> <Button>Add Farm</Button>
      </div>
      <div className="!py-8">
        <Table className="bg-secondary">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sr.No</TableHead>
              <TableHead>Farmer Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Crop Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: FarmType) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.farmer.name}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.crop_type}</TableCell>
                <TableCell>
                  <Badge
                    className="capitalize"
                    variant={
                      item.crop_status == "available" ? "default" : "outline"
                    }
                  >
                    {item.crop_status}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-center items-center gap-4">
                  <Button variant="farm" className="" asChild disabled>
                    <Link href="#">
                      <PenIcon />
                      Edit Farm
                    </Link>
                  </Button>
                  <Button variant="destructive" className="" asChild disabled>
                    <Link href="#">
                      <Trash2Icon />
                      Delete Farm
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
