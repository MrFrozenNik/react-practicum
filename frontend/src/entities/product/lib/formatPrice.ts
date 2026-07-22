export const formatPrice = (price: string) => {
    const value = Number(price);
    return `${value.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽`;
};