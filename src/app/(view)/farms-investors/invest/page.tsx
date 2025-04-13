"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FarmType } from "@/types/itemTypes";
import { getFetcher, postFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  amount: z
    .string()
    .min(2, { message: "At least 2 character is required" })
    .max(50),
});
export default function Page() {
  const id = useSearchParams().get("id");
  const navig = useRouter();
  const [farm, setFarm] = useState<FarmType | null>(null);
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      if (!id) {
        navig.replace("/farms-investors");
        return;
      }
      try {
        const call = await getFetcher({
          link: `/farm-details/${id}`,
          token: cookies.token,
        });
        if (!call.status) {
          console.error(call.message);
          return;
        }
        setFarm(call.data);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoading(true);
    try {
      const call = await postFetcher({
        link: "/add-investment",
        token: cookies.token,
        meth: "POST",
        data: { farm_id: id, amount: values.amount },
      });

      if (!call.status) {
        console.error(call.message);
        setLoading(false);
        return;
      }

      navig.push("/my-dashboard/investment-manage");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  if (!id) {
    navig.replace("/farms-investors");
    return <></>;
  }

  return (
    <main className="!py-12 w-full flex justify-center items-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>{farm?.farm_name}</CardTitle>
          <CardDescription>
            Confirm investment in {farm?.farm_name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="00" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full !mt-8" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2Icon className="animate-spin" /> Loading..
                  </>
                ) : (
                  "Confirm Investment"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
