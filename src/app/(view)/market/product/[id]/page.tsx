import { getFetcher } from "@/lib/simplifier";
import type { ProductType } from "@/types/itemTypes";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CalendarIcon, MapPin, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProductImageGallery from "./product-image-gallary";
import ProductActions from "./product-actions";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const token = (await cookies()).get("token")?.value;
  const productId = params.id;

  // Fetch product data
  const response = await getFetcher({
    link: `/details-product/${productId}`,
    token,
  });

  // Handle product not found
  if (!response.status) {
    notFound();
  }

  const product: ProductType = response.data;

  return (
    <main className="container 1mx-auto !py-8 !px-4 md:!px-6">
      <div className="!mb-6">
        <Link
          href="/market/products"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          ← Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <Suspense
          fallback={
            <div className="h-[400px] w-full bg-muted animate-pulse rounded-lg" />
          }
        >
          <ProductImageGallery mainImage={product.image} />
        </Suspense>

        {/* Product Details Section */}
        <div className="!space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category.name}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <div className="!mt-4 flex items-baseline">
              <span className="text-3xl font-bold text-primary">
                {product.price}
              </span>
            </div>
          </div>

          <div className="!space-y-4">
            <div className="prose max-w-none">
              <h3 className="text-lg font-medium">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Card>
              <CardContent className="1p-4 !space-y-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Harvested on:{" "}
                    {new Date(product.harvest_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Farmer: {product.farmer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Category: {product.category.name}
                  </span>
                </div>
              </CardContent>
            </Card>

            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
