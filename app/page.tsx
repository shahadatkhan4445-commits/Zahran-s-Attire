import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

export default async function Home() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    const productsQuery = query(collection(db, "products"), where("isFeatured", "==", true), limit(8));
    const productsSnapshot = await getDocs(productsQuery);
    products = productsSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));

    const categoriesQuery = query(collection(db, "categories"));
    const categoriesSnapshot = await getDocs(categoriesQuery);
    categories = categoriesSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn("Firebase connection failed. Showing empty/fallback data.", error);
  }

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-zinc-950 flex items-center justify-center overflow-hidden">
        {/* Placeholder for Hero Image */}
        <div className="absolute inset-0 bg-zinc-900">
          <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        </div>
        <div className="relative z-10 text-center space-y-4 p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase">New Season Arrivals</h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-[600px] mx-auto">
            Discover the latest trends in fashion. Elevate your style with our premium collection of Zahrans Attire.
          </p>
          <Link href="/category/men" className={cn(buttonVariants({ size: "lg", variant: "default" }), "mt-4")}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center uppercase tracking-wider">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category: any) => (
            <Link key={category._id.toString()} href={`/category/${category.slug}`} className="group relative h-[400px] overflow-hidden rounded-lg bg-zinc-100">
              <div className="absolute inset-0 bg-zinc-200 transition-transform duration-500 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white tracking-wider uppercase">{category.name}</h3>
              </div>
            </Link>
          ))}
          {categories.length === 0 && (
            <div className="col-span-3 text-center py-12 text-muted-foreground">
              No categories found. Please run the seed API.
            </div>
          )}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold uppercase tracking-wider">Featured Products</h2>
          <Link href="/category/men" className="text-sm font-medium underline underline-offset-4">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((item: any) => (
            <Card key={item._id.toString()} className="border-none shadow-none group">
              <CardContent className="p-0">
                <Link href={`/product/${item.slug}`}>
                  <div className="relative aspect-[3/4] bg-zinc-100 rounded-lg overflow-hidden mb-3">
                    <div className="absolute inset-0 bg-zinc-200 transition-transform duration-500 group-hover:scale-105"></div>
                  </div>
                </Link>
                <div className="space-y-1">
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-medium text-sm md:text-base group-hover:underline truncate">{item.name}</h3>
                  </Link>
                  <p className="font-semibold text-zinc-900">৳ {item.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          {products.length === 0 && (
            <div className="col-span-4 text-center py-12 text-muted-foreground">
              No featured products found. Please add some products.
            </div>
          )}
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="container mx-auto px-4">
        <div className="w-full bg-zinc-900 text-white p-8 md:p-16 rounded-xl text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">End of Season Sale</h2>
          <p className="text-lg text-zinc-300">Up to 50% off on selected items.</p>
          <Link href="/sale" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
            Explore Offers
          </Link>
        </div>
      </section>

    </div>
  );
}
