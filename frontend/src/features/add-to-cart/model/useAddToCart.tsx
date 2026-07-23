import {useCart} from "@/entities/cart";
import type {Product} from "@/entities/product";

export const useAddToCart = () => {
    const {addItem} = useCart();

    return (product: Product) => {
        addItem({productId: product.id, title: product.title, price: product.price});
    };
};