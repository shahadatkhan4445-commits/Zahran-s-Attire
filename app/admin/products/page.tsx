import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { fallbackProducts } from "@/lib/fallbackData";
import ProductListTable from "@/components/admin/ProductListTable";

export default async function AdminProductsPage() {
  let products: any[] = [];
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    products = productsSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn("Firebase connection failed", error);
  }

  if (products.length === 0) {
    products = fallbackProducts;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your store's inventory and products.</p>
        </div>
        <Link href="/admin/products/new" className={cn(buttonVariants({ variant: "default" }), "gap-2")}>
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <ProductListTable initialProducts={products} />
        </CardContent>
      </Card>
    </div>
  );
}
