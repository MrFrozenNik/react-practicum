import type {Order} from "../model/types";
import {apiClient} from "@/shared/api";

export const getOrder = async (id: number) => {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
};