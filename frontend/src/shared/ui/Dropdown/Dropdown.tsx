import { DropdownRoot } from './DropdownRoot';
import { DropdownTrigger } from './DropdownTrigger';
import { DropdownMenu } from './DropdownMenu';
import { DropdownItem } from './DropdownItem';

export const Dropdown = Object.assign(DropdownRoot, {
    Trigger: DropdownTrigger,
    Menu: DropdownMenu,
    Item: DropdownItem,
});