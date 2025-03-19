"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { postFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
// Define the form validation schema with Zod
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function LoginForm() {
  const [, setCookie] = useCookies(["token"]);
  const navig = useRouter();

  // Initialize form with React Hook Form and Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const call = await postFetcher({
        link: "/auth/login",
        meth: "POST",
        data: values,
      });
      console.log(call);

      if (call.access_token) {
        setCookie("token", call.access_token);
        navig.push("/");
      } else {
        console.log("Token not found");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center !px-4 !py-12">
      <Card className="w-full max-w-md border-zinc-200 bg-white shadow-lg">
        <CardHeader className="!space-y-1">
          <CardTitle className="text-2xl font-bold text-zinc-900">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Enter your email to verify your account
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-6">
            <CardContent className="!space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <Input
                          placeholder="you@example.com"
                          className="!pl-10 border-zinc-300 focus-visible:ring-green-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-6">
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Send OTP code
              </Button>
              <Button
                className="w-full"
                variant="link"
                onClick={() => {
                  navig.back();
                }}
              >
                Go back
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
