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

const insurances = [
  {
    id: "01",
    provider: "ABC Insurance",
    policy_number: "12345XYZ",
    coverage_amount: "$500,000",
    premium: "$300/month",
    insurance_status: "Active",
    claim_status: "No Claims",
  },
  {
    id: "02",
    provider: "XYZ Life Insurance",
    policy_number: "67890ABC",
    coverage_amount: "$1,000,000",
    premium: "$450/month",
    insurance_status: "Inactive",
    claim_status: "Claim Filed",
  },
];

export default function MyInsurances() {
  return (
    <main className="!py-8 !px-[7%]">
      <div className="!py-8">
        <h2 className="text-lg font-semibold text-center">My Insurances</h2>
        <p className="text-muted-foreground text-sm text-center">
          Add, edit, and delete insurance details
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className=""></div> <Button>Add Insurance</Button>
      </div>
      <div className="!py-8">
        <Table className="bg-secondary">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sr.No</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Policy Number</TableHead>
              <TableHead>Coverage Amount</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Insurance Status</TableHead>
              <TableHead>Claim Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {insurances.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.provider}</TableCell>
                <TableCell>{item.policy_number}</TableCell>
                <TableCell>{item.coverage_amount}</TableCell>
                <TableCell>{item.premium}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.insurance_status === "Active" ? "default" : "outline"
                    }
                  >
                    {item.insurance_status}
                  </Badge>
                </TableCell>
                <TableCell>{item.claim_status}</TableCell>
                <TableCell className="flex justify-center items-center gap-4">
                  <Button variant="farm" className="" asChild disabled>
                    <Link href="#">
                      <PenIcon />
                      Edit Insurance
                    </Link>
                  </Button>
                  <Button variant="destructive" className="" asChild disabled>
                    <Link href="#">
                      <Trash2Icon />
                      Delete Insurance
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
