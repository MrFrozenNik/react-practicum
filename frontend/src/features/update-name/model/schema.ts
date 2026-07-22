import * as yup from "yup";

export const updateNameSchema = yup.object().shape({
    name: yup.string().required("Name is required").max(255, "Name is too long"),
});

export type UpdateNameFormValues = yup.InferType<typeof updateNameSchema>;