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
  saved: Record<string, VaultCollection>;
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

export type GiftCard = {
  recipient: string;
  sender: string;
  message: string;
  frontColor: string;
  backColor: string;
  textColor: string;
  font: "display" | "sans";
};

export const defaultGiftCard: GiftCard = {
  recipient: "",
  sender: "",
  message: "",
  frontColor: "#0a0a0a",
  backColor: "#f5f1ea",
  textColor: "#f5f1ea",
  font: "display",
};

type ParcelState = {
  items: string[]; // perfume ids
  card: GiftCard;
  add: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  setCard: (patch: Partial<GiftCard>) => void;
  reset: () => void;
};

export const useParcel = create<ParcelState>()(
  persist(
    (set, get) => ({
      items: [],
      card: defaultGiftCard,
      add: (id) => set((s) => (s.items.includes(id) ? s : { items: [...s.items, id] })),
      remove: (id) => set((s) => ({ items: s.items.filter((x) => x !== id) })),
      has: (id) => get().items.includes(id),
      toggle: (id) =>
        set((s) =>
          s.items.includes(id)
            ? { items: s.items.filter((x) => x !== id) }
            : { items: [...s.items, id] }
        ),
      setCard: (patch) => set((s) => ({ card: { ...s.card, ...patch } })),
      reset: () => set({ items: [], card: defaultGiftCard }),
    }),
    { name: "macnelles-parcel" }
  )
);

type UIState = {
  cartOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
};

export const useUI = create<UIState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),
  setSearchOpen: (v) => set({ searchOpen: v }),
}));
