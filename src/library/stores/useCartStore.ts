import { create } from "zustand";

// Định nghĩa kiểu dữ liệu
export interface CartItemType {
  id: number;
  brand: string;
  name: string;
  price: number;
  size: string;
  image: string; // Đường dẫn ảnh
  quantity: number;
  maxStock: number; // Giả lập tồn kho
}

interface CartState {
  items: CartItemType[];
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  getTotalPrice: () => number;
}

// Data giả lập
const MOCK_DATA: CartItemType[] = [
  {
    id: 1,
    brand: "ELKA COLLECTIVE",
    name: "SASCHIA KNIT CARDIGAN - WHITE MARLE",
    price: 4349,
    size: "XL",
    image: "/assets/fortune_cardigan.webp", // Đổi lại path ảnh thật của bạn
    quantity: 2,
    maxStock: 5,
  },
  {
    id: 2,
    brand: "SOMETHING VERY SPECIAL",
    name: "SVS ESSENTIAL CREW - BEIGE",
    price: 2770,
    size: "XS",
    image: "/assets/Maison_Balzac_Olive_test.jpg", // Đổi lại path ảnh thật của bạn
    quantity: 1,
    maxStock: 10,
  },
];

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,

  // 1. Fetch Data (Giả lập delay 1s)
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ items: MOCK_DATA, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch cart", error);
      set({ isLoading: false });
    }
  },

  // 2. Cập nhật số lượng
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      ),
    }));
  },

  // 3. Xóa sản phẩm
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  // 4. Tính tổng tiền (Getter)
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
