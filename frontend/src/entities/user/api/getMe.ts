import type { User } from "@/entities/user/model/types.ts";import { apiClient } from "@/shared/api";

export const getMe = async () => {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
};