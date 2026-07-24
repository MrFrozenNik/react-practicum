import {apiClient} from "@/shared/api";

export const deleteProduct = async (id: number) => {
    await apiClient.delete(`/products/${id}`);
};