import {LoginForm} from "@/features/login";
import {RegisterForm} from "@/features/register";
import {useUser} from "@/entities/user";


export const AuthPage = () => {
    const {user, isAuthenticated} = useUser();
    return <>
        логин:
        {isAuthenticated ? <p>Привет, {user?.name}!</p> : <LoginForm/>}
        регистер:
        {isAuthenticated ? <p>Привет, {user?.name}!</p> : <RegisterForm/>}
    </>
}