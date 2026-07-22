import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {type UpdatePasswordFormValues, updatePasswordSchema} from "@/features/update-password/model/schema.ts";
import {updatePassword, UpdatePasswordError} from "@/features/update-password/api/updatePassword.ts";
import styles from "@/shared/styles/UpdateForm.module.scss";
import {Button, Input, Text} from "@/shared/ui";

export const UpdatePasswordForm = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<UpdatePasswordFormValues>({
        resolver: yupResolver(updatePasswordSchema),
        defaultValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },
    });

    const onSubmit = async (values: UpdatePasswordFormValues) => {
        setServerError(null);
        setSuccessMessage(null);
        try {
            await updatePassword(values);
            setSuccessMessage("Пароль успешно изменён");
            reset();
        } catch (err) {
            setServerError(err instanceof UpdatePasswordError ? err.message : "Something went wrong");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Text as="h2" size="2xl" weight="bold" className={styles.title}>
                Сменить пароль
            </Text>

            <Controller
                name="current_password"
                control={control}
                render={({field}) => (
                    <Input
                        {...field}
                        type="password"
                        label="Текущий пароль"
                        placeholder="Текущий пароль"
                        autoComplete="current-password"
                        error={errors.current_password?.message}
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
                        label="Новый пароль"
                        placeholder="Новый пароль"
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
                        label="Повторите новый пароль"
                        placeholder="Повторите новый пароль"
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

            {successMessage && (
                <Text size="sm" weight="medium" className={styles.successMessage}>
                    {successMessage}
                </Text>
            )}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Сохранение..." : "Сменить пароль"}
            </Button>
        </form>
    );
};