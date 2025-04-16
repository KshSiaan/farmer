"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { getFetcher, postFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category_id: z.string().min(1, "Select a category"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  harvest_date: z.string().min(1, "Select a date"),
});

export default function ProdAdd() {
  const [cookies] = useCookies(["token"]);
  const [done, setDone] = useState(false);
  const [cats, setCats] = useState<{ id: string; name: string }[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category_id: "",
      description: "",
      price: "",
      harvest_date: "",
    },
  });

  useEffect(() => {
    async function getData() {
      try {
        const call = await getFetcher({
          link: "/all-categories",
          token: cookies.token,
        });
        if (!call.status) {
          console.error(call.message);
          return;
        }
        setCats(call.data.data);
        console.log(call.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [cookies.token]);

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitted Values:", values);
    try {
      const call = await postFetcher({
        link: "/add-product",
        meth: "POST",
        token: cookies.token,
        data: values,
      });
      if (!call.status) {
        console.error(call.error);
        return;
      }
      setDone(true);
      console.log(call);
      // form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="farm">Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-center">
          <DialogTitle className="!mb-8">
            Add a new product of your farm
          </DialogTitle>
          <Form {...form}>
            <form
              className="!space-y-4"
              onSubmit={form.handleSubmit(submitHandler)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Potato" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {cats.map((i) => (
                            <SelectItem key={i.id} value={i.id.toString()}>
                              {i.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 120" {...field} />
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
                        className="!resize-none"
                        rows={5}
                        placeholder="e.g. Freshly harvested organic potatoes..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="harvest_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harvest Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="!py-8 flex justify-center items-center">
                <Button type="submit" disabled={done}>
                  {done ? "Product Addedd Successfully" : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
