import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let call;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    // console.log("token is ", token?.value);

    if (token) {
      call = await getFetcher({ link: "/auth/profile", token: token?.value });
    } else {
      call = { status: false };
    }

    // if (!call.status) {
    //   console.error("Failed to fetch profile:", call);
    // }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }

  return (
    <>
      {call?.status ? <Navbar user={call.data} /> : <Navbar />}
      {children}
      <Footer />
    </>
  );
}
