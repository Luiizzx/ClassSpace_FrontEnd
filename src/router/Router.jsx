import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import { Home } from "../pages/home/Home";
import { PageBuilder } from "../pageBuilder";

export function Router(){
  return(
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<CreateAccount />} path="/create-account" />
      
      <Route element={<ProtectedRoute />} >
        <Route element={<PageBuilder page={<Home />}/>} path="/" />   
      </Route>       
    </Routes>      
  )
}