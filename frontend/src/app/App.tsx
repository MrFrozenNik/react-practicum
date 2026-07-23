import {Route, Routes} from "react-router-dom";
import {MainLayout} from "@/app/layouts/main-layout";
import {ProtectedRoute} from "@/app/routes";
import {AuthPage} from "@/pages/auth-page";
import {ProfilePage} from "@/pages/profile-page";
import {HomePage} from "@/pages/home-page";
import {ProductPage} from "@/pages/product-page/ui/ProductPage.tsx";
import {useUser} from "@/entities/user";
import {LoadingPlaceholder} from "@/shared/ui/loading-placeholder";

function App() {
    const {isLoading} = useUser();

    if (isLoading) return <LoadingPlaceholder/>;

    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route index path="/" element={<HomePage />}/>
                <Route path="/products/:id" element={<ProductPage/>} />
                <Route element={<ProtectedRoute/>}>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Route>
            </Route>
            <Route path="/auth" element={<AuthPage/>}/>
        </Routes>

    );
}

export default App;