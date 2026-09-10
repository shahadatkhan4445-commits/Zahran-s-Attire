"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, User, MapPin, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <Button 
            variant={activeTab === "orders" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveTab("orders")}
          >
            <Package className="mr-2 h-4 w-4" />
            Orders
          </Button>
          <Button 
            variant={activeTab === "profile" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile Details
          </Button>
          <Button 
            variant={activeTab === "addresses" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveTab("addresses")}
          >
            <MapPin className="mr-2 h-4 w-4" />
            Addresses
          </Button>
          <div className="pt-4 mt-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1">
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Order History</h2>
              {/* Dummy Order */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base">Order #ZA-10293</CardTitle>
                    <p className="text-sm text-muted-foreground">Placed on Oct 24, 2026</p>
                  </div>
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                    Processing
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-semibold">Total: ৳ 1,650</p>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">John Doe</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium">john@example.com</p>
                    </div>
                  </div>
                  <Button className="mt-4">Edit Profile</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Saved Addresses</h2>
                <Button>Add New Address</Button>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <p className="font-semibold">Home Address</p>
                  <p className="text-sm text-muted-foreground mt-1">123 Fashion Street, Block C</p>
                  <p className="text-sm text-muted-foreground">Dhaka 1212, Bangladesh</p>
                  <p className="text-sm text-muted-foreground mt-2">Phone: +880 1711 000000</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
