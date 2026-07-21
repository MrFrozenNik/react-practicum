import type {ComponentPropsWithoutRef, ElementType} from "react";
import clsx from "clsx";
import {useDropdownContext} from "@/shared/ui/Dropdown/DropdownContext.tsx";
import styles from './Dropdown.module.scss';

export type DropdownItemProps<T extends ElementType = 'button'> =
    (T extends 'button' ? { disabled?: boolean } : { disabled?: never }) &
    Omit<ComponentPropsWithoutRef<T>, 'disabled'> & { as?: T };

export const DropdownItem = <T extends ElementType = 'button'>(
    {
        as,
        className,
        disabled,
        onClick,
        ...props
    }: DropdownItemProps<T>) => {
    const context = useDropdownContext();
    const Tag = (as ?? 'button') as ElementType;

    return <Tag
        className={clsx(styles.item, disabled && styles.itemDisabled, className)}
        disabled={Tag === 'button' ? disabled : undefined}
        onClick={(event: MouseEvent) => {
            onClick?.(event as never);
            if (context.closeOnSelect) {
                const popover = document.getElementById(context.id);
                popover?.hidePopover?.();
            }
        }}
        {...props}
    >

    </Tag>
}