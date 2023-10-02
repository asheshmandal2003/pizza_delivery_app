import Homepage from "./components/Homepage";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import VerifyEmail from "./components/verification/VerifyEmail";
import Email from "./components/forgotPassword/Email";
import Otp from "./components/forgotPassword/Otp";
import ResetPassword from "./components/forgotPassword/ResetPassword";
import CreatePizza from "./components/createPizza/CreatePizza";
import Dashboard from "./components/dashboard/Dashboard";
import Orders from "./components/orders/Orders.js";
import { useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((state) => state.user));
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route
          path="/auth/signin"
          element={!isAuth ? <Signin /> : <Navigate to="/pizza" />}
        />
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
          element={isAuth ? <Homepage /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/pizza/create"
          element={isAuth ? <CreatePizza /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/pizza/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/pizza/orders"
          element={isAuth ? <Orders /> : <Navigate to="/auth/signin" />}
        />
      </Routes>
    </div>
  );
}

export default App;
