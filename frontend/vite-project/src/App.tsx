import {BrowserRouter,Routes,Route}  from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute" ;
import UsersPage from "./pages/UsersPage";
import ProjectsPage from "./pages/ProjectPages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget the CSS!




function App(){
  return(
    <BrowserRouter>
    <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        theme="colored" 
      />
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>
      <Route path="/users" element={
        <ProtectedRoute>
          <AdminRoute>
            <UsersPage/>
          </AdminRoute>
        </ProtectedRoute>
      } />

      <Route path="/projects" element={<ProtectedRoute>
        <ProjectsPage/>
      </ProtectedRoute>} />
      <Route path="/register" element={<Register/>}/>
    </Routes>
    
    </BrowserRouter>



  )
}


export default App;