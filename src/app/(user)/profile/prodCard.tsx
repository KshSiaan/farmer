"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Calendar, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/itemTypes";

interface ProductCardProps {
  product: ProductType;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  // Format the harvest date to be more readable
  const harvestDate = new Date(product.harvest_date);
  const harvestDateFormatted = formatDistanceToNow(harvestDate, {
    addSuffix: true,
  });

  return (
    <Link href={`/market/product/${product.id}`} className="block">
      <Card
        className="overflow-hidden transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative h-[220px] w-full">
          <Image
            src={product.image || "/placeholder.svg?height=220&width=400"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500"
            style={{
              transform: isHovering ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div
            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button variant="secondary" className="gap-2">
              <Eye className="h-4 w-4" />
              View Product
            </Button>
          </div>
          <Badge className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white/80">
            ${Number.parseFloat(product.price).toFixed(2)}
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">
              {product.name}
            </h3>
            <Badge variant="outline" className="ml-2 shrink-0">
              {product.category.name}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Harvested {harvestDateFormatted}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            <span>By {product.farmer.name}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
