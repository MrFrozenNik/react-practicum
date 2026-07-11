import { LoginForm } from "@/features/login";
import {RegisterForm} from "@/features/register";
import { useUser } from "@/entities/user";

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