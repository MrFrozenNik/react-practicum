import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from '@/app/App.tsx'
import {UserProvider} from "@/entities/user";
import '@/shared/styles/index.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <UserProvider>
                <App/>
            </UserProvider>
        </BrowserRouter>
    </StrictMode>,
)
