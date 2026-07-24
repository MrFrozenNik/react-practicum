import type {CreateProductPayload, Product} from "../model/types";
import {apiClient} from "@/shared/api";

export const createProduct = async (payload: CreateProductPayload) => {
    const response = await apiClient.post<Product>("/products", payload);
    return response.data;
};