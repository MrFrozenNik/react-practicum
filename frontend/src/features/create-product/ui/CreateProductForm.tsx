import {useState, type SyntheticEvent} from "react";
import clsx from "clsx";
import {useCreateProduct} from "../model/useCreateProduct";
import styles from "./CreateProductForm.module.scss";
import type {Product} from "@/entities/product";
import {Button, Input, Text} from "@/shared/ui";

type CreateProductFormProps = {
    onCreated: (product: Product) => void;
};

export const CreateProductForm = ({onCreated}: CreateProductFormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const {submit, isSubmitting, error} = useCreateProduct();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const product = await submit({
            title,
            description: description || undefined,
            price,
        });
        if (product) {
            onCreated(product);
            setTitle("");
            setDescription("");
            setPrice("");
        }
    };
    return (
        <form className={clsx(styles.form, "flex py-4")} onSubmit={handleSubmit}>
            <Text as="h2" size="lg" weight="semibold" className="my-0">Добавить продукт</Text>

            <Input
                label="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <Input
                label="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <Input
                label="Цена"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            {error && (
                <Text as="p" size="sm">{error}</Text>
            )}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Добавляем..." : "Добавить"}
            </Button>
        </form>
    );
};