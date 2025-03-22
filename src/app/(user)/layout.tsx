"use server";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const call = await getFetcher({ link: "/auth/profile", token: token?.value });
  console.log(call);
  return (
    <>
      <Navbar user={call.data} />
      {children}
      <Footer />
    </>
  );
}
