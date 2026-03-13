import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import { PageBuilder } from './pageBuilder'
import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login';

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Routes>
      <Route 
        element={<PageBuilder isLogged={isLogged} page={Home}/>} 
        path="/" />
        
      <Route 
        element={<Login setIsLogged={setIsLogged} />} 
        path="/login" />
    </Routes>    
  )
}

