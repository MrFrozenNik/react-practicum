import { apiClient } from "@/shared/api";
import type { User } from "@/entities/user/model/types.ts";

export const getMe = async () => {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
};