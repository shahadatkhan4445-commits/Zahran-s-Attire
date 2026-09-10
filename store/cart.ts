import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // Product ID
  name: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, color?: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.id === item.id && i.color === item.color && i.size === item.size
        );
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id && i.color === item.color && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (id, color, size) => set((state) => ({
        items: state.items.filter(
          (i) => !(i.id === id && i.color === color && i.size === size)
        ),
      })),
      updateQuantity: (id, quantity, color, size) => set((state) => ({
        items: state.items.map((i) =>
          i.id === id && i.color === color && i.size === size
            ? { ...i, quantity }
            : i
        ),
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
