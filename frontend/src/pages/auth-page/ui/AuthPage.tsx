import {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import clsx from "clsx";
import styles from "./AuthPage.module.scss";
import {LoginForm} from "@/features/login";
import {RegisterForm} from "@/features/register";
import {useUser} from "@/entities/user";
import {Button, ToggleSwitch} from "@/shared/ui";

const FORM_OPTIONS: [string, string] = ["Вход", "Регистрация"];

export const AuthPage = () => {
    const {isAuthenticated} = useUser();
    const [mode, setMode] = useState<string>(FORM_OPTIONS[0]);

    if (isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    return (
        <div className={clsx(styles.page, "container flex py-6 items-center")}>
            <Button as={Link} to="/" kind="text" status="primary" className={styles.back}>
                ← На главную
            </Button>

            <ToggleSwitch value={mode} options={FORM_OPTIONS} onChange={setMode}/>

                {mode === FORM_OPTIONS[0] ? <LoginForm/> : <RegisterForm/>}

        </div>
    );
};