import clsx from "clsx";
import type {ReactNode} from "react";
import type {Order} from "../model/types";
import styles from "./OrderCard.module.scss";
import {Text} from "@/shared/ui";
import {formatPrice} from "@/shared/lib/formatPrice";

const statusLabels: Record<Order["status"], string> = {
    in_progress: "В работе",
    accepted: "Принят",
    completed: "Выполнен",
    cancelled: "Отменён",
};


type OrderCardProps = {
    order: Order;
    showUser?: boolean;
    actions?: ReactNode;
};

export const OrderCard = ({order, showUser = false, actions}: OrderCardProps) => {
    const total = order.items.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    );

    return (
        <article className={clsx(styles.card, "flex p-4")}>
            <div className="flex justify-between">
                <Text as="span" weight="semibold">Заказ #{order.id}</Text>
                <Text as="span">{statusLabels[order.status]}</Text>
            </div>

            {showUser && order.user && (
                <Text as="p" size="sm">
                    Заказчик: {order.user.name} ({order.user.email})
                </Text>
            )}

            <Text as="p" size="sm">
                {new Date(order.created_at).toLocaleDateString("ru-RU")}
            </Text>

            <ul className="m-0 pl-5">
                {order.items.map((item) => (
                    <li key={item.id}>
                        {item.title} × {item.quantity}
                    </li>
                ))}
            </ul>

            {order.comment && (
                <Text as="p" size="sm">Комментарий: {order.comment}</Text>
            )}

            <Text as="span" weight="semibold">{formatPrice(String(total))}</Text>
            {actions && (
                <div className="mt-2">
                    {actions}
                </div>
            )}
        </article>
    );
};