import {useState} from "react";
import {updateOrderStatus} from "../api/updateOrderStatus";
import type {Order, OrderStatus} from "@/entities/order";

export const useUpdateOrderStatus = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (orderId: number, status: OrderStatus): Promise<Order | null> => {
        setIsSubmitting(true);
        setError(null);
        try {
            return await updateOrderStatus(orderId, status);
        } catch {
            setError("Не удалось обновить статус");
            return null;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {update, isSubmitting, error};
};