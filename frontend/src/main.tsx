import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from '@/app/App.tsx'
import {UserProvider} from "@/entities/user";
import '@/shared/styles/index.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <UserProvider>
        <App/>
      </UserProvider>
    </StrictMode>,
)
