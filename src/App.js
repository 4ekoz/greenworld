import React, { useMemo } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword";
import VerifyCode from "./Components/Verifycode/Verifycode";
import Resetpassword from "./Components/Resetpassword/Resetpassword";
import VerifyEmail from "./Components/VerifyEmail/VerifyEmail";
import Profile from "./Components/Profile/Profile";
import Notfound from "./Components/Notfound/Notfound";
import ProtectedRoute from "./Components/Protectroute/Protectroute";
import Dashboard from "./Components/Dashboard/Dashboard";
import SoilWater from "./Components/SoilWater/SoilWater";
import Weather from "./Components/Weather/Weather";
import HelpSupport from "./Components/HelpSupport/HelpSupport";

// 🔑 معرف العميل من Google Cloud Console
const clientId = "216879394932-cg3plgmhph894rsls1ruarb4r4uh47dp.apps.googleusercontent.com";

function App() {
  // 🛤️ تعريف المسارات باستخدام useMemo لتثبيت الـ Router
  const routes = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "forgot-password", element: <Forgotpassword /> },
          { path: "resetpassword", element: <Resetpassword /> },
          { path: "verify-email/:token", element: <VerifyEmail /> },
          { path: "verifycode", element: <VerifyCode /> },
          {
            path: "/",
            element: <ProtectedRoute element={<Dashboard />} />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "dashboard", element: <Dashboard /> },
              { path: "soil-water", element: <SoilWater /> },
              { path: "weather", element: <Weather /> },
              { path: "help-support", element: <HelpSupport /> },
              { path: "settings", element: <Profile /> }
            ]
          },
          { path: "*", element: <Notfound /> }
        ]
      }
    ]);
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={routes} />
    </GoogleOAuthProvider>
  );
}

export default App;
