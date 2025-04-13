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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formPostFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";
import { useState } from "react";

const formSchema = z.object({
  farm_name: z.string().min(1, "Farm name is required"),
  location: z.string().min(1, "Location is required"),
  size: z.string().optional(),
  crop_type: z.string().min(1, "Crop type is required"),
  images: z.any().refine((files) => {
    // Skip validation during SSR
    if (typeof window === "undefined") return true;
    return files instanceof FileList && files.length === 1;
  }, "Please upload one image file"),
  target_investment: z.string().min(1, "Target investment is required"),
  current_investment: z.string().min(1, "Current investment is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddFarm() {
  const [cookies] = useCookies(["token"]);
  const [modalOpen, setModalOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farm_name: "",
      location: "",
      size: "",
      crop_type: "",
      target_investment: "",
      current_investment: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("farm_name", data.farm_name);
      formData.append("location", data.location);
      if (data.size) formData.append("size", data.size);
      formData.append("crop_type", data.crop_type);
      formData.append("target_investment", data.target_investment);
      formData.append("current_investment", data.current_investment);
      if (data.images && data.images.length > 0) {
        formData.append("images", data.images[0]);
      }

      const call = await formPostFetcher({
        link: "/add-farm",
        meth: "POST",
        token: cookies.token,
        data: formData,
      });

      if (!call.status) {
        console.error(call.error);
        return null;
      }
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }

    // Log the form data to console
  };

  return (
    <>
      <Dialog open={modalOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Farm
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Farm</DialogTitle>
            <DialogDescription>
              Enter the details of your farm below.
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
                name="farm_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farm Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter farm name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter size" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="crop_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter crop type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Farm Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files)}
                        {...rest}
                      />
                    </FormControl>
                    <FormDescription>
                      Please upload one image file
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="target_investment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Investment</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter target investment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="current_investment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Investment</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter current investment"
                        {...field}
                      />
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
    </>
  );
}
