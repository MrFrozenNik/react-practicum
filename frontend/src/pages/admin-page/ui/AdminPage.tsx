import {useEffect, useState} from "react";
import clsx from "clsx";
import styles from "./AdminPage.module.scss";
import {CreateProductForm} from "@/features/create-product";
import {DeleteProductButton} from "@/features/delete-product";
import {getProducts, type Product, ProductCard} from "@/entities/product";
import {LoadingPlaceholder, Text} from "@/shared/ui";

export const AdminPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch(() => setError("Не удалось загрузить продукты"))
            .finally(() => setIsLoading(false));
    }, []);

    const handleCreated = (product: Product) => {
        setProducts((prev) => [product, ...prev]);
    };

    const handleDeleted = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    if (isLoading) return <LoadingPlaceholder/>;
    return (
        <div className={clsx(styles.page, "flex container py-6")}>
            <Text as="h1" size="2xl" weight="semibold">Админка</Text>

            <CreateProductForm onCreated={handleCreated}/>

            {error && <Text as="p" size="sm">{error}</Text>}

            <div className={clsx(styles.list, "grid")}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        actions={<DeleteProductButton product={product} onDeleted={handleDeleted}/>}
                    />
                ))}
            </div>
        </div>
    );
};