import Link from "next/link";
import { Search, User, Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartIcon from "./CartIcon";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4 lg:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/category/men" className="text-lg font-semibold">Men</Link>
                <Link href="/category/women" className="text-lg font-semibold">Women</Link>
                <Link href="/category/accessories" className="text-lg font-semibold">Accessories</Link>
                <Link href="/sale" className="text-lg font-semibold text-red-600">Sale</Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="font-bold text-xl tracking-tight">
            ZAHRANS ATTIRE
          </Link>
        </div>

        {/* Desktop Logo */}
        <div className="hidden lg:flex items-center">
          <Link href="/" className="font-bold text-2xl tracking-tight">
            ZAHRANS ATTIRE
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/category/men" className="text-sm font-medium transition-colors hover:text-primary">Men</Link>
          <Link href="/category/women" className="text-sm font-medium transition-colors hover:text-primary">Women</Link>
          <Link href="/category/accessories" className="text-sm font-medium transition-colors hover:text-primary">Accessories</Link>
          <Link href="/sale" className="text-sm font-medium text-red-600 transition-colors hover:text-red-500">Sale</Link>
        </nav>

        {/* Icons & Search */}
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden md:flex relative w-48 lg:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full bg-muted shadow-none appearance-none pl-8 rounded-full"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          <Link href="/account" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>

          <CartIcon />
        </div>
      </div>
    </header>
  );
}
