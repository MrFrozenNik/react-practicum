import type {ComponentPropsWithoutRef, ElementType} from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonStatus = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
type ButtonKind = 'filled' | 'outlined' | 'dashed' | 'text';
type ButtonSize = 'small' | 'base' | 'large';

type ButtonOwnProps<T extends ElementType> = {
    as?: T;
    status?: ButtonStatus;
    kind?: ButtonKind;
    size?: ButtonSize;
    loading?: boolean;
};

type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

const defaultElement = 'button';

export const Button = <T extends ElementType = typeof defaultElement>({
                                                                          as,
                                                                          children,
                                                                          status = 'primary',
                                                                          kind = 'filled',
                                                                          size = 'base',
                                                                          loading = false,
                                                                          disabled,
                                                                          className,
                                                                          ...props
                                                                      }: ButtonProps<T>) => {
    const Component = as || defaultElement;
    const isDisabled = disabled || loading;

    return (
        <Component
            className={clsx(
                styles.button,
                styles[size],
                styles[`status-${status}`],
                styles[`kind-${kind}`],
                loading && styles.loading,
                className,
            )}
            disabled={Component === defaultElement ? isDisabled : undefined}
            {...props}
        >
            {loading ? <span className={styles.spinner}/> : children}
        </Component>
    );
};