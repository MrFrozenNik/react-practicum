import * as yup from "yup";

export const updatePasswordSchema = yup.object().shape({
    current_password: yup.string().required("Current password is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    password_confirmation: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
});

export type UpdatePasswordFormValues = yup.InferType<typeof updatePasswordSchema>;