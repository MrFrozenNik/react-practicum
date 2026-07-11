import { LoginForm } from "@/features/login";
import { useUser } from "@/entities/user";
import {RegisterForm} from "@/features/register";

function App() {
    const { user, isLoading, isAuthenticated } = useUser();

    if (isLoading) return <p>Загрузка...</p>;

    return (
        <>
            логин:
            {isAuthenticated ? <p>Привет, {user?.name}!</p> : <LoginForm />}
            регистер:
            {isAuthenticated ? <p>Привет, {user?.name}!</p> : <RegisterForm />}
        </>
    );
}

export default App;