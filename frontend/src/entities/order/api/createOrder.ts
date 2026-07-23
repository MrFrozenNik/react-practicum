import type {CreateOrderPayload, Order} from "../model/types";
import {apiClient} from "@/shared/api";

export const createOrder = async (payload: CreateOrderPayload) => {
    const response = await apiClient.post<Order>("/orders", payload);
    return response.data;
};