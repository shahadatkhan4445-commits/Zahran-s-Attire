import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Body should contain: items, shippingAddress, contactEmail, contactName, paymentMethod
    const { items, shippingAddress, email, firstName, lastName, paymentMethod } = body;
    
    const totalAmount = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0) + 60; // 60 is shipping cost

    const orderData = {
      guestEmail: email,
      guestName: `${firstName} ${lastName}`,
      items: items.map((item: any) => ({
        product: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size
      })),
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      orderStatus: "Processing",
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, "orders"), orderData);
    
    return NextResponse.json({ success: true, orderId: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Failed to process checkout" }, { status: 500 });
  }
}
