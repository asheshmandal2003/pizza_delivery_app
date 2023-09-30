import "./App.css";
import Homepage from "./components/Homepage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import VerifyEmail from "./components/verification/VerifyEmail";
import Email from "./components/forgotPassword/Email";
import Otp from "./components/forgotPassword/Otp";
import ResetPassword from "./components/forgotPassword/ResetPassword";
import CreatePizza from "./components/createPizza/CreatePizza";
import Dashboard from "./components/dashboard/Dashboard";
import Orders from "./components/orders/Orders.js";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/signup" element={<Signup setUser={setUser} />} />
        <Route path="/auth/signin" element={<Signin setUser={setUser} />} />
        <Route path="/auth/:id/verify/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<Email />} />
        <Route path="/forgot-password/users/:id" element={<Otp />} />
        <Route
          path="/forgot-password/users/:id/reset-password"
          element={<ResetPassword />}
        />
        <Route path="/" element={<Navigate to="/auth/signin" />} />
        <Route
          path="/pizza"
          element={
            user ? (
              <Homepage user={user} setUser={setUser} />
            ) : (
              <Navigate to="/auth/signin" />
            )
          }
        />
        <Route
          path="/pizza/create"
          element={user ? <CreatePizza /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/pizza/dashboard"
          element={
            user ? (
              <Dashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/auth/signin" />
            )
          }
        />
        <Route
          path="/pizza/orders"
          element={
            user ? <Orders user={user} /> : <Navigate to="/auth/signin" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
