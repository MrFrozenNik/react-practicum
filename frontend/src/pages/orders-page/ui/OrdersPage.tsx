import {useEffect, useState} from "react";
import clsx from "clsx";
import styles from "./OrdersPage.module.scss";
import {OrderStatusSelect} from "@/features/update-order-status";
import {getOrders, OrderCard, type Order} from "@/entities/order";
import {useUser} from "@/entities/user";
import {LoadingPlaceholder} from "@/shared/ui/loading-placeholder";
import {Text} from "@/shared/ui";

export const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {user} = useUser();

    useEffect(() => {
        getOrders()
            .then(setOrders)
            .catch(() => setError("Не удалось загрузить заказы"))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <LoadingPlaceholder/>;
    if (error) return <p>{error}</p>;

    const handleOrderUpdated = (updated: Order) => {
        setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    };

    return (
        <div className={clsx(styles.page, "container flex py-6")}>
            <Text as="h1" size="2xl" weight="semibold">Заказы</Text>

            {orders.length === 0 ? (
                <Text as="p">Заказов пока нет</Text>
            ) : (
                <div className={clsx(styles.list, "flex")}>
                    {orders.map((order) => (
                        <div key={order.id}>
                            <OrderCard order={order}/>
                            {user?.is_admin && (
                                <OrderStatusSelect order={order} onUpdated={handleOrderUpdated}/>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};