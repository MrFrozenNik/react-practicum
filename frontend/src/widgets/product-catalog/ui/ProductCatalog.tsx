import {useEffect, useState} from "react";
import clsx from "clsx";
import styles from "./ProductCatalog.module.scss";
import {useAddToCart} from "@/features/add-to-cart";
import {getProducts, ProductCard, type Product} from "@/entities/product";
import {useCart} from "@/entities/cart";
import {LoadingPlaceholder} from "@/shared/ui/loading-placeholder";

export const ProductCatalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {items, removeItem} = useCart();
    const addToCart = useAddToCart();

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch(() => setError("Не удалось загрузить каталог"))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <LoadingPlaceholder/>;
    if (error) return <p>{error}</p>;


    return <div className={clsx(styles.gridColumns, 'grid pt-4')}>
        {products.map((product) => (
            <ProductCard
                key={product.id}
                product={product}
                inCart={items.some((i) => i.productId === product.id)}
                onAddToCart={addToCart}
                onRemoveFromCart={(p) => removeItem(p.id)}
            />
        ))}
    </div>
};