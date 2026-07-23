import {Navigate} from "react-router-dom";
import {LoginForm} from "@/features/login";
import {RegisterForm} from "@/features/register";
import {useUser} from "@/entities/user";

export const AuthPage = () => {
    const {isAuthenticated} = useUser();

    if (isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    return (
        <>
            <LoginForm/>
            <RegisterForm/>
        </>
    );
};