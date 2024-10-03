import { ErrorBoundaryRoute } from "@myCash/common";
import { Outlet, Route, Routes, RoutesProps } from "react-router-dom";

const ErrorBoundaryRoutes = ({ children }: RoutesProps) => {
  return (
    <Routes>
      <Route
        element={
          <ErrorBoundaryRoute>
            <Outlet />
          </ErrorBoundaryRoute>
        }
      >
        {children}
      </Route>
    </Routes>
  );
};

export default ErrorBoundaryRoutes;
