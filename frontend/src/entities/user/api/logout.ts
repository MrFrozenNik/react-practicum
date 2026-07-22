import {apiClient} from "@/shared/api";

export const logout = async () => {
    try {
        await apiClient.post("/auth/logout");
    } finally {
        window.dispatchEvent(new CustomEvent("auth:logout"));
    }
}