"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

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
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [, setCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(true);
      console.log(values);
      const call = await postFetcher({
        link: "/auth/login",
        meth: "POST",
        data: values,
      });
      console.log(call);

      if (!call.status) {
        form.setError("password", { message: call.message });
        setLoading(false);
        return;
      }
      if (call.access_token) {
        setCookie("token", call.access_token);
        navig.push("/");
        setLoading(false);
      } else {
        console.log("Token not found");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center !px-4 !py-12">
      <Card className="w-full max-w-md border-zinc-200 bg-white shadow-lg">
        <CardHeader className="!space-y-1">
          <CardTitle className="text-2xl font-bold text-zinc-900">
            Login
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Enter your credentials to access your account
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="!pl-10 pr-10 border-zinc-300 focus-visible:ring-green-500"
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

              <div className="flex items-center justify-between">
                <div className=""></div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loading}
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? "Signing in.." : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Form>
        <div className="!px-8 !pb-6 text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-green-600 hover:text-green-700"
          >
            Create account
          </Link>
        </div>
      </Card>
    </div>
  );
}
