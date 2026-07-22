import {Route, Routes} from "react-router-dom";
import {MainLayout} from "@/app/layouts/main-layout";
import {AuthPage} from "@/pages/auth-page";
import {ProfilePage} from "@/pages/profile-page";
import {LoadingPlaceholder} from "@/widgets/loading-placeholder";
import {useUser} from "@/entities/user";
import {Dropdown} from "@/shared/ui";

function App() {
    const {user, isLoading, isAuthenticated} = useUser();

    if (isLoading) return <LoadingPlaceholder/>;

    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route index path="/" element={<>
                    {isAuthenticated && <p>Привет, {user?.name}</p>}
                    123

                    <Dropdown kind="outlined" status="primary">
                        <Dropdown.Trigger>Действия</Dropdown.Trigger>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => {
                            }}>Профиль</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
            </Route>
            <Route path="/auth" element={<AuthPage/>}/>
        </Routes>

    );
}

export default App;