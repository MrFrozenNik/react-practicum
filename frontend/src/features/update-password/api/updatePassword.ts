import {AxiosError} from "axios";
import {apiClient} from "@/shared/api";

interface UpdatePasswordPayload {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export class UpdatePasswordError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export const updatePassword = async (payload: UpdatePasswordPayload) => {
    try {
        const {data} = await apiClient.patch<{ message: string }>("/profile/password", payload);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 422) {
                const message = error.response?.data?.error ?? "Fields filled incorrectly";
                throw new UpdatePasswordError(422, message);
            }
        }
        throw new UpdatePasswordError(0, "Unable to update password");
    }
};