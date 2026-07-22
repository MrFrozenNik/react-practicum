import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./ProductCatalog.module.scss";
import { getProducts, ProductCard, type Product } from "@/entities/product";
import { LoadingPlaceholder } from "@/shared/ui/loading-placeholder";

export const ProductCatalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch(() => setError("Couldn't load products catalog"))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <LoadingPlaceholder />;
    if (error) return <p>{error}</p>;

    const handleAddToCart = (product: Product) => {
        console.log(product);
    };

    return (
        <div className={clsx(styles.gridColumns, 'grid pt-4')}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
        </div>
    );
};