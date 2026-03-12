import './App.css'
import { Route, Routes } from 'react-router-dom'
import { PageBuilder } from './pageBuilder'

function App() {
  return (
    <Routes>
      <Route element={<PageBuilder />} path="/">

      </Route>
    </Routes>    
  )
}

export default App
