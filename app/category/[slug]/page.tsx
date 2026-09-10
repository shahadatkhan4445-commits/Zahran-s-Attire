import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");

  let products: any[] = [];
  try {
    const categoriesQuery = query(collection(db, "categories"), where("slug", "==", slug));
    const catSnapshot = await getDocs(categoriesQuery);
    
    if (!catSnapshot.empty) {
      const categoryDoc = catSnapshot.docs[0];
      const productsQuery = query(collection(db, "products"), where("categoryId", "==", categoryDoc.id));
      const productsSnapshot = await getDocs(productsQuery);
      products = productsSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    }
  } catch (error) {
    console.warn("Firebase connection failed. Showing empty/fallback data.", error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{categoryName}</h1>
        <p className="text-muted-foreground mt-2">Explore our collection of {categoryName.toLowerCase()}.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Filters</h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" /> In Stock</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> On Sale</label>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {['S', 'M', 'L', 'XL'].map(size => (
                <div key={size} className="border px-3 py-1 text-sm rounded cursor-pointer hover:bg-zinc-100">{size}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-muted-foreground">{products.length} products</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <Card key={product._id.toString()} className="border-none shadow-none group">
                <CardContent className="p-0">
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative aspect-[3/4] bg-zinc-100 rounded-lg overflow-hidden mb-3">
                      <div className="absolute inset-0 bg-zinc-200 transition-transform duration-500 group-hover:scale-105"></div>
                    </div>
                  </Link>
                  <div className="space-y-1">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-medium hover:underline">{product.name}</h3>
                    </Link>
                    <p className="font-semibold">৳ {product.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
