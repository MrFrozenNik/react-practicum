import {Route, Routes} from "react-router-dom";
import {MainLayout} from "@/app/layouts/main-layout";
import {ProtectedRoute} from "@/app/routes";
import {AuthPage} from "@/pages/auth-page";
import {ProfilePage} from "@/pages/profile-page";
import {LoadingPlaceholder} from "@/widgets/loading-placeholder";
import {useUser} from "@/entities/user";

function App() {
    const {user, isLoading, isAuthenticated} = useUser();

    if (isLoading) return <LoadingPlaceholder/>;

    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route index path="/" element={<>
                    {isAuthenticated && <p>Привет, {user?.name}</p>}
                    123
                </>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Route>
            </Route>
            <Route path="/auth" element={<AuthPage/>}/>
        </Routes>

    );
}

export default App;