"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function AddProductForm({ categories }: { categories: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    
    // Parse variants (Simple demo: just one variant for now)
    const variants = [
      {
        size: formData.get("size") || "One Size",
        color: formData.get("color") || "Standard",
        stock: parseInt((formData.get("stock") as string) || "0")
      }
    ];

    const categoryId = formData.get("category") as string;
    const selectedCategory = categories.find(c => c._id === categoryId);

    const productData = {
      name: formData.get("name"),
      slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, '-'),
      description: formData.get("description"),
      price: parseFloat(formData.get("price") as string),
      categoryId,
      categoryName: selectedCategory ? selectedCategory.name : "Uncategorized",
      variants,
      isFeatured: formData.get("isFeatured") === "on",
      isNewArrival: formData.get("isNewArrival") === "on",
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" required placeholder="e.g. Premium Cotton Shirt" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <textarea 
            id="description" 
            name="description" 
            required 
            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Describe the product..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Price (৳)</Label>
            <Input id="price" name="price" type="number" required min="0" placeholder="1500" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <select 
              id="category" 
              name="category" 
              required
              className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled selected>Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="border-t pt-4 mt-2">
          <h3 className="font-medium mb-4">Inventory (Default Variant)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="size">Size</Label>
              <Input id="size" name="size" placeholder="e.g. L" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <Input id="color" name="color" placeholder="e.g. Navy Blue" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" name="stock" type="number" min="0" required placeholder="50" />
            </div>
          </div>
        </div>

        <div className="border-t pt-4 mt-2 space-y-3">
          <Label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFeatured" className="w-4 h-4" />
            <span>Show on Homepage (Featured)</span>
          </Label>
          <Label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isNewArrival" className="w-4 h-4" defaultChecked />
            <span>Mark as New Arrival</span>
          </Label>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t pt-6">
        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
