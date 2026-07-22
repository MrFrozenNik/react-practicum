import {AxiosError} from "axios";
import type {User} from "@/entities/user";
import {apiClient} from "@/shared/api";

interface UpdateNamePayload {
    name: string;
}

export class UpdateNameError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export const updateName = async (payload: UpdateNamePayload) => {
    try {
        const {data} = await apiClient.patch<User>("/profile/name", payload);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 422) {
                throw new UpdateNameError(422, "Fields filled incorrectly");
            }
        }
        throw new UpdateNameError(0, "Unable to update name");
    }
};