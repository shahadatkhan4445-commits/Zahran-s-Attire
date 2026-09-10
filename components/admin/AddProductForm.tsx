"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Upload, Image as ImageIcon, X } from "lucide-react";

export default function AddProductForm({ categories }: { categories: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const availableCategories = (categories && categories.length > 0) ? categories : [
    { _id: "men", name: "Men" },
    { _id: "women", name: "Women" },
    { _id: "accessories", name: "Accessories" },
    { _id: "panjabi", name: "Panjabi" },
    { _id: "kids", name: "Kids" }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    
    // Parse variants
    const variants = [
      {
        size: formData.get("size") || "One Size",
        color: formData.get("color") || "Standard",
        stock: parseInt((formData.get("stock") as string) || "0")
      }
    ];

    const categoryId = (formData.get("category") as string) || "men";
    const selectedCategory = availableCategories.find(c => c._id === categoryId);

    const productData = {
      name: formData.get("name"),
      slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, '-'),
      description: formData.get("description"),
      price: parseFloat(formData.get("price") as string),
      image: imageUrl || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
      categoryId,
      categoryName: selectedCategory ? selectedCategory.name : "Men",
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

        {/* Product Image Upload & URL */}
        <div className="border rounded-lg p-4 bg-zinc-50/50 space-y-3">
          <Label className="font-semibold text-zinc-900 flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-blue-600" />
            Product Picture (Image Upload or URL)
          </Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="space-y-3">
              <div>
                <Label htmlFor="imageFile" className="text-xs text-muted-foreground block mb-1">
                  Option 1: Upload from Computer / Mobile
                </Label>
                <div className="relative border-2 border-dashed border-zinc-300 hover:border-black rounded-lg p-4 text-center cursor-pointer transition bg-white">
                  <input 
                    type="file" 
                    id="imageFile" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="h-6 w-6 text-zinc-400 mx-auto mb-1" />
                  <p className="text-xs font-medium text-zinc-700">Click to browse or drop image here</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
                </div>
              </div>

              <div>
                <Label htmlFor="imageUrl" className="text-xs text-muted-foreground block mb-1">
                  Option 2: Or Paste Image Web URL
                </Label>
                <Input 
                  id="imageUrl" 
                  value={imageUrl} 
                  onChange={handleUrlChange} 
                  placeholder="https://images.unsplash.com/... or any link" 
                  className="bg-white"
                />
              </div>
            </div>

            {/* Live Preview */}
            <div className="border rounded-lg p-3 bg-white flex flex-col items-center justify-center min-h-[160px] text-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Picture Preview
              </span>
              {imagePreview ? (
                <div className="relative w-32 h-40 rounded-md overflow-hidden border shadow-sm group">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => { setImagePreview(null); setImageUrl(""); }} 
                    className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white p-1 rounded-full text-xs transition"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="text-zinc-400 text-xs py-6 flex flex-col items-center">
                  <ImageIcon className="h-8 w-8 mb-1 stroke-1" />
                  <span>No image selected yet</span>
                </div>
              )}
            </div>
          </div>
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
              defaultValue={availableCategories[0]?._id || "men"}
              className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {availableCategories.map((cat) => (
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
