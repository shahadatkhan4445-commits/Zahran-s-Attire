"use client";

import { useCartStore } from "@/store/cart";
import { Button, buttonVariants } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className={buttonVariants({ variant: "default" })}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 border-b pb-6">
              <div className="h-24 w-24 bg-zinc-100 rounded-md shrink-0"></div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="font-semibold">৳ {item.price * item.quantity}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Size: {item.size} | Color: {item.color}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border rounded-md">
                    <button className="px-3 py-1" onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1, item.color, item.size)}>-</button>
                    <span className="px-3 py-1 border-x">{item.quantity}</span>
                    <button className="px-3 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}>+</button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id, item.color, item.size)} className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-zinc-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-bold">Order Summary</h3>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>৳ {total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>৳ {total}</span>
            </div>
            <Link href="/checkout" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
