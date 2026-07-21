import type {ComponentPropsWithoutRef} from "react";
import type {DropdownKind, DropdownSize, DropdownStatus} from "@/shared/ui/Dropdown/types.ts";
import {useDropdownContext} from "@/shared/ui/Dropdown/DropdownContext.tsx";
import {Button} from "@/shared/ui";

export type DropdownTriggerProps = ComponentPropsWithoutRef<'button'> & {
    kind?: DropdownKind;
    status?: DropdownStatus;
    size?: DropdownSize;
};

export const DropdownTrigger = ({ kind, status, size, children, ...props }: DropdownTriggerProps) => {
    const ctx = useDropdownContext();

    return (
        <Button
            type="button"
            kind={kind ?? ctx.kind}
            status={status ?? ctx.status}
            size={size ?? ctx.size}
            popoverTarget={ctx.id}
            {...props}
        >
            {children}
        </Button>
    );
};