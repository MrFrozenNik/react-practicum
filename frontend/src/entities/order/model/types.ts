export type OrderStatus = "in_progress" | "accepted" | "completed" | "cancelled";

export interface OrderItem {
    id: number;
    product_id: number | null;
    title: string;
    price: string;
    quantity: number;
}

export interface Order {
    id: number;
    user_id: number;
    comment: string | null;
    status: OrderStatus;
    items: OrderItem[];
    created_at: string;
}

export interface CreateOrderPayload {
    comment?: string;
    items: {
        product_id: number;
        quantity: number;
    }[];
}