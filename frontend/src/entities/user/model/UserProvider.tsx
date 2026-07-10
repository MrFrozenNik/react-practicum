import { useState, useEffect, type PropsWithChildren } from "react";
import { UserContext } from "./UserContext";
import { getMe } from "../api/getMe";
import type { User } from "./types";

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLogout = () => setUser(null);
        window.addEventListener("auth:logout", handleLogout);
        return () => window.removeEventListener("auth:logout", handleLogout);
    }, []);

    useEffect(() => {
        getMe()
            .then((restoredUser) => setUser(restoredUser))
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading, isAuthenticated: user !== null, setUser }}>
            {children}
        </UserContext.Provider>
    );
};