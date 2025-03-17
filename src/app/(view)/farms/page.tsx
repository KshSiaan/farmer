"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Filter,
  MapPin,
  Star,
  Users,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FarmsPage() {
  const [, setActiveTab] = useState("all");

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
          <div className="flex flex-col sm:flex-row gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4 !mr-1" />
                  Filter
                  <ChevronDown className="h-4 w-4 !ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>Organic Farms</DropdownMenuItem>
                <DropdownMenuItem>Livestock</DropdownMenuItem>
                <DropdownMenuItem>Crop Production</DropdownMenuItem>
                <DropdownMenuItem>Sustainable Practices</DropdownMenuItem>
                <DropdownMenuItem>Investment Ready</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  Sort By
                  <ChevronDown className="h-4 w-4 !ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Recently Added</DropdownMenuItem>
                <DropdownMenuItem>Most Popular</DropdownMenuItem>
                <DropdownMenuItem>
                  Investment Size: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Investment Size: High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="all" className="!mb-8" onValueChange={setActiveTab}>
          <TabsList className="!mb-6">
            <TabsTrigger value="all">All Farms</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="organic">Organic</TabsTrigger>
            <TabsTrigger value="livestock">Livestock</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="!mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farms.map((farm) => (
                <FarmCard key={farm.id} farm={farm} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="!mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farms
                .filter((farm) => farm.featured)
                .map((farm) => (
                  <FarmCard key={farm.id} farm={farm} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="organic" className="!mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farms
                .filter((farm) => farm.tags.includes("Organic"))
                .map((farm) => (
                  <FarmCard key={farm.id} farm={farm} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="livestock" className="!mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farms
                .filter((farm) => farm.tags.includes("Livestock"))
                .map((farm) => (
                  <FarmCard key={farm.id} farm={farm} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="crops" className="!mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farms
                .filter((farm) => farm.tags.includes("Crops"))
                .map((farm) => (
                  <FarmCard key={farm.id} farm={farm} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center !mt-8">
          <Button variant="outline" className="gap-1">
            Load More Farms
            <ChevronDown className="h-4 w-4 !ml-1" />
          </Button>
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
            {investors.map((investor) => (
              <Card
                key={investor.id}
                className="border-zinc-200 dark:border-zinc-800"
              >
                <CardHeader className="!pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={investor.avatar} alt={investor.name} />
                      <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {investor.name}
                      </CardTitle>
                      <CardDescription>{investor.type}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="!pb-4">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {investor.description}
                  </p>
                  <div className="flex flex-wrap gap-1 !mt-3">
                    {investor.interests.map((interest, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Connect
                  </Button>
                </CardFooter>
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
          {marketplaceCategories.map((category, i) => (
            <Link
              key={i}
              href="#"
              className="group flex flex-col items-center p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-green-500 dark:hover:border-green-500 transition-colors"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-full !mb-3 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt={category}
                  width={40}
                  height={40}
                  className="opacity-70"
                />
              </div>
              <span className="text-sm font-medium text-center">
                {category}
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

// Farm Card Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FarmCard({ farm }: any) {
  return (
    <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 hover:border-green-500 dark:hover:border-green-500 transition-colors">
      <div className="relative h-48">
        <Image
          src={farm.image || "/placeholder.svg"}
          alt={farm.name}
          fill
          className="object-cover"
        />
        {farm.featured && (
          <Badge className="absolute top-2 right-2 bg-green-600">
            Featured
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{farm.name}</CardTitle>
            <div className="flex items-center text-zinc-500 text-sm !mt-1">
              <MapPin className="h-3.5 w-3.5 !mr-1" />
              {farm.location}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-400 stroke-amber-400 !mr-1" />
            <span className="text-sm font-medium">{farm.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 !mb-3">
          {farm.description}
        </p>
        <div className="flex flex-wrap gap-1 !mb-3">
          {farm.tags.map((tag: string, i: number) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between items-center">
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
        </div>
      </CardContent>
      <CardFooter className="!pt-0">
        <Button className="w-full bg-green-600 hover:bg-green-700">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

// Sample Data
const farms = [
  {
    id: 1,
    name: "Green Valley Organics",
    description:
      "A 50-acre organic vegetable farm specializing in sustainable farming practices and crop rotation. Looking for investment to expand greenhouse operations.",
    location: "Sonoma County, CA",
    image: "/placeholder.svg?height=200&width=400",
    rating: 4.8,
    tags: ["Organic", "Vegetables", "Sustainable", "Crops"],
    investmentMin: 50000,
    investmentMax: 150000,
    investors: 12,
    featured: true,
  },
  {
    id: 2,
    name: "Highland Cattle Ranch",
    description:
      "Family-owned cattle ranch with 200 grass-fed cattle on 500 acres. Seeking partnership to implement regenerative grazing practices.",
    location: "Montana",
    image: "/placeholder.svg?height=200&width=400",
    rating: 4.6,
    tags: ["Livestock", "Grass-fed", "Regenerative"],
    investmentMin: 100000,
    investmentMax: 300000,
    investors: 8,
    featured: false,
  },
  {
    id: 3,
    name: "Sunrise Orchards",
    description:
      "Apple and pear orchard with 30 years of experience. Looking for investment to transition to organic certification and expand variety selection.",
    location: "Washington State",
    image: "/placeholder.svg?height=200&width=400",
    rating: 4.7,
    tags: ["Fruit", "Transitional", "Crops"],
    investmentMin: 75000,
    investmentMax: 200000,
    investors: 15,
    featured: true,
  },
  {
    id: 4,
    name: "Blue Moon Aquaponics",
    description:
      "Innovative aquaponics farm combining fish farming with vegetable production. Seeking investment to scale operations and improve technology.",
    location: "Wisconsin",
    image: "/placeholder.svg?height=200&width=400",
    rating: 4.5,
    tags: ["Aquaponics", "Innovation", "Sustainable"],
    investmentMin: 80000,
    investmentMax: 250000,
    investors: 7,
    featured: false,
  },
  {
    id: 5,
    name: "Sunshine Hemp Cooperative",
    description:
      "Farmer-owned cooperative growing industrial hemp for CBD, fiber, and grain. Looking for investment to expand processing capabilities.",
    location: "Kentucky",
    image: "/placeholder.svg?height=200&width=400",
    rating: 4.4,
    tags: ["Hemp", "Cooperative", "Crops"],
    investmentMin: 60000,
    investmentMax: 180000,
    investors: 22,
    featured: false,
  },
  {
    id: 6,
    name: "Windy Hill Vineyard",
    description:
      "Boutique vineyard producing award-winning wines with sustainable practices. Seeking investment for tasting room expansion and new varietals.",
    location: "Napa Valley, CA",
    image: "/placeholder.svg?height=200&width=400",
    rating: 4.9,
    tags: ["Vineyard", "Sustainable", "Crops"],
    investmentMin: 150000,
    investmentMax: 400000,
    investors: 9,
    featured: true,
  },
];

const investors = [
  {
    id: 1,
    name: "EcoGrowth Capital",
    type: "Venture Capital",
    description:
      "Focused on sustainable agriculture and food systems with investments ranging from $100K to $2M.",
    avatar: "/placeholder.svg?height=40&width=40",
    interests: ["Organic", "Technology", "Sustainability"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    type: "Angel Investor",
    description:
      "Former tech executive passionate about supporting small-scale regenerative farming operations.",
    avatar: "/placeholder.svg?height=40&width=40",
    interests: ["Regenerative", "Small Farms", "Local Food"],
  },
  {
    id: 3,
    name: "AgriInnovate Fund",
    type: "Investment Fund",
    description:
      "Specializing in agricultural innovation and technology with a focus on climate resilience.",
    avatar: "/placeholder.svg?height=40&width=40",
    interests: ["AgTech", "Climate", "Innovation"],
  },
  {
    id: 4,
    name: "Green Future Partners",
    type: "Impact Investors",
    description:
      "Collective of impact investors supporting environmentally and socially responsible agriculture.",
    avatar: "/placeholder.svg?height=40&width=40",
    interests: ["Impact", "Community", "Sustainable"],
  },
];

const marketplaceCategories = [
  "Seeds & Plants",
  "Equipment",
  "Livestock",
  "Organic Inputs",
  "Consulting",
  "Farm Products",
];
