import {useState} from "react";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import styles from "./CartPage.module.scss";
import {useCreateOrder} from "@/features/create-order";
import {CartItemRow, useCart} from "@/entities/cart";
import {Button, Text} from "@/shared/ui";

export const CartPage = () => {
    const {items} = useCart();
    const [comment, setComment] = useState("");
    const navigate = useNavigate();
    const {submit, isSubmitting, error} = useCreateOrder();

    const handleSubmit = async () => {
        const order = await submit(comment);
        if (order) {
            navigate("/orders");
        }
    };

    return (
        <div className={clsx(styles.page, "flex container py-6")}>
            <Text as="h1" size="2xl" weight="semibold">Корзина</Text>

            {items.length === 0 ? (
                <Text as="p">Корзина пуста</Text>
            ) : (
                <div className={clsx(styles.list, "flex")}>
                    {items.map((item) => (
                        <CartItemRow key={item.productId} {...item} />
                    ))}
                </div>
            )}

            <textarea
                className={clsx(styles.comment, "p-3")}
                placeholder="Комментарий к заказу"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            {error && (
                <Text as="p" size="sm">{error}</Text>
            )}

            <Button
                size="large"
                disabled={items.length === 0 || isSubmitting}
                onClick={handleSubmit}
            >
                {isSubmitting ? "Оформляем..." : "Сформировать заказ"}
            </Button>
        </div>
    );
};   