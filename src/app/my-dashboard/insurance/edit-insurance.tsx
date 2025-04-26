/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formPostFetcher, getFetcher, postFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { PenIcon } from "lucide-react";

// Define the insurance type
interface InsuranceType {
  farm_id: string;
  provider: string;
  policy_number: string;
  coverage_details: string;
  coverage_amount: string;
  premium: string;
  insurance_status: string;
  claim_status: string;
}

const formSchema = z.object({
  farm_id: z.string().min(1, "Farm ID is required"),
  provider: z.string().min(1, "Provider is required"),
  policy_number: z.string().min(1, "Policy number is required"),
  coverage_details: z.string().min(1, "Coverage details are required"),
  coverage_amount: z.string().min(1, "Coverage amount is required"),
  premium: z.string().min(1, "Premium is required"),
  insurance_status: z.string().min(1, "Insurance status is required"),
  claim_status: z.string().min(1, "Claim status is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditInsurance({ id }: { id: string }) {
  const [cookies] = useCookies(["token"]);
  const [done, setDone] = useState<boolean>(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farm_id: "",
      provider: "",
      policy_number: "",
      coverage_details: "",
      coverage_amount: "",
      premium: "",
      insurance_status: "",
      claim_status: "",
    },
  });

  useEffect(() => {
    async function getCurr() {
      try {
        const call = await getFetcher({
          link: `/insurance-details/${id}`,
          token: cookies.token,
        });
        if (!call.status) {
          console.error(call.message);
          return;
        }
        const insurance: InsuranceType = call.data;
        form.reset({
          farm_id: String(insurance.farm_id),
          provider: insurance.provider,
          policy_number: insurance.policy_number,
          coverage_details: insurance.coverage_details,
          coverage_amount: insurance.coverage_amount,
          premium: insurance.premium,
          insurance_status: insurance.insurance_status,
          claim_status: insurance.claim_status,
        });
      } catch (error) {
        console.error(error);
      }
    }
    getCurr();
  }, [cookies.token, form, id]);

  const onSubmit = async (data: FormValues) => {
    try {
      const final = { ...data, _method: "PUT" };

      console.log(final);

      const call = await postFetcher({
        link: `/update-insurance/${id}`,
        meth: "POST",
        token: cookies.token,
        data: final,
      });

      console.log(call);

      if (!call.status) {
        console.error(call.error);
        return null;
      }

      setDone(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="farm">
            <PenIcon /> Edit Insurance
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update this Insurance</DialogTitle>
            <DialogDescription>
              Enter the details of your insurance below.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <FormField
                control={form.control}
                name="farm_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farm ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter farm ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter insurance provider"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="policy_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Policy Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter policy number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverage_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coverage Details</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter coverage details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverage_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coverage Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter coverage amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="premium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Premium</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter premium amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="insurance_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Status</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter insurance status" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="claim_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Claim Status</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter claim status" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={done}>
                {done ? "Insurance Updated" : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
