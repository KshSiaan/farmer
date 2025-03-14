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

const farms = [
  {
    id: "01",
    farmer_name: "John Doe",
    location: "Farmville",
    size: "50 acres",
    crop_type: "Tomato",
    status: "Active",
  },
  {
    id: "02",
    farmer_name: "Jane Smith",
    location: "Greenfield",
    size: "30 acres",
    crop_type: "Corn",
    status: "Inactive",
  },
];

export default function MyFarms() {
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
            {farms.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.farmer_name}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.crop_type}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.status == "Active" ? "default" : "outline"}
                  >
                    {item.status}
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
