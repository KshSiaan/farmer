"use server";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getFetcher } from "@/lib/simplifier";
import { cookies } from "next/headers";
import { FarmType, InvestmentType } from "@/types/itemTypes";
import FarmModal from "./farm-modal";

export default async function FarmsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <>
        <div className="h-[300px] w-full flex flex-col justify-center items-center gap-4">
          <h2 className="text-lg font-semibold">
            User must be logged in to see this content
          </h2>
        </div>
      </>
    );
  }

  const farmCall = await getFetcher({ link: "/farms", token: token });

  const farmData: FarmType[] = farmCall.data.data;

  const invCall = await getFetcher({ link: "/investment-get", token: token });

  const invData: InvestmentType[] = invCall.data.data;

  const catCall = await getFetcher({ link: "/all-categories", token: token });

  const catData = catCall.data.data;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] bg-zinc-900">
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="Farms hero image"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full !px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Connect with Farms & Investors
          </h1>
          <p className="!mt-4 text-lg text-zinc-200 max-w-2xl">
            Discover sustainable farming opportunities and connect with
            investors looking to support agricultural innovation.
          </p>
          <div className="flex flex-col sm:flex-row w-full max-w-2xl !mt-8 gap-2">
            <Input
              placeholder="Search farms, crops, or locations..."
              className="bg-white/90 border-0"
            />
            <Button className="bg-green-600 hover:bg-green-700">Search</Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="!px-4 !py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center !mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Farm Listings</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Browse farms seeking investment and partnership opportunities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmData.map((farm) => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>
      </section>

      {/* Investors Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900 !py-12">
        <div className="!px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center !mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Featured Investors
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Connect with investors looking to support agricultural ventures
              </p>
            </div>
            <Button
              variant="link"
              className="text-green-600 dark:text-green-500 p-0 h-auto font-medium"
            >
              View All Investors
              <ArrowUpRight className="h-4 w-4 !ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {invData.map((investor) => (
              <Card
                key={investor.id}
                className="border-zinc-200 dark:border-zinc-800"
              >
                <CardHeader className="!pb-2">
                  <div className="flex items-center gap-3">
                    <div>
                      <CardTitle className="text-base">
                        {investor.investor.name}
                      </CardTitle>
                      <CardDescription>{investor.profit_share}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="!pb-4">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {investor.profit_share}
                  </p>
                  {/* <div className="flex flex-wrap gap-1 !mt-3">
                    {investor.interests.map((interest, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div> */}
                </CardContent>
                {/* <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Connect
                  </Button>
                </CardFooter> */}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section className="!px-4 !py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center !mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Marketplace</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Browse products, equipment, and services from our farming
              community
            </p>
          </div>
          <Button
            variant="link"
            className="text-green-600 dark:text-green-500 p-0 h-auto font-medium"
          >
            Visit Marketplace
            <ArrowUpRight className="h-4 w-4 !ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {catData.map((category: any, i: number) => (
            <Link
              key={i}
              href="#"
              className="group flex flex-col items-center !p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-green-500 dark:hover:border-green-500 transition-colors"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-full !mb-3 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="opacity-70 object-cover object-center w-full h-full rounded-full !p-1"
                />
              </div>
              <span className="text-sm font-medium text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 dark:bg-green-900/20 !py-12">
        <div className="!px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Are you a farmer looking for investment?</CardTitle>
                <CardDescription>
                  List your farm and connect with potential investors to grow
                  your agricultural business.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="!mr-2 !mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600 dark:text-green-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    Create a detailed profile for your farm
                  </li>
                  <li className="flex items-start">
                    <div className="!mr-2 !mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600 dark:text-green-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    Showcase your sustainable farming practices
                  </li>
                  <li className="flex items-start">
                    <div className="!mr-2 !mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600 dark:text-green-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    Connect directly with interested investors
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  List Your Farm
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>
                  Are you an investor interested in agriculture?
                </CardTitle>
                <CardDescription>
                  Discover farming opportunities that align with your investment
                  goals and values.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="!mr-2 !mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600 dark:text-green-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    Browse vetted agricultural investment opportunities
                  </li>
                  <li className="flex items-start">
                    <div className="!mr-2 !mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600 dark:text-green-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    Filter farms by sustainability practices and returns
                  </li>
                  <li className="flex items-start">
                    <div className="!mr-2 !mt-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600 dark:text-green-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    Support local and sustainable agriculture
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Become an Investor
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

function FarmCard({ farm }: { farm: FarmType }) {
  return (
    <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 hover:border-green-500 dark:hover:border-green-500 transition-colors">
      <div className="relative h-48">
        <Image
          src={farm.image[0] || "/placeholder.svg"}
          alt={farm.farm_name}
          fill
          className="object-cover"
        />
        {farm.crop_status == "available" && (
          <Badge className="absolute top-2 right-2 bg-green-600">
            Available
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{farm.farm_name}</CardTitle>
            <div className="flex items-center text-zinc-500 text-sm !mt-1">
              <MapPin className="h-3.5 w-3.5 !mr-1" />
              {farm.location}
            </div>
          </div>
          {/* <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-400 stroke-amber-400 !mr-1" />
            <span className="text-sm font-medium">{farm.rating}</span>
          </div> */}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 !mb-3">
          {farm.crop_type}
        </p>
        {/* <div className="flex flex-wrap gap-1 !mb-3">
          {farm..map((tag: string, i: number) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div> */}
        <Separator className="!my-3" />
        {/* <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Investment Opportunity
            </p>
            <p className="font-semibold text-green-600 dark:text-green-500">
              ${farm.investmentMin.toLocaleString()} - $
              {farm.investmentMax.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center text-zinc-500 text-sm">
            <Users className="h-3.5 w-3.5 !mr-1" />
            {farm.investors} investors
          </div>
        </div> */}
      </CardContent>
      <CardFooter className="!pt-0">
        <FarmModal farm={farm}/>
      </CardFooter>
    </Card>
  );
}
