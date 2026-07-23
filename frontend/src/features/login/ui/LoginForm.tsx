import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import clsx from "clsx";
import {useNavigate, useLocation} from "react-router-dom";
import {type LoginFormValues, loginSchema} from "@/features/login/model/schema.ts";
import {login, LoginError} from "@/features/login/api/login.ts";
import styles from "./LoginForm.module.scss";
import {useUser} from "@/entities/user";
import {Button, Input, Text} from "@/shared/ui";

export const LoginForm = () => {
    const {setUser} = useUser();
    const [serverError, setServerError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as {from?: {pathname: string}} | null)?.from?.pathname ?? "/";

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},

    } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema), defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        setServerError(null);
        try {
            const user = await login(values);
            setUser(user);
            navigate(from, {replace: true});
        } catch (err) {
            setServerError(err instanceof LoginError ? err.message : "Something went wrong");
        }
    };

    return (
        <form className={clsx(styles.form, "flex")} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Text as="h1" size="4xl" weight="bold" className="mb-2">
                Вход
            </Text>

            <Controller
                name="email"
                control={control}
                render={({field}) => (
                    <Input
                        {...field}
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                        autoComplete="username"
                        error={errors.email?.message}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({field}) => (
                    <Input
                        {...field}
                        type="password"
                        label="Пароль"
                        placeholder="Пароль"
                        autoComplete="current-password"
                        error={errors.password?.message}
                    />
                )}
            />

            {serverError && (
                <Text size="sm" weight="medium" className={styles.serverError}>
                    {serverError}
                </Text>
            )}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Вход..." : "Войти"}
            </Button>
        </form>
    );
};