import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";
import { getFetcher } from "@/lib/simplifier";
import { InsuranceType } from "@/types/itemTypes";
import AddFarm from "./add-insurance";
import EditFarm from "./edit-insurance";
import DeleteFarm from "./delete-insurance";

export default async function MyFarms() {
  const token = (await cookies()).get("token")?.value;

  const call = await getFetcher({ link: "/insurance-list", token });

  const data = call.data.data;

  return (
    <main className="!py-8 !px-[2%]">
      <div className="flex flex-row justify-between items-center">
        <div className=""></div> <AddFarm />
      </div>
      <div className="!py-8">
        <Table className="bg-secondary">
          <TableCaption>A list of all the insurances.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Insurance Provider</TableHead>
              <TableHead>Claim Status</TableHead>
              <TableHead>Coverage Amount</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: InsuranceType) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.provider}</TableCell>
                <TableCell>{item.claim_status}</TableCell>
                <TableCell>{item.coverage_amount}</TableCell>
                <TableCell className="flex justify-center items-center gap-4">
                  <EditFarm id={item.id} />
                  <DeleteFarm id={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
