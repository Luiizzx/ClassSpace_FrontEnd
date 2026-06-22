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

export function Router(){
  return(
    <Routes>
      <Route     element={<Login />}           path="/login" />
      <Route     element={<CreateAccount />}   path="/criar-conta" />
      
      <Route     element={<ProtectedRoute />} >
        <Route   element={<PageBuilder />} >

          <Route element={<Home />}            path="/" />   
          <Route element={<Participants />}    path="/participants/:classId" />

          <Route element={<PostsList />}       path="/posts/:classId"   />
          <Route element={<Post />}            path="/post/:classId/:postId" />

          <Route element={<AssignmentsList />} path="/assignments/:classId"/>
          <Route element={<Assignment />}      path="/assignment/:classId/:assignmentId" />
        </Route>
      </Route>       
    </Routes>      
  )
}