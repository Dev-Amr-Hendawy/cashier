import { useSelector } from "react-redux";
import { RootState } from "../lib";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const state = useSelector((state: RootState) => state.user);
  if (state.isAuthenticated && state?.user?.status === 1) return <Outlet />;
  else {
    return <Navigate to="/login" />;
  }
};
