import {useUpdateOrderStatus} from "../model/useUpdateOrderStatus";
import type {Order, OrderStatus} from "@/entities/order";
import {Dropdown, Text} from "@/shared/ui";

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

    const currentLabel = statusOptions.find((opt) => opt.value === order.status)?.label;

    const handleSelect = async (status: OrderStatus) => {
        if (status === order.status) return;
        const updated = await update(order.id, status);
        if (updated) onUpdated(updated);
    };

    return <div className="flex items-center gap-2">
        <Text as="span" size="sm">Изменить статус заказа:</Text>
        <Dropdown size="small">
            <Dropdown.Trigger disabled={isSubmitting}>
                {currentLabel}
            </Dropdown.Trigger>
            <Dropdown.Menu>
                {statusOptions.map((opt) => (
                    <Dropdown.Item
                        key={opt.value}
                        disabled={opt.value === order.status}
                        onClick={() => handleSelect(opt.value)}
                    >
                        {opt.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    </div>
};