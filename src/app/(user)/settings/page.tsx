"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader2, Save, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DPUp from "./dpup";
import { getFetcher, postFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.enum(["user", "admin", "moderator"], {
    required_error: "Please select a role.",
  }),
  address: z
    .string()
    .min(5, {
      message: "Address must be at least 5 characters.",
    })
    .optional(),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .optional(),
  image: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"], {
    required_error: "Please select a status.",
  }),
  notifications: z.boolean().default(false).optional(),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cookies] = useCookies(["token"]);
  const navig = useRouter();
  // Default values for the form
  const defaultValues: Partial<ProfileFormValues> = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    address: "123 Main St, Anytown, USA",
    phone: "555-123-4567",
    status: "active",
    notifications: true,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
    }, 1000);
  }

  async function onPasswordSubmit(data: PasswordFormValues) {
    setIsLoading(true);
    try {
      const getUser = await getFetcher({
        link: "/auth/profile",
        token: cookies.token,
      });

      if (!getUser.status) {
        console.error(getUser.message);

        return;
      }

      const call = await postFetcher({
        link: "/auth/reset-password",
        meth: "POST",
        token: cookies.token,
        data: {
          email: getUser.data.email,
          password: data.newPassword,
          password_confirmation: data.confirmPassword,
        },
      });

      if (!call.status) {
        console.error(call.message);
        setIsLoading(false);
        return;
      }
      navig.push("/");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="!container !mx-auto !py-10">
      <div className="!mx-auto w-4/5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>
              <UserIcon className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
        </div>

        <Tabs defaultValue="dp" className="!mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dp">Change Profile picture</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="dp" className="!mt-6">
            <DPUp />
          </TabsContent>

          <TabsContent value="security" className="!mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Update your password and security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="!space-y-6"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="!mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save className="!mr-2 h-4 w-4" />
                            Update Password
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Manage your notification settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="!space-y-6">
                    <FormField
                      control={form.control}
                      name="notifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border !p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Email Notifications
                            </FormLabel>
                            <FormDescription>
                              Receive email notifications about account
                              activity.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="!mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="!mr-2 h-4 w-4" />
                            Save Preferences
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
