"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ProductType } from "@/types/itemTypes";
import { ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
  product: ProductType;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const navig = useRouter();
  const handleAddToCart = () => {
    console.log(product, " and ", quantity);

    try {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          product_id: product.id,
          quantity: quantity,
          price: parseInt(product.price) * quantity,
        })
      );

      navig.push(`/market/product/${product.id}/purchase`);
    } catch (error) {
      console.error(error);
    }

    //     // Implement your add to cart logic here
    //     toast({
    //       title: "Added to cart",
    //       description: `${quantity} × ${product.name} added to your cart`,
    //     });
    //   };

    //   const handleAddToWishlist = () => {
    //     // Implement your wishlist logic here
    //     toast({
    //       title: "Added to wishlist",
    //       description: `${product.name} added to your wishlist`,
    //     });
  };

  return (
    <div className="!space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <span className="w-12 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1" onClick={handleAddToCart}>
          <ShoppingCart className="!mr-2 h-4 w-4" />
          Buy now
        </Button>
        <Button variant="outline" size="icon" onClick={() => {}}>
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
