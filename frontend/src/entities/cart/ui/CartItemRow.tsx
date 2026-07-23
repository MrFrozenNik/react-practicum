import {type CartItem, useCart} from "@/entities/cart";

export const CartItemRow = (item: CartItem) => {
    const {updateQuantity, removeItem} = useCart();

    return <></>;
}