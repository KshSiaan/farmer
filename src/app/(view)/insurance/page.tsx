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
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

const insurances = [
  {
    id: 0,
    iph: 12,
    deductible: "20%",
    type: "Yeild index insurance",
    ech: 300,
    Link: "#",
  },
  {
    id: 0,
    iph: 12,
    deductible: "20%",
    type: "Yeild index insurance",
    ech: 300,
    Link: "#",
  },
];

export default function Page() {
  return (
    <main className="!px-[7%]">
      <div className="h-[50dvh] flex flex-col gap-8 justify-center items-center w-full">
        <h1 className="text-6xl font-bold">Insurance & Risk management</h1>
        <p className="text-base text-gray-400">
          Make sure your hard works and efforts stays safe along with you and
          your farm
        </p>
      </div>
      <section className="!py-8">
        <h2 className="text-2xl font-bold text-center !pb-2 !mb-6">
          How Insurance Works
        </h2>
        <ul className="!space-y-4 max-w-[80%] !mx-auto text-lg">
          {[...Array(4)].map((_, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-primary font-bold">{i + 1}.</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                dolorum excepturi, dolores ex soluta quia voluptatibus, possimus
                beatae ab officiis quisquam aliquam ipsam ullam facere fugit
                necessitatibus. Repellendus, quasi velit!
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section className="!py-8">
        <h2 className="text-2xl font-bold text-center !pb-2 !mb-6">
          Apply for farm insurance
        </h2>
        <div className="">
          <Table className="bg-secondary">
            <TableCaption>
              A list of your all the popular investors.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sr.No</TableHead>
                <TableHead>Insurance premium / hectre</TableHead>
                <TableHead>Deductible</TableHead>
                <TableHead>Insurance type</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insurances.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.iph}</TableCell>
                  <TableCell>{item.deductible}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.ech}</TableCell>
                  <TableCell className=" flex justify-center items-center">
                    <Button variant="farm" className="" asChild>
                      <Link href={item.Link}>
                        Apply for insurance
                        <SquareArrowOutUpRight />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}
