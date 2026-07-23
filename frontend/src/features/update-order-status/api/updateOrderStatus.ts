import type {Order, OrderStatus} from "@/entities/order";
import {apiClient} from "@/shared/api";

export const updateOrderStatus = async (orderId: number, status: OrderStatus) => {
    const response = await apiClient.patch<Order>(`/orders/${orderId}/status`, {status});
    return response.data;
};