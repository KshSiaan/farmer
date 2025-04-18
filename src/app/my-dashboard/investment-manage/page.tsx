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
import { User } from "@/types/userType";
import { cookies } from "next/headers";
import React from "react";
import ViewInvestor from "./view-investor";
import { InvestmentType } from "@/types/itemTypes";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const userCall = await getFetcher({ link: "/auth/profile", token });
  const call = await getFetcher({ link: "/investment-get", token });

  if (!userCall.status) {
    console.error(userCall.message);
  }
  if (!call.status) {
    console.error(call.message);
  }

  const userData: User = userCall.data;
  const data = call.data.data;

  return (
    <div className="overflow-y-auto overflow-x-hidden !p-4 h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>
              {userData.role == "farmer" ? "Investor name" : "Farm name"}
            </TableHead>
            <TableHead>Investment status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((i: InvestmentType) => (
            <TableRow key={i.id}>
              <TableCell>{i.id}</TableCell>
              <TableCell>
                {userData.role == "farmer" ? i.investor.name : i.farm.farm_name}
              </TableCell>
              <TableCell>
                <Badge>{i.invest_status}</Badge>
              </TableCell>
              <TableCell>${i.amount}</TableCell>
              <TableCell className="flex justify-center items-center">
                <ViewInvestor data={i} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
