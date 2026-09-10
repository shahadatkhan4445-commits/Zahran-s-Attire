import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { fallbackCategories, fallbackProducts } from "@/lib/fallbackData";

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
    console.warn("Firebase connection or permission error. Using fallback dataset.", error);
  }

  // Gracefully fallback if Firebase is empty or permissions are not yet configured
  if (categories.length === 0) {
    categories = fallbackCategories;
  }
  if (products.length === 0) {
    products = fallbackProducts;
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
            <Link 
              key={category._id.toString()} 
              href={`/category/${category.slug}`} 
              className="group relative h-[380px] overflow-hidden rounded-xl bg-zinc-900 shadow-md block"
            >
              {category.image && (
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-85"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="text-xs uppercase tracking-widest text-zinc-300 mb-1">Collection</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-wider uppercase drop-shadow-md">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Trending Now</span>
            <h2 className="text-2xl font-bold uppercase tracking-wider">Featured Products</h2>
          </div>
          <Link href="/category/men" className="text-sm font-medium underline underline-offset-4 hover:text-zinc-600">
            View All Products
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((item: any) => (
            <Card key={item._id.toString()} className="border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all rounded-xl overflow-hidden group">
              <CardContent className="p-0">
                <Link href={`/product/${item.slug}`}>
                  <div className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                    )}
                    {item.isNewArrival && (
                      <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider">
                        New
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-4 space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground block truncate">
                    {item.categoryName || "Attire"}
                  </span>
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-semibold text-sm md:text-base group-hover:text-primary line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 pt-1">
                    <p className="font-bold text-zinc-900 dark:text-zinc-50 text-base">৳ {item.price}</p>
                    {item.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through">৳ {item.originalPrice}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
