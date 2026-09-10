import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/product/AddToCartButton";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fallbackProducts } from "@/lib/fallbackData";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let productDoc: any = null;
  try {
    const productsQuery = query(collection(db, "products"), where("slug", "==", slug));
    const snapshot = await getDocs(productsQuery);
    if (!snapshot.empty) {
      productDoc = { _id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
  } catch (error) {
    console.warn("Firebase connection failed. Showing empty/fallback data.", error);
  }

  // Fallback to static product
  if (!productDoc) {
    productDoc = fallbackProducts.find(p => p.slug === slug);
  }

  if (!productDoc) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="mt-4 text-muted-foreground">The requested product could not be located.</p>
      </div>
    );
  }

  const product = {
    id: productDoc._id,
    name: productDoc.name,
    price: productDoc.price,
    description: productDoc.description,
    image: productDoc.image,
    category: productDoc.categoryName || "Uncategorized",
    colors: Array.from(new Set((productDoc.variants || []).map((v: any) => v.color).filter(Boolean))) as string[],
    sizes: Array.from(new Set((productDoc.variants || []).map((v: any) => v.size).filter(Boolean))) as string[]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden relative shadow-md">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold">৳ {product.price}</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          {/* Selectors */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map(c => (
                  <Button key={c} variant="outline" size="sm">{c}</Button>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Size</h3>
                <span className="text-sm underline cursor-pointer">Size Guide</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(s => (
                  <Button key={s} variant="outline" size="sm" className="w-12">{s}</Button>
                ))}
              </div>
            </div>
          </div>

          <AddToCartButton product={{ ...product, size: product.sizes[0], color: product.colors[0] }} />

          {/* Details Accordion placeholder */}
          <div className="border-t pt-6 space-y-4 text-sm">
            <div className="flex justify-between font-medium cursor-pointer">
              <span>Product Details</span>
              <span>+</span>
            </div>
            <div className="flex justify-between font-medium cursor-pointer border-t pt-4">
              <span>Delivery & Returns</span>
              <span>+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
