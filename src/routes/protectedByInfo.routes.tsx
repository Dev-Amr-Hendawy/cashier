import { useSelector } from "react-redux";
import { RootState } from "../lib";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedByInfo = () => {
  const state = useSelector((state: RootState) => state.user);

  if (state.isAuthenticated && state.user?.isCompleteAccountInfo === 1)
    return <Outlet />;
  if (state.isAuthenticated && state.user?.paymentStatus === 0)
    return <Navigate to="/sign-up" />;
  return <Navigate to="/complete-system-info" />;
};
