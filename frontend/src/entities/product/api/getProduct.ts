import type {Product} from "../model/types";
import {apiClient} from "@/shared/api";

export const getProduct = async (id: number) => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
};