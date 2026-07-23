import {useState} from "react";
import {createOrder} from "@/entities/order";
import {useCart} from "@/entities/cart";

export const useCreateOrder = () => {
    const {items, clear} = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (comment: string) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const order = await createOrder({
                comment: comment || undefined,
                items: items.map((item) => ({
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            });
            clear();
            return order;
        } catch {
            setError("Не удалось оформить заказ");
            return null;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {submit, isSubmitting, error};
};