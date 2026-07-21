import {Outlet} from "react-router-dom";
import {Header} from "@/widgets/header";

export const MainLayout = () => {

    return <>
        <Header/>
        <main>
            <Outlet/>
        </main>
    </>
}