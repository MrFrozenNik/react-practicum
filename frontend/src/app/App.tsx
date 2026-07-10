import { LoginForm } from "@/features/login";
import { useUser } from "@/entities/user";

function App() {
    const { user, isLoading, isAuthenticated } = useUser();

    if (isLoading) return <p>Загрузка...</p>;

    return (
        <>
            {isAuthenticated ? <p>Привет, {user?.name}!</p> : <LoginForm />}
        </>
    );
}

export default App;