"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductListTable({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("zahran_custom_products");
      if (saved) {
        const localProds = JSON.parse(saved);
        if (Array.isArray(localProds) && localProds.length > 0) {
          // Merge local products at the top, avoiding duplicate IDs
          const localIds = new Set(localProds.map(p => p._id));
          const filteredInitial = initialProducts.filter(p => !localIds.has(p._id));
          setProducts([...localProds, ...filteredInitial]);
        }
      }
    } catch (e) {
      console.warn("Could not load local products", e);
    }
  }, [initialProducts]);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        const saved = localStorage.getItem("zahran_custom_products");
        if (saved) {
          const localProds = JSON.parse(saved).filter((p: any) => p._id !== id);
          localStorage.setItem("zahran_custom_products", JSON.stringify(localProds));
        }
      } catch (e) {}
      setProducts(prev => prev.filter(p => p._id !== id));
    }
  };

  return (
    <table className="w-full text-sm text-left">
      <thead className="bg-zinc-50 border-b">
        <tr>
          <th className="p-4 font-medium">Picture</th>
          <th className="p-4 font-medium">Product Name</th>
          <th className="p-4 font-medium">Category</th>
          <th className="p-4 font-medium">Price</th>
          <th className="p-4 font-medium">Stock</th>
          <th className="p-4 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {products.map((product: any) => {
          const totalStock = product.variants?.reduce((acc: number, v: any) => acc + (parseInt(v.stock) || 0), 0) || product.stock || 20;
          const isCustom = product._id?.toString().startsWith("local_");

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
                <div className="flex items-center gap-2">
                  <span className="text-zinc-900 font-semibold">{product.name}</span>
                  {isCustom && (
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{product.slug}</span>
              </td>
              <td className="p-4">
                <span className="inline-block bg-zinc-100 text-zinc-800 text-xs px-2.5 py-1 rounded-full font-medium">
                  {product.categoryName || "Attire"}
                </span>
              </td>
              <td className="p-4 font-bold text-zinc-900">৳ {product.price}</td>
              <td className="p-4">
                {totalStock > 0 ? (
                  <span className="text-green-600 font-medium">{totalStock} in stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of stock</span>
                )}
              </td>
              <td className="p-4 flex justify-end gap-2 pt-6">
                <Link href="/admin/products/new" className="p-2 border rounded-md hover:bg-zinc-100 text-blue-600 flex items-center gap-1 text-xs">
                  <Edit className="h-3.5 w-3.5" /> Edit
                </Link>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(product._id, product.name)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </td>
            </tr>
          );
        })}
        {products.length === 0 && (
          <tr>
            <td colSpan={6} className="p-8 text-center text-muted-foreground">
              No products found. Click "Add Product" to create one.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
