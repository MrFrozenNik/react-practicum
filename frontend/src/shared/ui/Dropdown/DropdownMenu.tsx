import {type ReactNode, useEffect, useRef} from "react";
import clsx from "clsx";
import {useDropdownContext} from "@/shared/ui/Dropdown/DropdownContext.tsx";
import styles from './Dropdown.module.scss';

export interface DropdownMenuProps {
    className?: string;
    children: ReactNode;
}

export const DropdownMenu = ({className, children}: DropdownMenuProps) => {
    const context = useDropdownContext();
    const menuRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const menu = menuRef.current;
        if (!menu) return;

        const handleToggle = (event: Event) => {
            const toggleEvent = event as ToggleEvent;
            if (toggleEvent.newState !== 'open') return;

            const trigger = document.querySelector(`[popovertarget="${context.id}"]`) as HTMLElement | null;
            if (!trigger) return;

            const rect = trigger.getBoundingClientRect();
            menu.style.top = `${rect.bottom + 4}px`;
            menu.style.left = `${rect.left}px`;
            menu.style.minWidth = `${rect.width}px`;
        };

        menu.addEventListener('toggle', handleToggle);
        return () => menu.removeEventListener('toggle', handleToggle);
    }, [context.id]);


    return <div id={context.id} ref={menuRef} popover="auto" className={clsx(styles.menu, className)}>
        {children}
    </div>
}