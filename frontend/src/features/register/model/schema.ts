import * as yup from "yup";

export const registerSchema = yup.object().shape({
    name: yup.string().required("Username is required").min(2, "Username must be at least 2 characters"),
    email: yup.string().required("Email is required").email("Incorrect email"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    password_confirmation: yup.string().required("Confirm password").oneOf([yup.ref("password")], "Passwords must match"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
