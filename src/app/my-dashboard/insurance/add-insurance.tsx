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
import { formPostFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { toast } from "sonner";

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

export default function AddInsurance() {
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
      insurance_status: "active",
      claim_status: "none",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("farm_id", data.farm_id);
      formData.append("provider", data.provider);
      formData.append("policy_number", data.policy_number);
      formData.append("coverage_details", data.coverage_details);
      formData.append("coverage_amount", data.coverage_amount);
      formData.append("premium", data.premium);
      formData.append("insurance_status", data.insurance_status);
      formData.append("claim_status", data.claim_status);

      const call = await formPostFetcher({
        link: "/add-insurance",
        meth: "POST",
        token: cookies.token,
        data: formData,
      });
      if (!call.status) {
        toast(call.message);
        return;
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
          <Button>Add Insurance</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Insurance</DialogTitle>
            <DialogDescription>
              Enter the insurance details below.
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
                      <Input
                        placeholder="Enter insurance status"
                        {...field}
                        disabled
                      />
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
                {done ? "Insurance Added" : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
