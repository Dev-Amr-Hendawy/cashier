import { useSelector } from "react-redux";
import { RootState } from "../lib";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedByPayment = () => {
  const state = useSelector((state: RootState) => state.user);
  if (
    state.isAuthenticated &&
    state.user?.paymentStatus === 1 &&
    state.user?.subscription?.expire !== 1 // 1-is expired
  )
    return <Outlet />;
  return <Navigate to="/supscription-payment" />;
};
