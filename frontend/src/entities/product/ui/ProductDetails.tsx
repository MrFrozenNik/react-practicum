import clsx from "clsx";
import type {Product} from "../model/types";
import {formatPrice} from "../lib/formatPrice";
import styles from "./ProductDetails.module.scss";
import {Button, Text} from "@/shared/ui";

type ProductDetailsProps = {
    product: Product;
    inCart?: boolean;
    onAddToCart?: (product: Product) => void;
    onRemoveFromCart?: (product: Product) => void;
};

export const ProductDetails = ({product, inCart = false, onAddToCart, onRemoveFromCart}: ProductDetailsProps) => {
    return (
        <article className={clsx(styles.details, "pt-8")}>
            <Text as="h1" size="4xl" weight="bold" className="my-0">
                {product.title}
            </Text>
            <Text as="p" size="sm" className={styles.meta}>
                Добавлен: {new Date(product.created_at).toLocaleDateString("ru-RU")}
            </Text>

            {product.description && (
                <Text as="p" size="lg" className={styles.description}>
                    {product.description}
                </Text>
            )}

            <div className={styles.footer}>
                <Text as="span" size="2xl" weight="semibold">
                    {formatPrice(product.price)}
                </Text>
                {inCart ? (
                    <Button
                        status="primary"
                        kind="outlined"
                        size="base"
                        onClick={() => onRemoveFromCart?.(product)}
                    >
                        Удалить
                    </Button>
                ) : (
                    <Button
                        status="primary"
                        kind="filled"
                        size="base"
                        onClick={() => onAddToCart?.(product)}
                    >
                        В корзину
                    </Button>
                )}
            </div>
        </article>
    );
};