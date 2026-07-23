import clsx from "clsx";
import {type CartItem, useCart} from "@/entities/cart";
import styles from "./CartItemRow.module.scss";
import {formatPrice} from "@/shared/lib/formatPrice";
import {Button} from "@/shared/ui";
import {Text} from "@/shared/ui";

export const CartItemRow = (item: CartItem) => {
    const {updateQuantity, removeItem} = useCart();

    return <div className={clsx(styles.row, "flex items-center")}>
        <Text as="span" weight="semibold" className={styles.title}>
            {item.title}
        </Text>

        <div className={clsx(styles.quantity, "flex items-center")}>
            <Button
                kind="outlined"
                size="small"
                disabled={item.quantity <= 1}
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            >
                -
            </Button>
            <Text as="span">{item.quantity}</Text>
            <Button
                kind="outlined"
                size="small"
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            >
                +
            </Button>
        </div>

        <Text as="span">{formatPrice(item.price)}</Text>

        <Button
            status="danger"
            kind="outlined"
            size="small"
            onClick={() => removeItem(item.productId)}
        >
            Удалить
        </Button>
    </div>;
}