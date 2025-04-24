import { Badge } from "@/components/ui/badge";
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
import Approver from "./approver";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const call = await getFetcher({ link: "/investment-get", token });

  const data = call.data.data;
  console.log(data);

  return (
    <div className="overflow-y-auto overflow-x-hidden !p-4 h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Investor name</TableHead>
            <TableHead>Investment status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(
            (i: {
              id: string;
              investor: { name: string };
              invest_status: string;
              amount: string;
            }) =>
              i.invest_status != "approved" && (
                <TableRow key={i.id}>
                  <TableCell>{i.id}</TableCell>
                  <TableCell>{i.investor.name}</TableCell>
                  <TableCell>
                    <Badge>{i.invest_status}</Badge>
                  </TableCell>
                  <TableCell>${i.amount}</TableCell>
                  <TableCell className="flex justify-center items-center">
                    <Approver id={i.id} />
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
