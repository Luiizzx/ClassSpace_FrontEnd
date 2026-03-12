import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import { PageBuilder } from './pageBuilder'
import { Home } from './pages/Home'

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Routes>
      <Route element={<PageBuilder page={Home}/>} path="/" />
    </Routes>    
  )
}

