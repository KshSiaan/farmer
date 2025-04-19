"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SquareDashedKanban } from "lucide-react";
import { postFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

// Define the form schema with zod
const formSchema = z.object({
  farm_id: z.string(),
  temperature: z.coerce.number().min(0).max(100),
  soil_moisture: z.coerce.number().min(0).max(100),
  rainfall: z.coerce.number().min(0).max(1000),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpdateFarmMonitor({ id }: { id: string | number }) {
  const [cookies] = useCookies(["token"]);
  const navig = useRouter();
  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farm_id: String(id),
      temperature: 35,
      soil_moisture: 10,
      rainfall: 10,
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    console.log("Form data:", data);
    try {
      const call = await postFetcher({
        link: "/add-monitoring",
        meth: "POST",
        token: cookies.token,
        data,
      });

      if (!call.status) {
        console.log(call.message);
        return;
      }

      navig.push("/my-dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="farm">
          <SquareDashedKanban className="mr-2 h-4 w-4" /> Update Monitor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Farm Monitor - {id}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="farm_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm ID</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temperature (°C)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="soil_moisture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soil Moisture (%)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rainfall"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rainfall (mm)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
