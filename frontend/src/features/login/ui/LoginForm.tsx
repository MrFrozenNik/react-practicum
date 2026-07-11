import {Button} from "@/shared/ui";
import {useState} from "react";
import {useUser} from "@/entities/user";
import {useForm, Controller} from "react-hook-form";
import {type LoginFormValues, loginSchema} from "@/features/login/model/schema.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {login, LoginError} from "@/features/login/api/login.ts";


export const LoginForm = () => {
    const {setUser} = useUser();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<LoginFormValues>({resolver: yupResolver(loginSchema)});

    const onSubmit = async (values: LoginFormValues) => {
        setServerError(null);
        try {
            const user = await login(values);
            setUser(user);
        } catch (err) {
            setServerError(err instanceof LoginError ? err.message : "Something went wrong");
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <Controller
                    name="email"
                    control={control}
                    render={({field}) => (
                        <input
                            {...field}
                            type="email"
                            placeholder="Email"
                            autoComplete="username"
                        />
                    )}
                />
                {errors.email && <p style={{color: "red"}}>{errors.email.message}</p>}
            </div>

            <div>
                <Controller
                    name="password"
                    control={control}
                    render={({field}) => (
                        <input
                            {...field}
                            type="password"
                            placeholder="Пароль"
                            autoComplete="current-password"
                        />
                    )}
                />
                {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}
            </div>

            {serverError && <p style={{color: "red"}}>{serverError}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Вход..." : "Войти"}
            </Button>
        </form>
    )
}