import type {Order} from "../model/types";
import {apiClient} from "@/shared/api";

export const getOrders = async () => {
    const response = await apiClient.get<Order[]>("/orders");
    return response.data;
};