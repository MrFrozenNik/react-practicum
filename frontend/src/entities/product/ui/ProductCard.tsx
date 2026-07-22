import clsx from "clsx";
import type {Product} from "../model/types";
import {formatPrice} from "../lib/formatPrice";
import styles from "./ProductCard.module.scss";
import {Button, Text} from "@/shared/ui";

type ProductCardProps = {
    product: Product;
    onAddToCart?: (product: Product) => void;
};

export const ProductCard = ({product, onAddToCart}: ProductCardProps) => {
    return (
        <article className={styles.card}>
            <Text size="xl" as="h3" weight="semibold" className="my-0 grow-2">
                {product.title}
            </Text>
            {product.description && (
                <Text as="p" size="xs" className={clsx(styles.description)}>{product.description}</Text>
            )}
            <div className={styles.footer}>
                <Text as="span" weight="semibold">{formatPrice(product.price)}</Text>
                <Button
                    status="primary"
                    kind="filled"
                    size="small"
                    onClick={() => onAddToCart?.(product)}
                >
                    В корзину
                </Button>
            </div>
        </article>
    );
};