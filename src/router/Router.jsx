import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import { Home } from "../pages/home/Home";
import { PageBuilder } from "../pageBuilder";
import { CreateAccount } from "../pages/createAccount/CreateAccount";
import { Login } from "../pages/login/Login";
import { Participants } from "../pages/participants/Participants";

export function Router(){
  return(
    <Routes>
      <Route element={ <Login /> } path="/login" />
      <Route element={ <CreateAccount /> } path="/criar-conta" />
      
      <Route element={ <ProtectedRoute /> } >
        <Route element={ <PageBuilder />}>
          <Route element={ <Home /> } path="/" />   
          <Route element={ <Participants /> } path="/participants/:classId" />
        </Route>
      </Route>       
    </Routes>      
  )
}