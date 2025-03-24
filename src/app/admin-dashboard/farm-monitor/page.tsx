import Fchart from "@/components/shared/sub/f-chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, MapPinHouseIcon } from "lucide-react";
// import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token?.value) {
    return (
      <div className="h-dvh w-full flex justify-center items-center font-bold">
        Please log in first
      </div>
    );
  }

  // const call = await getFetcher({ link: "/auth/profile", token: token?.value });

  return (
    <>
      <div className="h-full w-full !p-4 flex flex-col justify-between items-start gap-4">
        <div className="w-full grid grid-cols-5 gap-4">
          <div className="col-span-2 h-[120px] border rounded-lg !p-4 flex flex-col justify-between items-center">
            <div className="w-full font-bold flex text-sm text-zinc-800">
              <MapPinHouseIcon className="size-5 !mr-2" />
              Location
            </div>
            <div className="w-full">
              <Input value="Dinajpur" readOnly />
            </div>
          </div>
          <div className="col-span-3 h-[120px] !p-4 border rounded-lg flex flex-col justify-between items-center">
            <div className="w-full flex flex-row justify-between items-start">
              <div className="font-bold flex text-sm text-zinc-800">
                <Calendar className="size-5 !mr-2" />
                Season
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <ScrollArea className="w-full whitespace-nowrap !py-4 ">
                <div className="!space-x-2">
                  <Button variant="outline">January</Button>
                  <Button variant="outline">February</Button>
                  <Button variant="outline">March</Button>
                  <Button variant="farm">April</Button>
                  <Button variant="outline">May</Button>
                  <Button variant="outline">June</Button>
                  <Button variant="outline">July</Button>
                  <Button variant="outline">August</Button>
                  <Button variant="outline">September</Button>
                  <Button variant="outline">October</Button>
                  <Button variant="outline">November</Button>
                  <Button variant="outline">December</Button>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full rounded-lg border grid grid-cols-5 !p-4 divide-x">
          <div className="col-span-3 h-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farm name</TableHead>
                  <TableHead>Product status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>RojiFarm</TableCell>
                  <TableCell>20KG Tomatoes Sold</TableCell>
                  <TableCell>31-04-2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>RojiFarm</TableCell>
                  <TableCell>20KG Tomatoes added</TableCell>
                  <TableCell>29-04-2025</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="col-span-2 flex flex-col justify-between items-center">
            <div className="text-sm font-bold border-b w-full text-center !pb-2">
              Farm analytics
            </div>
            <Fchart />
          </div>
        </div>
      </div>
    </>
  );
}
