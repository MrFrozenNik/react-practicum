import {useState} from "react";
import {createProduct} from "@/entities/product";
import type {CreateProductPayload, Product} from "@/entities/product";

export const useCreateProduct = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (payload: CreateProductPayload): Promise<Product | null> => {
        setIsSubmitting(true);
        setError(null);
        try {
            return await createProduct(payload);
        } catch {
            setError("Couldn't create a product");
            return null;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {submit, isSubmitting, error};
};