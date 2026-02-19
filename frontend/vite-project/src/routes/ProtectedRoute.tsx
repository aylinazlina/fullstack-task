import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {type RootState } from "../app/store";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  console.log("TOKEN:", token);


  return <>{children}</>;
};

export default ProtectedRoute;
