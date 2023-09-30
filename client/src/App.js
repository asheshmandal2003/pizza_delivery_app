import "./App.css";
import Homepage from "./components/Homepage";
import ResponsiveAppBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import VerifyEmail from "./components/verification/VerifyEmail";
import Email from "./components/forgotPassword/Email";
import Otp from "./components/forgotPassword/Otp";
import ResetPassword from "./components/forgotPassword/ResetPassword";
import CreatePizza from "./components/createPizza/CreatePizza";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App" style={{ height: "100%" }}>
      <ResponsiveAppBar user={user} setUser={setUser} />
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
        <Route path="/pizza" element={<Homepage />} />
        <Route path="/pizza/create" element={<CreatePizza />} />
        <Route path="/pizza/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
