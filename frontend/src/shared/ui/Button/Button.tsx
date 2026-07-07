import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonStatus = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
type ButtonKind = 'filled' | 'outlined' | 'dashed' | 'text';
type ButtonSize = 'small' | 'base' | 'large';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    status?: ButtonStatus;
    kind?: ButtonKind;
    size?: ButtonSize;
    loading?: boolean;
};

export const Button =
    ({children, status = 'primary', kind = 'filled', size = 'base', loading = false, disabled, className, ...props}: ButtonProps) => {

    const isDisabled = disabled || loading;

    return (
        <button
            className={clsx(
                styles.button,
                styles[size],
                styles[`status-${status}`],
                styles[`kind-${kind}`],
                loading && styles.loading,
                className,
            )}
            disabled={isDisabled}
            aria-busy={loading}
            {...props}
        >
            {loading ? <span className={styles.spinner} /> : children}
        </button>
    );
};