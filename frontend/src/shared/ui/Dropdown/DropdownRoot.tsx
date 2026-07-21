import {type ReactNode, useId} from "react";
import clsx from "clsx";
import type {DropdownKind, DropdownSize, DropdownStatus} from "@/shared/ui/Dropdown/types.ts";
import {DropdownContext} from "./DropdownContext";
import styles from './Dropdown.module.scss';

export interface DropdownRootProps {
    kind?: DropdownKind;
    status?: DropdownStatus;
    size?: DropdownSize;
    closeOnSelect?: boolean;
    className?: string;
    children: ReactNode;
}


export const DropdownRoot = (
    {
        kind = "filled",
        status = "primary",
        size = "base",
        closeOnSelect = true,
        className,
        children,
    }: DropdownRootProps) => {

    const id = useId();


    return <DropdownContext.Provider value={{id, closeOnSelect, kind, status, size}}>
        <div className={clsx(styles.root, className)}>
            {children}
        </div>
    </DropdownContext.Provider>
}