import {useState} from "react";
import {deleteProduct} from "@/entities/product";

export const useDeleteProduct = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const remove = async (id: number): Promise<boolean> => {
        setIsSubmitting(true);
        setError(null);
        try {
            await deleteProduct(id);
            return true;
        } catch {
            setError("Не удалось удалить продукт");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {remove, isSubmitting, error};
};