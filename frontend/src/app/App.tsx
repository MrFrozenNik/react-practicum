import {Route, Routes} from "react-router-dom";
import {MainLayout} from "@/app/layouts/main-layout";
import {LoginForm} from "@/features/login";
import {RegisterForm} from "@/features/register";
import {useUser} from "@/entities/user";

function App() {
    const {user, isLoading, isAuthenticated} = useUser();

    if (isLoading) return <p>Загрузка...</p>;

    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<>
                    {isAuthenticated && <p>Привет, {user?.name}</p>}
                    123
                </>}/>
            </Route>
            <Route path="/auth" element={<>
                логин:
                {isAuthenticated ? <p>Привет, {user?.name}!</p> : <LoginForm/>}
                регистер:
                {isAuthenticated ? <p>Привет, {user?.name}!</p> : <RegisterForm/>}
            </>}/>
        </Routes>

    );
}

export default App;