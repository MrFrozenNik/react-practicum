export interface CartItem {
    productId: number;
    title: string;
    price: string;
    quantity: number;
}

export interface CartContextValue {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clear: () => void;
    totalCount: number;
}