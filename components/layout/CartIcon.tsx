"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function CartIcon() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}>
      <ShoppingBag className="h-5 w-5" />
      {mounted && totalItems > 0 && (
        <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
          {totalItems}
        </span>
      )}
      <span className="sr-only">Cart</span>
    </Link>
  );
}
