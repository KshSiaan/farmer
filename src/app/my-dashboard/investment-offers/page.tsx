import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function Page() {
  return (
    <div className="overflow-y-auto overflow-x-hidden !p-4 h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Investor name</TableHead>
            <TableHead>Investment subject</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>4892374</TableCell>
            <TableCell>Raven</TableCell>
            <TableCell>Production</TableCell>
            <TableCell>$99.00</TableCell>
            <TableCell className="flex justify-center items-center">
              <Button variant="farm">Accept</Button>
              {/* <Button variant="">Accept</Button> */}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
