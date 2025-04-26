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
import { Textarea } from "@/components/ui/textarea";
import { formPostFetcher, getFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { PenIcon } from "lucide-react";
import { toast } from "sonner";

// Define the category type
interface CategoryType {
  id: number;
  farmer_id: number;
  name: string;
  icon: string;
  description: string;
  created_at: string;
  updated_at: string;
  farmer: {
    id: number;
    name: string;
  };
}

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditCategory({ id }: { id: string }) {
  const [cookies] = useCookies(["token"]);
  const [done, setDone] = useState<boolean>(false);
  const [currentIcon, setCurrentIcon] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    async function getCurr() {
      try {
        const call = await getFetcher({
          link: `/details-categories/${id}`,
          token: cookies.token,
        });
        if (!call.status) {
          console.log(call);

          console.error(call.message);
          return;
        }
        const category: CategoryType = call.data;
        setCurrentIcon(category.icon);
        form.reset({
          name: category.name,
          description: category.description,
        });
      } catch (error) {
        console.error(error);
      }
    }
    getCurr();
  }, [cookies.token, form, id]);

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (data.icon && data.icon instanceof FileList && data.icon.length > 0) {
        formData.append("icon", data.icon[0]);
      }

      const call = await formPostFetcher({
        link: `/update-categorie/${id}`,
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
          <Button variant="farm">
            <PenIcon /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update this Category</DialogTitle>
            <DialogDescription>
              Edit the details of your product category below.
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter category description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {currentIcon && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Current Icon:</p>
                  <img
                    src={currentIcon || "/placeholder.svg"}
                    alt="Current category icon"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="icon"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Category Icon (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files)}
                        {...rest}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a new image to change the category icon
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={done}>
                {done ? "Category Updated" : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
