import type {CartItem} from "../model/types";

const STORAGE_KEY = "cart";

export const cartStorage = {
    get: (): CartItem[] => {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    },
    set: (items: CartItem[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    },
};