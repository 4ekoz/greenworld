import React, { useMemo } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ إضافة GoogleOAuthProvider

import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword";
import VerifyCode from "./Components/Verifycode/Verifycode";
import Resetpassword from "./Components/Resetpassword/Resetpassword";
import VerifyEmail from "./Components/VerifyEmail/VerifyEmail";
import Map from "./Components/Map/Map";
import Myplant from "./Components/Myplant/Myplant";
import Profile from "./Components/Profile/Profile";
import Notfound from "./Components/Notfound/Notfound";
import Favourites from "./Components/Favourites/Favourites";
import ProtectedRoute from "./Components/Protectroute/Protectroute";

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
          { index: true, element: <ProtectedRoute element={<Home />} /> },
          { path: "Home", element: <ProtectedRoute element={<Home />} /> },
          { path: "myplant", element: <ProtectedRoute element={<Myplant />} /> },
          { path: "cart", element: <ProtectedRoute element={<Cart />} /> },
          { path: "profile", element: <ProtectedRoute element={<Profile />} /> },
          { path: "favourites", element: <ProtectedRoute element={<Favourites />} /> },
          { path: "map", element: <Map /> },
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "forgot-password", element: <Forgotpassword /> },
          { path: "resetpassword", element: <Resetpassword /> },
          { path: "verify-email/:token", element: <VerifyEmail /> },
          { path: "verifycode", element: <VerifyCode /> },
          { path: "*", element: <Notfound /> },
        ],
      },
    ]);
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={routes} />
    </GoogleOAuthProvider>
  );
}

export default App;
