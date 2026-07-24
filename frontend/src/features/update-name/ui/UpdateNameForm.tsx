import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import clsx from "clsx";
import {type UpdateNameFormValues, updateNameSchema} from "@/features/update-name/model/schema.ts";
import {updateName, UpdateNameError} from "@/features/update-name/api/updateName.ts";
import {useUser} from "@/entities/user";
import styles from "@/shared/styles/UpdateForm.module.scss";
import {Button, Input, Text} from "@/shared/ui";

export const UpdateNameForm = () => {
    const {user, setUser} = useUser();
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<UpdateNameFormValues>({
        resolver: yupResolver(updateNameSchema),
        defaultValues: {
            name: user?.name ?? "",
        },
    });

    const onSubmit = async (values: UpdateNameFormValues) => {
        setServerError(null);
        setSuccessMessage(null);
        try {
            const updatedUser = await updateName(values);
            setUser(updatedUser);
            setSuccessMessage("Имя успешно обновлено");
        } catch (err) {
            setServerError(err instanceof UpdateNameError ? err.message : "Something went wrong");
        }
    };

    return (
        <form className={clsx(styles.form, "flex")} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Text as="h2" size="2xl" weight="bold" className={styles.title}>
                Изменить имя
            </Text>

            <Controller
                name="name"
                control={control}
                render={({field}) => (
                    <Input
                        {...field}
                        type="text"
                        label="Имя"
                        placeholder="Ваше имя"
                        error={errors.name?.message}
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
                {isSubmitting ? "Сохранение..." : "Сохранить имя"}
            </Button>
        </form>
    );
};