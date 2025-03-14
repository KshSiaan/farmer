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
    name: "RavenField",
    amount: "$250.00",
    invest: "$250.00",
    crop_type: "any",
    profileLink: "/profile",
  },
  {
    id: "02",
    name: "Hoilei hoilo",
    amount: "$200.00",
    invest: "$250.00",
    crop_type: "any",
    profileLink: "/profile",
  },
];

export default function Page() {
  return (
    <main className="!p-18">
      <div className="!py-8">
        <h1 className="text-center text-4xl font-semibold underline">Farms</h1>
      </div>
      <Table className="bg-secondary">
        <TableCaption>A list of your all the popular Farms.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sr.No</TableHead>
            <TableHead>Farm name</TableHead>
            <TableHead>Total earned</TableHead>
            <TableHead>Total invested</TableHead>
            <TableHead>Crop type</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investors.map((item, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.invest}</TableCell>
              <TableCell>{item.crop_type}</TableCell>
              <TableCell className=" flex justify-center items-center">
                <Button variant="farm" className="" asChild>
                  <Link href={item.profileLink}>
                    <EyeIcon />
                    View Farm
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
