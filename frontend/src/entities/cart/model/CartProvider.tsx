import {useState, useEffect, type PropsWithChildren} from "react";
import {CartContext} from "./CartContext";
import {cartStorage} from "../lib/cartStorage";
import type {CartContextValue, CartItem} from "./types";

export const CartProvider = ({children}: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>(() => cartStorage.get());

    useEffect(() => {
        cartStorage.set(items);
    }, [items]);

    const addItem: CartContextValue["addItem"] = (item) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.productId === item.productId);
            if (existing) {
                return prev.map((i) =>
                    i.productId === item.productId ? {...i, quantity: i.quantity + 1} : i
                );
            }
            return [...prev, {...item, quantity: 1}];
        });
    };

    const removeItem = (productId: number) => {
        setItems((prev) => prev.filter((i) => i.productId !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        setItems((prev) =>
            prev.map((i) => (i.productId === productId ? {...i, quantity} : i))
        );
    };

    const clear = () => setItems([]);


    return <CartContext.Provider value={{items, addItem, removeItem, updateQuantity, clear}}>
        {children}
    </CartContext.Provider>;
};