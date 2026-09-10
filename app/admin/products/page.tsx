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
                    <td className="p-4 font-medium">
                      <Link href={`/product/${product.slug}`} className="hover:underline text-blue-600">
                        {product.name}
                      </Link>
                    </td>
                    <td className="p-4">{product.categoryName || "Uncategorized"}</td>
                    <td className="p-4">৳ {product.price}</td>
                    <td className="p-4">
                      {totalStock > 0 ? (
                        <span className="text-green-600 font-medium">{totalStock} in stock</span>
                      ) : (
                        <span className="text-red-600 font-medium">Out of stock</span>
                      )}
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <Button variant="outline" size="icon" title="Edit">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="outline" size="icon" title="Delete">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
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
