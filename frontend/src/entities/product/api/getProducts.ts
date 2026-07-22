import type {Product} from "../model/types";
import {apiClient} from "@/shared/api";

export const getProducts = async () => {
    const response = await apiClient.get<Product[]>("/products");
    return response.data;
};