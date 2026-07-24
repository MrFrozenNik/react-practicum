export interface Product {
    id: number;
    title: string;
    description: string | null;
    price: string;
    created_at: string;
    updated_at: string;
}

export interface CreateProductPayload {
    title: string;
    description?: string;
    price: string;
}