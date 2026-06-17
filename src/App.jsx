import { Route, Routes } from 'react-router-dom'
import { PageBuilder } from './pageBuilder'
import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login';
import { CreateAccount } from './pages/createAccount/CreateAccount';
import { AuthProvider } from './features/auth/authProvider';
import { Router } from './router/Router';
import { Toaster } from 'react-hot-toast';

export default function App() {  
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={ { duration: 3000 } }
      />
      
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  )
}

