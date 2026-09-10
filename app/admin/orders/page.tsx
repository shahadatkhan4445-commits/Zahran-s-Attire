import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Truck } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default async function AdminOrdersPage() {
  let orders: any[] = [];
  try {
    const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const ordersSnapshot = await getDocs(ordersQuery);
    orders = ordersSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn("Firebase connection failed", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Monitor and fulfill customer orders.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b">
              <tr>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order: any) => (
                <tr key={order._id.toString()} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 font-medium uppercase">#{order._id.toString().slice(-6)}</td>
                  <td className="p-4">
                    <div>{order.guestName}</div>
                    <div className="text-xs text-muted-foreground">{order.guestEmail}</div>
                  </td>
                  <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 font-semibold">৳ {order.totalAmount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {order.paymentMethod} ({order.paymentStatus})
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <Button variant="outline" size="icon" title="View Order">
                      <Eye className="h-4 w-4 text-zinc-600" />
                    </Button>
                    <Button variant="outline" size="icon" title="Mark Shipped">
                      <Truck className="h-4 w-4 text-blue-600" />
                    </Button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No orders yet.
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
