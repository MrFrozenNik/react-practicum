import {useDeleteProduct} from "../model/useDeleteProduct";
import type {Product} from "@/entities/product";
import {Button} from "@/shared/ui";

type DeleteProductButtonProps = {
    product: Product;
    onDeleted: (id: number) => void;
};

export const DeleteProductButton = ({product, onDeleted}: DeleteProductButtonProps) => {
    const {remove, isSubmitting} = useDeleteProduct();

    const handleClick = async () => {
        if (!window.confirm(`Удалить продукт "${product.title}"?`)) return;
        const ok = await remove(product.id);
        if (ok) onDeleted(product.id);
    };

    return (
        <Button status="danger" kind="outlined" size="small" onClick={handleClick} disabled={isSubmitting}>
            {isSubmitting ? "Удаляем..." : "Удалить"}
        </Button>
    );
};