import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import AddProductForm from "@/components/admin/AddProductForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NewProductPage() {
  let categories: any[] = [];
  try {
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    categories = categoriesSnapshot.docs.map(doc => ({
      _id: doc.id,
      name: doc.data().name
    }));
  } catch (error) {
    console.warn("Firebase connection failed", error);
  }

  const serializedCategories = categories;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground">Create a new product to show in your store.</p>
      </div>

      <AddProductForm categories={serializedCategories} />
    </div>
  );
}
