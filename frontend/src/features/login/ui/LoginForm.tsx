import {Button} from "@/shared/ui";
import {useState} from "react";
import {useUser} from "@/entities/user";
import {useForm} from "react-hook-form";
import {type LoginFormValues, loginSchema} from "@/features/login/model/schema.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {login, LoginError} from "@/features/login/api/login.ts";


export const LoginForm = () => {
    const { setUser } = useUser();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });

    const onSubmit = async (values: LoginFormValues) => {
        setServerError(null);
        try {
            const user = await login(values);
            setUser(user);
        } catch (err) {
            setServerError(err instanceof LoginError ? err.message : "Something went wrong");
        }
    };


    return(
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <input type="email" placeholder="Email" {...register("email")} />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>

            <div>
                <input type="password" placeholder="Пароль" {...register("password")} />
                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            </div>

            {serverError && <p style={{ color: "red" }}>{serverError}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Вход..." : "Войти"}
            </Button>
        </form>
    )
}