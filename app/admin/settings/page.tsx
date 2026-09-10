"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Store, CreditCard, Truck, Bell, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [storeName, setStoreName] = useState("Zahran's Attire");
  const [supportEmail, setSupportEmail] = useState("support@zahransattire.com");
  const [supportPhone, setSupportPhone] = useState("+880 1800-000000");
  const [insideDhakaFee, setInsideDhakaFee] = useState("60");
  const [outsideDhakaFee, setOutsideDhakaFee] = useState("120");
  const [freeShippingMin, setFreeShippingMin] = useState("3000");

  const [codEnabled, setCodEnabled] = useState(true);
  const [bkashEnabled, setBkashEnabled] = useState(true);
  const [nagadEnabled, setNagadEnabled] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Store Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your online store profile, shipping rates, and payment methods.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg text-sm font-medium animate-in fade-in">
            <CheckCircle2 className="h-4 w-4" /> Settings saved successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Store Profile */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-zinc-700" />
              <CardTitle className="text-lg">General Store Information</CardTitle>
            </div>
            <CardDescription>Basic store identity displayed on headers, footers, and invoices.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Brand Name</Label>
              <Input 
                id="storeName" 
                value={storeName} 
                onChange={(e) => setStoreName(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input 
                id="supportEmail" 
                type="email"
                value={supportEmail} 
                onChange={(e) => setSupportEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportPhone">Customer Helpline Phone</Label>
              <Input 
                id="supportPhone" 
                value={supportPhone} 
                onChange={(e) => setSupportPhone(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Store Currency</Label>
              <Input id="currency" value="BDT (৳) - Bangladeshi Taka" disabled className="bg-zinc-100" />
            </div>
          </CardContent>
        </Card>

        {/* Shipping & Delivery Charges */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-zinc-700" />
              <CardTitle className="text-lg">Shipping & Delivery Rates</CardTitle>
            </div>
            <CardDescription>Set delivery charges applied at checkout for customers.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insideDhaka">Inside Dhaka (৳)</Label>
              <Input 
                id="insideDhaka" 
                type="number"
                value={insideDhakaFee} 
                onChange={(e) => setInsideDhakaFee(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="outsideDhaka">Outside Dhaka (৳)</Label>
              <Input 
                id="outsideDhaka" 
                type="number"
                value={outsideDhakaFee} 
                onChange={(e) => setOutsideDhakaFee(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="freeShipping">Free Shipping on Orders Over (৳)</Label>
              <Input 
                id="freeShipping" 
                type="number"
                value={freeShippingMin} 
                onChange={(e) => setFreeShippingMin(e.target.value)} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-zinc-700" />
              <CardTitle className="text-lg">Payment Methods</CardTitle>
            </div>
            <CardDescription>Enable or disable checkout payment options for your buyers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-zinc-50 transition">
              <div>
                <div className="font-semibold text-zinc-900">Cash on Delivery (COD)</div>
                <div className="text-xs text-muted-foreground">Allow customers to pay cash upon receiving products</div>
              </div>
              <input 
                type="checkbox" 
                checked={codEnabled} 
                onChange={(e) => setCodEnabled(e.target.checked)} 
                className="h-5 w-5 accent-zinc-900 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-zinc-50 transition">
              <div>
                <div className="font-semibold text-zinc-900">bKash Payment Gateway</div>
                <div className="text-xs text-muted-foreground">Receive instant mobile payments via bKash</div>
              </div>
              <input 
                type="checkbox" 
                checked={bkashEnabled} 
                onChange={(e) => setBkashEnabled(e.target.checked)} 
                className="h-5 w-5 accent-pink-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-zinc-50 transition">
              <div>
                <div className="font-semibold text-zinc-900">Nagad Payment Gateway</div>
                <div className="text-xs text-muted-foreground">Receive mobile payments via Nagad wallet</div>
              </div>
              <input 
                type="checkbox" 
                checked={nagadEnabled} 
                onChange={(e) => setNagadEnabled(e.target.checked)} 
                className="h-5 w-5 accent-orange-600 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-zinc-700" />
              <CardTitle className="text-lg">Store Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-zinc-50 transition">
              <div>
                <div className="font-semibold text-zinc-900">SMS & Email Notifications</div>
                <div className="text-xs text-muted-foreground">Send order confirmation SMS and email to buyers</div>
              </div>
              <input 
                type="checkbox" 
                checked={smsAlerts} 
                onChange={(e) => setSmsAlerts(e.target.checked)} 
                className="h-5 w-5 accent-zinc-900 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-2">
          <Button type="submit" size="lg" className="gap-2">
            <Save className="h-4 w-4" /> Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
