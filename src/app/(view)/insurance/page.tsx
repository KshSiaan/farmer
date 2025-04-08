"use server";
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
import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";

interface Insurance {
  id: number;
  farm_id: number;
  user_id: number;
  provider: string;
  policy_number: string;
  coverage_details: string;
  coverage_amount: string;
  premium: string;
  insurance_status: string;
  claim_status: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
  };
  farm: {
    id: number;
    farm_name: string;
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return (
      <div className="h-[400px] w-full flex justify-center items-center font-bold">
        Please log in first
      </div>
    );
  }
  const call = await getFetcher({ link: "/insurance-list", token: token });
  const insurances: Insurance[] = call.data.data;

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
              {insurances.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.provider}</TableCell>
                  <TableCell>{item.claim_status}</TableCell>
                  <TableCell>{item.coverage_amount}</TableCell>
                  <TableCell className=" flex justify-center items-center">
                    <Button variant="farm" className="" asChild>
                      <Link href={`/`}>
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
