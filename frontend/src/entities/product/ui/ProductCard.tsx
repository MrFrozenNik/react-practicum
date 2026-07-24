import clsx from "clsx";
import {Link} from "react-router-dom";
import type {ReactNode} from "react";
import type {Product} from "../model/types";
import styles from "./ProductCard.module.scss";
import {formatPrice} from "@/shared/lib/formatPrice";
import {Button, Text} from "@/shared/ui";

type ProductCardProps = {
    product: Product;
    inCart?: boolean;
    onAddToCart?: (product: Product) => void;
    onRemoveFromCart?: (product: Product) => void;
    actions?: ReactNode;
};

export const ProductCard = ({product, inCart = false, onAddToCart, onRemoveFromCart, actions}: ProductCardProps) => {
    return (
        <article className={clsx(styles.card, "gap-2 p-4 flex")}>
            <Link to={`/products/${product.id}`} className={styles.titleLink}>
                <Text size="xl" as="h3" weight="semibold" className="my-0 grow-2">
                    {product.title}
                </Text>
            </Link>
            {product.description && (
                <Text as="p" size="xs" className={clsx(styles.description)}>{product.description}</Text>
            )}
            <div className={clsx(styles.footer, "flex items-center gap-2 justify-between")}>
                <Text as="span" weight="semibold">{formatPrice(product.price)}</Text>
                {actions ?? (
                    inCart ? (
                        <Button
                            status="primary"
                            kind="outlined"
                            size="small"
                            onClick={() => onRemoveFromCart?.(product)}
                        >
                            Удалить
                        </Button>
                    ) : (
                        <Button
                            status="primary"
                            kind="filled"
                            size="small"
                            onClick={() => onAddToCart?.(product)}
                        >
                            В корзину
                        </Button>
                    )
                )}
            </div>
        </article>
    );
};