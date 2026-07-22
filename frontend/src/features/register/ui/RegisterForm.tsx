import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {type RegisterFormValues, registerSchema} from "@/features/register/model/schema.ts";
import {register, RegisterError} from "@/features/register/api/register.ts";
import styles from "./RegisterForm.module.scss";
import {useUser} from "@/entities/user";
import {Button, Input, Text} from "@/shared/ui";

export const RegisterForm = () => {
    const {setUser} = useUser();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        setServerError(null);
        try {
            const user = await register(values);
            setUser(user);
        } catch (err) {
            setServerError(err instanceof RegisterError ? err.message : "Something went wrong");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Text as="h1" size="4xl" weight="bold" className={styles.title}>
                Регистрация
            </Text>

            <Controller
                name="name"
                control={control}
                render={({field}) => (
                    <Input
                        {...field}
                        type="text"
                        label="Имя пользователя"
                        placeholder="Имя пользователя"
                        autoComplete="username"
                        error={errors.name?.message}
                    />
                )}
            />

            <Controller
                name="email"
                control={control}
                render={({field}) => (
                    <Input
                        {...field}
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                        autoComplete="email"
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
                        autoComplete="new-password"
                        error={errors.password?.message}
                    />
                )}
            />

            <Controller
                name="password_confirmation"
                control={control}
                render={({field}) => (
                    <Input
                        {...field}
                        type="password"
                        label="Подтвердите пароль"
                        placeholder="Подтвердите пароль"
                        autoComplete="new-password"
                        error={errors.password_confirmation?.message}
                    />
                )}
            />

            {serverError && (
                <Text size="sm" weight="medium" className={styles.serverError}>
                    {serverError}
                </Text>
            )}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
        </form>
    );
};