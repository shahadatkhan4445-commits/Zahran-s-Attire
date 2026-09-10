import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { fallbackProducts } from "@/lib/fallbackData";

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
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b">
              <tr>
                <th className="p-4 font-medium">Picture</th>
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock (Variants)</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product: any) => {
                const totalStock = product.variants?.reduce((acc: number, v: any) => acc + (v.stock || 0), 0) || 0;
                
                return (
                  <tr key={product._id.toString()} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-14 bg-zinc-100 rounded-lg overflow-hidden border">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover object-center" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">No img</div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium">
                      <Link href={`/product/${product.slug}`} className="hover:underline text-zinc-900 font-semibold block">
                        {product.name}
                      </Link>
                      <span className="text-xs text-muted-foreground">{product.slug}</span>
                    </td>
                    <td className="p-4">{product.categoryName || "Uncategorized"}</td>
                    <td className="p-4 font-bold text-zinc-900">৳ {product.price}</td>
                    <td className="p-4">
                      {totalStock > 0 ? (
                        <span className="text-green-600 font-medium">{totalStock} in stock</span>
                      ) : (
                        <span className="text-red-600 font-medium">Out of stock</span>
                      )}
                    </td>
                    <td className="p-4 flex justify-end gap-2 pt-6">
                      <Link href={`/product/${product.slug}`} className="p-2 border rounded-md hover:bg-zinc-100 text-zinc-700">
                        View
                      </Link>
                      <Link href="/admin/products/new" className="p-2 border rounded-md hover:bg-zinc-100 text-blue-600 flex items-center gap-1 text-xs">
                        <Edit className="h-3.5 w-3.5" /> Edit/Add
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No products found. Click "Add Product" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
