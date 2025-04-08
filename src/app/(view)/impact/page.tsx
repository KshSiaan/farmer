import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ImpactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Introduction Section */}
      <section className="w-full !py-12 md:!py-24 lg:!py-32 bg-zinc-50">
        <div className="container !px-4 md:!px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-green-600/20 bg-green-50 !px-3 !py-1 text-sm text-green-700">
                <Leaf className="!mr-1 h-3.5 w-3.5" />
                <span>Our Impact</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl !mb-4">
                Growing a Sustainable Future Together
              </h1>
              <p className="text-zinc-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed !mt-4 !mb-6">
                Our platform has connected over 5,000 farmers with investors,
                facilitating sustainable agricultural practices and improving
                livelihoods across rural communities.
              </p>
              <div className="grid grid-cols-2 gap-4 !mt-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-green-600">
                    $12M+
                  </span>
                  <span className="text-zinc-600">Invested in Farms</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-green-600">
                    5,000+
                  </span>
                  <span className="text-zinc-600">Farmers Supported</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-green-600">
                    120+
                  </span>
                  <span className="text-zinc-600">Communities Reached</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-green-600">30%</span>
                  <span className="text-zinc-600">Yield Improvement</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl !mt-8 lg:!mt-0">
              <Image
                src="/bg.webp"
                alt="Farmers working in a sustainable farm"
                className="object-cover"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="w-full !py-12 md:!py-24 lg:!py-32 bg-white">
        <div className="container !px-4 md:!px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center !mb-12">
            <div className="inline-flex items-center rounded-full border border-green-600/20 bg-green-50 !px-3 !py-1 text-sm text-green-700">
              <TrendingUp className="!mr-1 h-3.5 w-3.5" />
              <span>Impact Reports</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl !mb-4">
              Measuring Our Progress
            </h2>
            <p className="max-w-[700px] text-zinc-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed !mt-4">
              Transparency is at the core of our mission. Explore our detailed
              reports on how our platform is making a difference.
            </p>
          </div>
          <div className="!mx-auto max-w-3xl !mt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="item-1"
                className="border-b border-zinc-200 !py-4"
              >
                <AccordionTrigger className="text-left text-lg font-medium !py-2">
                  Environmental Impact Assessment 2023
                </AccordionTrigger>
                <AccordionContent className="!pt-4 !pb-2">
                  <div className="space-y-4 text-zinc-600">
                    <p>
                      Our platform has helped reduce carbon emissions by 15%
                      through sustainable farming practices. Farmers on our
                      platform have implemented water conservation techniques
                      that saved over 500 million gallons of water in 2023.
                    </p>
                    <ul className="list-disc list-inside space-y-2 !pl-4">
                      <li>15% reduction in carbon emissions</li>
                      <li>500M gallons of water saved</li>
                      <li>30% decrease in chemical fertilizer use</li>
                      <li>2,000 acres of land restored</li>
                    </ul>
                    <Button variant="outline" className="!mt-4">
                      Download Full Report
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className="border-b border-zinc-200 !py-4"
              >
                <AccordionTrigger className="text-left text-lg font-medium !py-2">
                  Economic Growth Report 2023
                </AccordionTrigger>
                <AccordionContent className="!pt-4 !pb-2">
                  <div className="space-y-4 text-zinc-600">
                    <p>
                      Farmers on our platform have seen an average income
                      increase of 40% since joining. Our marketplace has
                      facilitated over $12 million in transactions, with 85% of
                      profits going directly to farmers.
                    </p>
                    <ul className="list-disc list-inside space-y-2 !pl-4">
                      <li>40% average income increase for farmers</li>
                      <li>$12M+ in marketplace transactions</li>
                      <li>85% of profits directly to farmers</li>
                      <li>3,500 new jobs created in rural communities</li>
                    </ul>
                    <Button variant="outline" className="!mt-4">
                      Download Full Report
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className="border-b border-zinc-200 !py-4"
              >
                <AccordionTrigger className="text-left text-lg font-medium !py-2">
                  Social Impact Report 2023
                </AccordionTrigger>
                <AccordionContent className="!pt-4 !pb-2">
                  <div className="space-y-4 text-zinc-600">
                    <p>
                      Our platform has empowered 2,000 women farmers through
                      specialized training programs. We&apos;ve also established
                      50 community learning centers to provide agricultural
                      education and technology access.
                    </p>
                    <ul className="list-disc list-inside space-y-2 !pl-4">
                      <li>2,000 women farmers empowered</li>
                      <li>50 community learning centers established</li>
                      <li>10,000 farmers received technical training</li>
                      <li>
                        25 rural schools supported with educational resources
                      </li>
                    </ul>
                    <Button variant="outline" className="!mt-4">
                      Download Full Report
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="w-full !py-12 md:!py-24 lg:!py-32 bg-zinc-50">
        <div className="container !px-4 md:!px-6 !mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center !mb-12">
            <div className="inline-flex items-center rounded-full border border-green-600/20 bg-green-50 !px-3 !py-1 text-sm text-green-700">
              <Users className="!mr-1 h-3.5 w-3.5" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl !mb-4">
              From Our Community
            </h2>
            <p className="max-w-[700px] text-zinc-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed !mt-4">
              Discover how our platform is transforming lives and communities
              through sustainable agriculture.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 !mt-8">
            <Card className="overflow-hidden">
              <div className="relative h-[200px] w-full">
                <Image
                  src="/images (2).jpg"
                  alt="Farmer in field"
                  className="object-cover"
                  fill
                />
              </div>
              <CardHeader className="!pt-6 !pb-4">
                <CardTitle className="!mb-2">
                  Maria&apos;s Journey to Financial Independence
                </CardTitle>
                <CardDescription className="text-zinc-500">
                  How a small-scale farmer transformed her business through our
                  platform
                </CardDescription>
              </CardHeader>
              <CardContent className="!py-2">
                <p className="text-zinc-600">
                  After joining our platform, Maria was able to secure funding
                  for irrigation systems that increased her crop yield by 45%,
                  transforming her small farm into a thriving business.
                </p>
              </CardContent>
              <CardFooter className="!pt-4 !pb-6">
                <Button variant="outline" className="w-full">
                  Read Maria&apos;s Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden">
              <div className="relative h-[200px] w-full">
                <Image
                  src="/images (5).jpg"
                  alt="Community farm project"
                  className="object-cover"
                  fill
                />
              </div>
              <CardHeader className="!pt-6 !pb-4">
                <CardTitle className="!mb-2">
                  Revitalizing Rural Communities
                </CardTitle>
                <CardDescription className="text-zinc-500">
                  How investment in sustainable farming is bringing life back to
                  villages
                </CardDescription>
              </CardHeader>
              <CardContent className="!py-2">
                <p className="text-zinc-600">
                  The Greenfield Village project connected 50 farmers with
                  investors, creating 200 jobs and establishing a thriving
                  marketplace that has become the economic center of the region.
                </p>
              </CardContent>
              <CardFooter className="!pt-4 !pb-6">
                <Button variant="outline" className="w-full">
                  Explore Community Impact
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="relative h-[200px] w-full">
                <Image
                  src="/images (3).jpg"
                  alt="Investor meeting farmers"
                  className="object-cover"
                  fill
                />
              </div>
              <CardHeader className="!pt-6 !pb-4">
                <CardTitle className="!mb-2">
                  From Investor to Advocate
                </CardTitle>
                <CardDescription className="text-zinc-500">
                  How meaningful investment is creating lasting partnerships
                </CardDescription>
              </CardHeader>
              <CardContent className="!py-2">
                <p className="text-zinc-600">
                  When Michael invested in three farms through our platform, he
                  didn&apos;t expect to become deeply involved in sustainable
                  agriculture advocacy, now leading our investor education
                  program.
                </p>
              </CardContent>
              <CardFooter className="!pt-4 !pb-6">
                <Button variant="outline" className="w-full">
                  Read Michael&apos;s Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full !py-12 md:!py-24 lg:!py-32 bg-green-50">
        <div className="container !px-4 md:!px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl !mb-4">
                Join Us in Growing a Sustainable Future
              </h2>
              <p className="text-zinc-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed !mt-4 !mb-6">
                Whether you&apos;re a farmer looking for investment or an
                investor seeking meaningful opportunities, our platform connects
                you to a community dedicated to sustainable agriculture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 !mt-8">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white !py-6"
                  asChild
                >
                  <Link href="/register">Join as a Farmer</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-100 !py-6"
                  asChild
                >
                  <Link href="farms-investors">
                    Explore Investment Opportunities
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl !mt-8 lg:!mt-0">
              <Image
                src="/bg.webp"
                alt="Farmers and investors working together"
                className="object-cover"
                fill
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
