export interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  categoryName: string;
  image: string;
  variants: { size: string; color: string; stock: number }[];
  isFeatured: boolean;
  isNewArrival: boolean;
}

export interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export const fallbackCategories: CategoryItem[] = [
  {
    _id: "cat_men",
    name: "Men",
    slug: "men",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "cat_women",
    name: "Women",
    slug: "women",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
  },
  {
    _id: "cat_accessories",
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
  }
];

export const fallbackProducts: ProductItem[] = [
  {
    _id: "prod_1",
    name: "Royal Navy Embroidered Panjabi",
    slug: "royal-navy-panjabi",
    description: "Handcrafted premium cotton blend Panjabi with intricate collar embroidery, tailored for festive occasions.",
    price: 3450,
    originalPrice: 4200,
    categoryId: "cat_men",
    categoryName: "Men",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    variants: [
      { size: "38", color: "Navy", stock: 15 },
      { size: "40", color: "Navy", stock: 20 },
      { size: "42", color: "Navy", stock: 10 }
    ],
    isFeatured: true,
    isNewArrival: true
  },
  {
    _id: "prod_2",
    name: "Classic Oxford Slim-Fit Shirt",
    slug: "classic-oxford-slim-shirt",
    description: "100% organic combed cotton oxford button-down shirt. Perfect for boardroom presentations or evening casuals.",
    price: 2250,
    originalPrice: 2800,
    categoryId: "cat_men",
    categoryName: "Men",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
    variants: [
      { size: "M", color: "Sky Blue", stock: 12 },
      { size: "L", color: "Sky Blue", stock: 18 },
      { size: "XL", color: "White", stock: 14 }
    ],
    isFeatured: true,
    isNewArrival: true
  },
  {
    _id: "prod_3",
    name: "Emerald Grace Floral Kurti",
    slug: "emerald-grace-floral-kurti",
    description: "Breezy georgette kurti with hand-embroidered neckline, vibrant digital botanical print, and soft inner lining.",
    price: 2950,
    originalPrice: 3500,
    categoryId: "cat_women",
    categoryName: "Women",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    variants: [
      { size: "S", color: "Emerald Green", stock: 8 },
      { size: "M", color: "Emerald Green", stock: 15 },
      { size: "L", color: "Emerald Green", stock: 10 }
    ],
    isFeatured: true,
    isNewArrival: true
  },
  {
    _id: "prod_4",
    name: "Artisan Leather Minimalist Wallet",
    slug: "artisan-leather-wallet",
    description: "Full-grain vegetable-tanned leather bifold wallet with RFID blocking layer and 8 card slots.",
    price: 1450,
    originalPrice: 1850,
    categoryId: "cat_accessories",
    categoryName: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
    variants: [
      { size: "One Size", color: "Vintage Tan", stock: 25 },
      { size: "One Size", color: "Charcoal Black", stock: 20 }
    ],
    isFeatured: true,
    isNewArrival: false
  },
  {
    _id: "prod_5",
    name: "Signature Tailored Chino Trousers",
    slug: "tailored-chino-trousers",
    description: "Comfort stretch twill fabric with tailored modern fit, coin pocket, and reinforced belt loops.",
    price: 2650,
    originalPrice: 3100,
    categoryId: "cat_men",
    categoryName: "Men",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop",
    variants: [
      { size: "30", color: "Khaki", stock: 10 },
      { size: "32", color: "Khaki", stock: 15 },
      { size: "34", color: "Navy", stock: 12 }
    ],
    isFeatured: true,
    isNewArrival: false
  },
  {
    _id: "prod_6",
    name: "Crimson Velvet Festive Dupatta Set",
    slug: "crimson-velvet-dupatta-set",
    description: "Rich micro-velvet fabric adorned with golden zari work and gota patti border detailing.",
    price: 4850,
    originalPrice: 5600,
    categoryId: "cat_women",
    categoryName: "Women",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    variants: [
      { size: "Free Size", color: "Deep Crimson", stock: 6 },
      { size: "Free Size", color: "Midnight Maroon", stock: 8 }
    ],
    isFeatured: true,
    isNewArrival: true
  },
  {
    _id: "prod_7",
    name: "Classic Chronograph Wristwatch",
    slug: "classic-chronograph-watch",
    description: "Surgical grade stainless steel casing with genuine leather strap and Japanese quartz movement.",
    price: 3950,
    originalPrice: 4800,
    categoryId: "cat_accessories",
    categoryName: "Accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
    variants: [
      { size: "Standard", color: "Rose Gold / Brown", stock: 15 },
      { size: "Standard", color: "Silver / Black", stock: 18 }
    ],
    isFeatured: true,
    isNewArrival: false
  },
  {
    _id: "prod_8",
    name: "Handcrafted Leather Formal Shoes",
    slug: "handcrafted-formal-shoes",
    description: "Derby formal leather shoes with anti-slip rubber outsole and cushioned memory foam insole.",
    price: 5200,
    originalPrice: 6200,
    categoryId: "cat_accessories",
    categoryName: "Accessories",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop",
    variants: [
      { size: "40", color: "Glossy Brown", stock: 10 },
      { size: "41", color: "Glossy Brown", stock: 12 },
      { size: "42", color: "Ebony Black", stock: 15 }
    ],
    isFeatured: true,
    isNewArrival: true
  }
];
