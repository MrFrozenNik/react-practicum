import {Link} from "react-router-dom";
import clsx from "clsx";
import styles from "./Header.module.scss";
import {useUser, logout} from "@/entities/user";
import {Button, Icon} from "@/shared/ui";
import {Dropdown} from "@/shared/ui";

const NAV_LINKS = [
    {label: "Каталог", to: "/"},
    {label: "Корзина", to: "/cart"},
    {label: "Заказы", to: "/orders"},
    {label: "Админка", to: "/admin"}
];

export const Header = () => {
    const {user, isAuthenticated} = useUser();

    return (
        <header className={styles.header}>
            <div className={clsx(styles.container, "container h-16 flex items-center justify-between")}>
                <div className={clsx(styles.shrink0, "flex items-center")}>
                    <Icon name="logo" className={styles.logo} />
                </div>

                <nav className={clsx(styles.center, "flex items-center")}>
                    {NAV_LINKS.map(({label, to}) => (
                        <Button key={label} as={Link} to={to} kind="text" status="default">
                            {label}
                        </Button>
                    ))}
                </nav>

                <div className={clsx(styles.shrink0, "flex items-center")}>
                    {isAuthenticated ? (
                        <Dropdown kind="filled" status="default" size="small">
                            <Dropdown.Trigger>{user?.name}</Dropdown.Trigger>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/profile">Личный кабинет</Dropdown.Item>
                                <Dropdown.Item onClick={() => logout()}>Выйти</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Button as={Link} to="/auth" kind="filled" status="default">
                            Войти
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};