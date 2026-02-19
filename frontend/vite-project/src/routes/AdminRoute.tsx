import { type ReactNode } from "react"; 
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  // We cast to JSX or wrap in fragment to ensure the return type is happy
  return <>{children}</>; 
};

export default AdminRoute;