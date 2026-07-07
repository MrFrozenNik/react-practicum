import type {ComponentPropsWithoutRef} from "react";
import styles from './Button.module.scss';

type ButtonProps = ComponentPropsWithoutRef<'button'>

export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
};