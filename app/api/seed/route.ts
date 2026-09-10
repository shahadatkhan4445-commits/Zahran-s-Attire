import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, writeBatch, doc } from "firebase/firestore";

export async function GET() {
  try {
    const batch = writeBatch(db);

    // Categories
    const categoriesRef = collection(db, "categories");
    
    // We could clear existing ones, but for simplicity let's just add new ones or rely on the user having an empty DB
    const menCatRef = doc(categoriesRef);
    batch.set(menCatRef, { name: "Men", slug: "men" });
    
    const womenCatRef = doc(categoriesRef);
    batch.set(womenCatRef, { name: "Women", slug: "women" });
    
    const accCatRef = doc(categoriesRef);
    batch.set(accCatRef, { name: "Accessories", slug: "accessories" });

    // Products
    const productsRef = collection(db, "products");
    
    const sampleProducts = [
      {
        name: "Premium Oxford Shirt",
        slug: "premium-oxford-shirt",
        description: "A classic oxford shirt perfect for casual or formal wear.",
        price: 2500,
        categoryId: menCatRef.id,
        categoryName: "Men",
        variants: [
          { size: "M", color: "White", stock: 10 },
          { size: "L", color: "Blue", stock: 15 }
        ],
        isFeatured: true,
        isNewArrival: true,
        createdAt: new Date().toISOString()
      },
      {
        name: "Women's Elegant Dress",
        slug: "womens-elegant-dress",
        description: "Beautiful flowing dress for special occasions.",
        price: 4500,
        categoryId: womenCatRef.id,
        categoryName: "Women",
        variants: [
          { size: "S", color: "Red", stock: 5 },
          { size: "M", color: "Black", stock: 8 }
        ],
        isFeatured: true,
        createdAt: new Date().toISOString()
      },
      {
        name: "Classic Leather Belt",
        slug: "classic-leather-belt",
        description: "Genuine leather belt with a timeless design.",
        price: 1200,
        categoryId: accCatRef.id,
        categoryName: "Accessories",
        variants: [
          { size: "One Size", color: "Brown", stock: 20 },
          { size: "One Size", color: "Black", stock: 25 }
        ],
        isNewArrival: true,
        createdAt: new Date().toISOString()
      }
    ];

    for (const product of sampleProducts) {
      const prodRef = doc(productsRef);
      batch.set(prodRef, product);
    }

    await batch.commit();

    return NextResponse.json({ success: true, message: "Firebase database seeded successfully!" });
  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
