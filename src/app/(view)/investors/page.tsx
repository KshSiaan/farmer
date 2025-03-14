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
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

const investors = [
  {
    id: "01",
    name: "Marshmello",
    amount: "$250.00",
    profileLink: "/profile",
  },
  {
    id: "02",
    name: "Slushii",
    amount: "$200.00",
    profileLink: "/profile",
  },
];

export default function Page() {
  return (
    <main className="!p-18">
      <div className="!py-8">
        <h1 className="text-center text-4xl font-semibold underline">
          Investors
        </h1>
      </div>
      <Table className="bg-secondary">
        <TableCaption>A list of your all the popular investors.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sr.No</TableHead>
            <TableHead>Investor name</TableHead>
            <TableHead>Total invest amount</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investors.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell className=" flex justify-center items-center">
                <Button variant="farm" className="" asChild>
                  <Link href={item.profileLink}>
                    <EyeIcon />
                    View profile
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
