"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: product.size,
      color: product.color
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button size="lg" className="w-full" onClick={handleAddToCart} variant={added ? "secondary" : "default"}>
      {added ? "Added to Cart" : "Add to Cart"}
    </Button>
  );
}
