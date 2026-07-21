import {createContext, useContext} from "react";
import type {DropdownKind, DropdownSize, DropdownStatus} from "@/shared/ui/Dropdown/types.ts";


export interface DropdownContextValue{
    id: string;
    closeOnSelect: boolean;
    kind: DropdownKind;
    status: DropdownStatus;
    size: DropdownSize;
}


export const DropdownContext = createContext<DropdownContextValue | null>(null);

export const useDropdownContext = () => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error('Dropdown elements must be inside <Dropdown>!');
    return context;
}