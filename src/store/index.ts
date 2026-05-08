import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = { id: string; qty: number };

type CartState = {
  items: CartItem[];
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (id) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === id);
          if (existing)
            return {
              items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
            };
          return { items: [...s.items, { id, qty: 1 }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0 ? s.items.filter((i) => i.id !== id) : s.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
    }),
    { name: "macnelles-cart" }
  )
);

type VaultCollection = "Date Night" | "Daily" | "Power" | "Vacation";

type VaultState = {
  saved: Record<string, VaultCollection>; // perfumeId -> collection
  toggle: (id: string, c: VaultCollection) => void;
  isSaved: (id: string) => boolean;
};

export const useVault = create<VaultState>()(
  persist(
    (set, get) => ({
      saved: {},
      toggle: (id, c) =>
        set((s) => {
          const next = { ...s.saved };
          if (next[id]) delete next[id];
          else next[id] = c;
          return { saved: next };
        }),
      isSaved: (id) => Boolean(get().saved[id]),
    }),
    { name: "macnelles-vault" }
  )
);

type UIState = {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMobileMenuOpen: (v: boolean) => void;
};

export const useUI = create<UIState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),
  setSearchOpen: (v) => set({ searchOpen: v, cartOpen: false, mobileMenuOpen: false }),
  setMobileMenuOpen: (v) => set({ mobileMenuOpen: v, cartOpen: false, searchOpen: false }),
  
}));
