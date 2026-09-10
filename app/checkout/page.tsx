"use client";

import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const orderData = {
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      shippingAddress: {
        street: formData.get("address"),
        city: formData.get("city"),
        zipCode: formData.get("postalCode"),
        phone: formData.get("phone")
      },
      paymentMethod: formData.get("payment"),
      items
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        setOrderPlaced(true);
        clearCart();
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-4xl font-bold text-green-600">Order Placed Successfully!</h1>
        <p className="text-xl text-muted-foreground">Thank you for shopping with Zahrans Attire. We will process your order soon.</p>
        <Button asChild size="lg"><Link href="/">Return to Home</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Checkout Form */}
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Contact */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Contact Information</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
                <div className="col-span-2 grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="postalCode">Postal code</Label>
                  <Input id="postalCode" name="postalCode" required />
                </div>
                <div className="col-span-2 grid gap-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Payment Method</h2>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 border p-4 rounded-md cursor-pointer hover:bg-zinc-50">
                  <input type="radio" name="payment" value="cod" defaultChecked />
                  <span>Cash on Delivery (COD)</span>
                </Label>
                <Label className="flex items-center gap-2 border p-4 rounded-md cursor-pointer hover:bg-zinc-50 opacity-50">
                  <input type="radio" name="payment" value="ssl" disabled />
                  <span>Online Payment (SSLCommerz) - Coming Soon</span>
                </Label>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 space-y-6">
          <div className="bg-zinc-50 p-6 rounded-lg space-y-4 sticky top-24">
            <h3 className="text-lg font-bold">Order Summary</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex justify-between text-sm">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">{item.quantity}x</span>
                    <span className="truncate w-32">{item.name}</span>
                  </div>
                  <span>৳ {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳ {total}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>৳ 60</span>
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳ {total + 60}</span>
            </div>
            <Button type="submit" form="checkout-form" className="w-full" size="lg" disabled={items.length === 0}>
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
