import type {ComponentPropsWithoutRef, ElementType} from 'react';
import clsx from 'clsx';
import styles from './Text.module.scss';

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type TextProps<T extends ElementType = 'p'> = ComponentPropsWithoutRef<T> & {
    as?: T;
    size?: TextSize;
    weight?: TextWeight;
};

export const Text = <T extends ElementType = 'p'>({
                                                      as,
                                                      size = 'base',
                                                      weight = 'regular',
                                                      className,
                                                      children,
                                                      ...props
                                                  }: TextProps<T>) => {

    const Tag = as || 'p';

    return (
        <Tag
            className={clsx(
                styles[`text-${size}`],
                styles[`font-${weight}`],
                className,
            )}
            {...props}
        >
            {children}
        </Tag>
    );
};