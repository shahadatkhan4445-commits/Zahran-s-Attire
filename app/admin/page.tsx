import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Activity } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export default async function AdminDashboard() {
  let totalOrders = 0;
  let totalProducts = 0;
  let orders: any[] = [];
  let revenue = 0;

  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    totalProducts = productsSnapshot.size;

    const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(10));
    const ordersSnapshot = await getDocs(ordersQuery);
    totalOrders = ordersSnapshot.size;
    orders = ordersSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));

    const allOrdersSnapshot = await getDocs(collection(db, "orders"));
    revenue = allOrdersSnapshot.docs.reduce((acc, orderDoc) => acc + (orderDoc.data().totalAmount || 0), 0);
    totalOrders = allOrdersSnapshot.size; // Fix totalOrders to reflect all
  } catch (error) {
    console.warn("Firebase connection failed", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store's performance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳ {revenue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 border-b">
                <tr>
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order: any) => (
                  <tr key={order._id.toString()} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="p-4 font-medium">{order._id.toString().slice(-6).toUpperCase()}</td>
                    <td className="p-4">{order.guestName || "Guest"}</td>
                    <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">৳ {order.totalAmount}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
