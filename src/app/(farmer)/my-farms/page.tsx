import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { getFetcher } from "@/lib/simplifier";
import { FarmType } from "@/types/itemTypes";
// import AddFarm from "./add-farm";
// import EditFarm from "./edit-farms";
// import DeleteFarm from "./delete-farm";

export default async function MyFarms() {
  const token = (await cookies()).get("token")?.value;

  const call = await getFetcher({ link: "/farms", token });

  const data = call.data.data;

  return (
    <main className="!py-8 !px-[7%]">
      {/* <div className="flex flex-row justify-between items-center">
        <div className=""></div> <AddFarm />
      </div> */}
      <h1 className="text-4xl text-center">My Farms List</h1>
      <div className="!py-8">
        <Table className="bg-secondary">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sr.No</TableHead>
              <TableHead>Farm Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Crop Type</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead className="text-center">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: FarmType) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.farm_name}</TableCell>
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
                  {/* <EditFarm id={item.id} />
                  <DeleteFarm id={item.id} /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
