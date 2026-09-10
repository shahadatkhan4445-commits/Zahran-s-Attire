import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, ShoppingBag, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCustomersPage() {
  const sampleCustomers = [
    {
      id: "CUST-101",
      name: "Tanvir Ahmed",
      email: "tanvir.ahmed@gmail.com",
      phone: "+880 1711-234567",
      city: "Dhaka, Dhanmondi",
      totalOrders: 4,
      totalSpent: 12800,
      lastOrder: "2026-09-08",
      status: "VIP"
    },
    {
      id: "CUST-102",
      name: "Nusrat Jahan",
      email: "nusrat.jahan@yahoo.com",
      phone: "+880 1812-987654",
      city: "Chittagong, GEC",
      totalOrders: 2,
      totalSpent: 7400,
      lastOrder: "2026-09-05",
      status: "Active"
    },
    {
      id: "CUST-103",
      name: "Shahadat Hossain",
      email: "shahadat.khan@gmail.com",
      phone: "+880 1913-456789",
      city: "Dhaka, Uttara",
      totalOrders: 5,
      totalSpent: 18500,
      lastOrder: "2026-09-09",
      status: "VIP"
    },
    {
      id: "CUST-104",
      name: "Farhana Islam",
      email: "farhana.i@outlook.com",
      phone: "+880 1614-112233",
      city: "Sylhet, Zindabazar",
      totalOrders: 1,
      totalSpent: 2950,
      lastOrder: "2026-09-02",
      status: "New"
    },
    {
      id: "CUST-105",
      name: "Mahmudur Rahman",
      email: "mahmud.r@gmail.com",
      phone: "+880 1515-778899",
      city: "Dhaka, Mirpur",
      totalOrders: 3,
      totalSpent: 8900,
      lastOrder: "2026-08-28",
      status: "Active"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Customers</h1>
        <p className="text-muted-foreground mt-1">Manage and view your registered store customers and buyers.</p>
      </div>

      {/* Customer Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">128</div>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Buyers</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">94</div>
            <p className="text-xs text-muted-foreground mt-1">Placed order in last 30 days</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">VIP Shoppers</CardTitle>
            <ShoppingBag className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">24</div>
            <p className="text-xs text-purple-600 mt-1">Orders over ৳ 10,000</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Spend / Customer</CardTitle>
            <span className="text-base font-bold text-amber-600">৳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">৳ 5,420</div>
            <p className="text-xs text-green-600 mt-1">+8.4% growth</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Table */}
      <Card className="shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-50/50">
          <div className="font-semibold text-zinc-900 text-base">Customer Directory</div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input 
              type="text" 
              placeholder="Search by name, email or phone..." 
              className="px-3 py-1.5 text-sm border rounded-md w-full sm:w-72 bg-white outline-none focus:ring-1 focus:ring-black"
            />
            <Button variant="outline" size="sm">Filter</Button>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 text-zinc-600 border-b">
                <tr>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Contact Details</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Total Orders</th>
                  <th className="p-4 font-medium">Total Spent</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-zinc-700">
                {sampleCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="p-4 font-medium text-zinc-900">
                      <div className="font-semibold">{cust.name}</div>
                      <div className="text-xs text-muted-foreground">{cust.id}</div>
                    </td>
                    <td className="p-4 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-zinc-700">
                        <Mail className="h-3 w-3 text-muted-foreground" /> {cust.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Phone className="h-3 w-3 text-muted-foreground" /> {cust.phone}
                      </div>
                    </td>
                    <td className="p-4 text-xs">
                      <div className="flex items-center gap-1 text-zinc-700">
                        <MapPin className="h-3 w-3 text-muted-foreground" /> {cust.city}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-zinc-900">{cust.totalOrders} orders</td>
                    <td className="p-4 font-bold text-zinc-900">৳ {cust.totalSpent.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        cust.status === "VIP" 
                          ? "bg-purple-100 text-purple-700 border border-purple-200" 
                          : cust.status === "Active"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-blue-100 text-blue-700 border border-blue-200"
                      }`}>
                        {cust.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        View Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
