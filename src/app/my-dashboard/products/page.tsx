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
            <TableHead>Product name</TableHead>
            <TableHead>Product Category</TableHead>
            <TableHead>Stock amount</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>4892374</TableCell>
            <TableCell>Totmato</TableCell>
            <TableCell>Vegetable</TableCell>
            <TableCell>12kg</TableCell>
            <TableCell className="!space-x-2 flex flex-row justify-center items-center">
              <Button variant="farm">Add more</Button>
              <Button variant="destructive">Delete</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
