import {apiClient} from "@/shared/api";
import {getMe} from "@/entities/user";
import {tokenStorage} from "@/shared/api/token-storage.ts";
import {AxiosError} from "axios";


interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export class RegisterError extends Error {
    status: number;
    fieldErrors?: Record<string, string[]>;

    constructor(status: number, message: string, fieldErrors?: Record<string, string[]>) {
        super(message);
        this.status = status;
        this.fieldErrors = fieldErrors;
    }
}

export const register = async (payload: RegisterPayload) => {
    try {
        const {data} = await apiClient.post<{ access_token: string }>("/auth/register", payload);
        tokenStorage.set(data.access_token);
        return await getMe();
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 422) {
            throw new RegisterError(422, "Fields filled incorrectly")
        }
        throw new RegisterError(0, "Unable to register");
    }
}