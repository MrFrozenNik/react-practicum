import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type RegisterFormValues, registerSchema } from "@/features/register/model/schema.ts";
import { register, RegisterError } from "@/features/register/api/register.ts";
import { useUser } from "@/entities/user";import { Button } from "@/shared/ui";

export const RegisterForm = () => {
    const { setUser } = useUser();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(registerSchema),
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            placeholder="Имя пользователя"
                            autoComplete="username"
                        />
                    )}
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
            </div>

            <div>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                        />
                    )}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>

            <div>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="password"
                            placeholder="Пароль"
                            autoComplete="new-password"
                        />
                    )}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            </div>

            <div>
                <Controller
                    name="password_confirmation"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="password"
                            placeholder="Подтвердите пароль"
                            autoComplete="new-password"
                        />
                    )}
                />
                {errors.password_confirmation && (
                    <p style={{ color: "red" }}>{errors.password_confirmation.message}</p>
                )}
            </div>

            {serverError && <p style={{ color: "red" }}>{serverError}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
        </form>
    );
};