import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import { Home } from "../pages/home/Home";
import { PageBuilder } from "../pageBuilder";
import { CreateAccount } from "../pages/createAccount/CreateAccount";
import { Login } from "../pages/login/Login";
import { Participants } from "../pages/participants/Participants";
import { PostsList } from "../pages/posts/PostsList";
import { Post } from "../pages/posts/Post";
import { AssignmentsList } from "../pages/assignments/AssignmentsList";
import { Assignment } from "../pages/assignments/Assignment";
import { Deliveries } from "../pages/deliveries/Deliveries";
import { ForgotPassword } from "../pages/forgotPassword/ForgotPassword";
import { ResetPassword } from "../pages/resetPassword/ResetPassword";
import { Statistics } from "../pages/statistics/Statistics";

export function Router(){
  return(
    <Routes>
      <Route     element={<Login />}           path="/login" />
      <Route     element={<CreateAccount />}   path="/criar-conta" />

      <Route     element={<ForgotPassword />}  path="/forgot-password" />
      <Route     element={<ResetPassword />}   path="/reset-password"/>
      
      <Route     element={<ProtectedRoute />} >
        <Route   element={<PageBuilder />} >

          <Route element={<Home />}            path="/" />   
          <Route element={<Participants />}    path="/participants/:classId" />

          <Route element={<PostsList />}       path="/posts/:classId" />
          <Route element={<Post />}            path="/post/:classId/:postId" />

          <Route element={<AssignmentsList />} path="/assignments/:classId"/>
          <Route element={<Assignment />}      path="/assignment/:classId/:assignmentId" />

          <Route element={<Deliveries />}      path="/deliveries/:classId/:assignmentId" />

          <Route element={<Statistics />}      path="/stats/:classId" />
        </Route>
      </Route>       
    </Routes>      
  )
}