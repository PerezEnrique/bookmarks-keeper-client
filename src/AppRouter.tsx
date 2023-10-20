import React from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRouteWrapper from "./components/ProtectedRouteWrapper";
import AuthenticationRouteWrapper from "./components/AuthenticationRouteWrapper";

export default function AppRouter() {
  const router = createBrowserRouter([
    {path: "/", element: <Navigate to="/home" />, errorElement: <NotFoundPage />},
    {
      element: <ProtectedRouteWrapper />,
      children: [
        { path: "home", element: <HomePage /> },
        { path: "log-out", element: <LogoutPage /> },
        { path: "profile", element: <ProfilePage /> },
      ],
    },
    {
      element: <AuthenticationRouteWrapper />,
      children: [
        { path: "log-in", element: <LoginPage /> },
        { path: "sign-up", element: <SignupPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
