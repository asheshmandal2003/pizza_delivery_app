import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./components/home/Homepage";
import VerifyEmail from "./components/verification/VerifyEmail";
import Email from "./components/forgotPassword/Email";
import ResetPassword from "./components/forgotPassword/ResetPassword";
import CreatePizza from "./components/createPizza/CreatePizza";
import Dashboard from "./components/dashboard/Dashboard";
import Orders from "./components/orders/Orders";
import Profile from "./components/profile/Profile";
import Blank from "./components/verification/Blank";
import NotFound from "./components/Error/NotFound";
import { NotificationProvider } from "./context/NotificationProvider";
import Auth from "./pages/Auth";

const ProtectedRoute = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/auth" />;
};

function App() {
  const isAuth = Boolean(useSelector((state) => state.user));

  return (
    <NotificationProvider>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuth ? "/pizza" : "/auth"} />}
        />
        <Route
          path="/auth"
          element={!isAuth ? <Auth /> : <Navigate to="/pizza" />}
        />
        <Route path="/auth/blank" element={<Blank />} />
        <Route path="/auth/users/:id/verify/:token" element={<VerifyEmail />} />
        <Route path="/auth/email" element={<Email />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/pizza"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pizza/create"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <CreatePizza />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pizza/dashboard"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pizza/orders"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pizza/user"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </NotificationProvider>
  );
}

export default App;
