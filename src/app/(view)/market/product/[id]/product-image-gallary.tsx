"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  mainImage: string;
  additionalImages?: string[];
}

export default function ProductImageGallery({
  mainImage,
  additionalImages = [],
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const allImages = [mainImage, ...(additionalImages || [])];

  return (
    <div className="!space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt="Product image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto !pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative h-16 w-16 cursor-pointer overflow-hidden rounded-md bg-muted",
                selectedImage === image && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
