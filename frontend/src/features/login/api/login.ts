import {apiClient} from "@/shared/api";
import {tokenStorage} from "@/shared/api/token-storage.ts";
import {getMe} from "@/entities/user";
import {AxiosError} from "axios";


interface LoginPayload {
    email: string;
    password: string;
}

export class LoginError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}


export const login = async (payload: LoginPayload) => {
    try {
        const {data} = await apiClient.post<{ access_token: string }>("/auth/login", payload);
        tokenStorage.set(data.access_token);
        return getMe();
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                throw new LoginError(401, "Wrong credentials");
            } else if (error.response?.status === 422) {
                throw new LoginError(422, "Fields filled incorrectly");
            }
        }
        throw new LoginError(0, "Unable to login");
    }

}