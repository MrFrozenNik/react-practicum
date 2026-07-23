import {useUpdateOrderStatus} from "../model/useUpdateOrderStatus";
import type {Order, OrderStatus} from "@/entities/order";

const statusOptions: { value: OrderStatus; label: string }[] = [
    {value: "in_progress", label: "В работе"},
    {value: "accepted", label: "Принят"},
    {value: "completed", label: "Выполнен"},
    {value: "cancelled", label: "Отменён"},
];

type OrderStatusSelectProps = {
    order: Order;
    onUpdated: (order: Order) => void;
};

export const OrderStatusSelect = ({order, onUpdated}: OrderStatusSelectProps) => {
    const {update, isSubmitting} = useUpdateOrderStatus();

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const updated = await update(order.id, e.target.value as OrderStatus);
        if (updated) onUpdated(updated);
    };

    return (
        <select value={order.status} disabled={isSubmitting} onChange={handleChange}>
            {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
};