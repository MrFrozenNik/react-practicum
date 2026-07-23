import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProduct, type Product, ProductDetails} from "@/entities/product";
import {Button, LoadingPlaceholder} from "@/shared/ui";

export const ProductPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        getProduct(Number(id))
            .then(setProduct)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoadingPlaceholder/>;
    if (!product) return <p>Товар не найден</p>;

    return <div className="container">
        <Button as="a" href="/" kind="text" status="primary" className="px-0 pt-2"> {String("<- Назад")}</Button>
        <ProductDetails product={product} onAddToCart={() => {
        }}/>
    </div>
};