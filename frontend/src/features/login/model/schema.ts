import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Incorrect email"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
