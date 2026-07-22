import clsx from "clsx";
import styles from "./ToggleSwitch.module.scss";

interface ToggleSwitchProps {
    value: string;
    options: [string, string];
    onChange: (value: string) => void;
    className?: string;
}


export const ToggleSwitch = ({value, options, onChange, className}: ToggleSwitchProps) => {
    const isFirst = value === options[0];


    return <div className={clsx(styles.root, className)}>
        <button type="button" className={clsx(styles.option, isFirst && styles.active)}
                onClick={() => onChange(options[0])}>{options[0]}</button>
        <button type="button" className={clsx(styles.option, !isFirst && styles.active)}
                onClick={() => onChange(options[1])}>{options[1]}</button>
    </div>
}