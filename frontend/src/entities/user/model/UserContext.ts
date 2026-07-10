import { createContext } from "react";
import type { User } from "./types";

export interface UserContextValue {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue | null>(null);