import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const Setup2FA = lazy(() => import("./pages/Setup2FA"));
const Verify2FA = lazy(() => import("./pages/Verify2FA"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <Error />,
      },
      {
        path: "/setup-2fa",
        element: <Setup2FA />,
        errorElement: <Error />,
      },
      {
        path: "/verify-2fa",
        element: <LoginPage />,
        errorElement: <Verify2FA />,
      },
    ],
  },
]);

export default router;
