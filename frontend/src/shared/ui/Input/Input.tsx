import type {ComponentPropsWithoutRef} from 'react';
import {useId} from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

type InputSize = 'small' | 'base' | 'large';

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'size'> & {
    label?: string;
    caption?: string;
    error?: string;
    size?: InputSize;
    required?: boolean;
};

export const Input = ({
                          label,
                          caption,
                          error,
                          size = 'base',
                          required,
                          id,
                          className,
                          disabled,
                          readOnly,
                          ...props
                      }: InputProps) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const captionId = `${inputId}-caption`;
    const hasError = Boolean(error);
    const hasCaption = Boolean(error || caption);

    return (
        <div className={clsx(styles.wrapper, className)}>
            {label && (
                <label className={styles.label} htmlFor={inputId}>
                    {label}
                    {required && <span className={styles.required}> *</span>}
                </label>
            )}

            <div
                className={clsx(
                    styles.field,
                    styles[size],
                    hasError && styles['status-danger'],
                    disabled && styles.disabled,
                    readOnly && styles.readonly,
                )}
            >
                <input
                    id={inputId}
                    className={styles.control}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-invalid={hasError || undefined}
                    aria-describedby={hasCaption ? captionId : undefined}
                    {...props}
                />
            </div>

            {hasCaption && (
                <span id={captionId} className={clsx(styles.caption, hasError && styles.error)}>
                    {error || caption}
                </span>
            )}
        </div>
    );
};