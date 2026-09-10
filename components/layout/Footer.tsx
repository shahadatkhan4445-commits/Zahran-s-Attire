import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand & Newsletter */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white tracking-tight">ZAHRANS ATTIRE</h3>
          <p className="text-sm text-zinc-400">
            Subscribe to our newsletter to get updates on our latest offers!
          </p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="bg-zinc-900 border-zinc-800 focus-visible:ring-zinc-700" />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Information</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/stores" className="hover:text-white transition-colors">Store Locator</Link></li>
            <li><Link href="/offers" className="hover:text-white transition-colors">Special Offers</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/delivery" className="hover:text-white transition-colors">Delivery Policy</Link></li>
            <li><Link href="/returns" className="hover:text-white transition-colors">Return & Exchange</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
          </ul>
        </div>

        {/* Socials & Contact */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Connect With Us</h4>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors"><FaFacebook className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-white transition-colors"><FaInstagram className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-white transition-colors"><FaYoutube className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-white transition-colors"><FaTwitter className="h-5 w-5" /></Link>
          </div>
          <div className="pt-4 text-sm text-zinc-400">
            <p>Email: support@zahransattire.com</p>
            <p>Phone: +880 1234 567890</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-800 text-sm text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Zahrans Attire. All rights reserved.</p>
        <div className="flex gap-4">
          {/* Payment Badges Placeholder */}
          <span className="bg-zinc-800 px-2 py-1 rounded text-xs">SSLCommerz</span>
          <span className="bg-zinc-800 px-2 py-1 rounded text-xs">bKash</span>
          <span className="bg-zinc-800 px-2 py-1 rounded text-xs">Nagad</span>
          <span className="bg-zinc-800 px-2 py-1 rounded text-xs">Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
}
