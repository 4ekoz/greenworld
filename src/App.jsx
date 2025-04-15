import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Background from "./Components/Background/Background";

// Importing components
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword";
import VerifyCode from "./Components/Verifycode/Verifycode";
import Resetpassword from "./Components/Resetpassword/Resetpassword";
import VerifyEmail from "./Components/VerifyEmail/VerifyEmail";
import Notfound from "./Components/Notfound/Notfound";
import ProtectedRoute from "./Components/Protectroute/Protectroute";
import Dashboard from "./Components/Dashboard/Dashboard";
import Settings from './Components/Settings/Settings';
import PlantPage from './Components/plant/plant';
import AddPlant from "./Components/Add-plant/Add-plant";

const clientId = "216879394932-cg3plgmhph894rsls1ruarb4r4uh47dp.apps.googleusercontent.com";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            // Public routes
            { index: true, element: <Login /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "forgot-password", element: <Forgotpassword /> },
            { path: "verifycode", element: <VerifyCode /> },
            { path: "resetpassword", element: <Resetpassword /> },
            { path: "verify-email", element: <VerifyEmail /> },

            // Protected routes
            {
                path: "dashboard",
                element: <Layout />,
                children: [
                    { index: true, element: <ProtectedRoute element={<Dashboard />} /> },
                    { path: "settings", element: <ProtectedRoute element={<Settings />} /> },
                    { path: "plant", element: <ProtectedRoute element={<PlantPage />} /> },
                    { path: "add-plant", element: <ProtectedRoute element={<AddPlant />} /> },
                ]
            },
        ]
    },
    { path: "*", element: <Notfound /> }
]);

function App() {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Background />
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    );
}

export default App; 