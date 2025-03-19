"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { postFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
// Define the form validation schema with Zod
const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    phone: z.string(),
    address: z.string({ required_error: "Address is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirm_pass: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirm_pass, {
    message: "Passwords don't match",
    path: ["confirm_pass"],
  });

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [, setCookie] = useCookies(["token"]);
  const navig = useRouter();

  // Initialize form with React Hook Form and Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      name: "",
      address: "",
      confirm_pass: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Form submitted with values:", values);
      const call = await postFetcher({
        link: "/auth/signup",
        meth: "POST",
        data: values,
      });
      console.log("Response from server:", call);

      if (call.access_token) {
        console.log("Setting token and redirecting");
        setCookie("token", call.access_token);
        navig.push("/");
      } else {
        console.log("Token not found in response");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center !px-4 !py-12">
      <Card className="w-full md:w-1/2 border-zinc-200 bg-white shadow-lg">
        <CardHeader className="!space-y-1">
          <CardTitle className="text-2xl font-bold text-zinc-900">
            Register
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Create your account absolutely for free
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-zinc-700">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Your name"
                          className=" border-zinc-300 focus-visible:ring-green-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-zinc-700">Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="New york"
                          className=" border-zinc-300 focus-visible:ring-green-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="you@example.com"
                          className="border-zinc-300 focus-visible:ring-green-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Phone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="0123456789"
                          className="! border-zinc-300 focus-visible:ring-green-500"
                          type="tel"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="!pr-10 border-zinc-300 focus-visible:ring-green-500"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-10 w-10 text-zinc-400 hover:text-zinc-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_pass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showCPassword ? "text" : "password"}
                          className="!pr-10 border-zinc-300 focus-visible:ring-green-500"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-10 w-10 text-zinc-400 hover:text-zinc-500"
                          onClick={() => setShowCPassword(!showCPassword)}
                        >
                          {showCPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                          <span className="sr-only">
                            {showCPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="!mt-8 w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Sign up
              </Button>
            </CardFooter>
          </form>
        </Form>
        <div className="!px-8 !pb-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-green-600 hover:text-green-700"
          >
            Log in
          </Link>
        </div>
      </Card>
    </div>
  );
}
