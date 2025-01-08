import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import { useEffect, useState, Suspense } from "react";
import Loading from "./components/Loading/Loading";
import { NotificationProvider } from "./context/NotificationProvider";
import ResponsiveAppBar from "./components/partials/Navbar";

const Homepage = React.lazy(() => import("./components/home/Homepage"));
const VerifyEmail = React.lazy(() =>
  import("./components/verification/VerifyEmail")
);
const Email = React.lazy(() => import("./components/forgotPassword/Email"));
const ResetPassword = React.lazy(() =>
  import("./components/forgotPassword/ResetPassword")
);
const CreatePizza = React.lazy(() =>
  import("./components/createPizza/CreatePizza")
);
const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));
const Orders = React.lazy(() => import("./components/orders/Orders"));
const Profile = React.lazy(() => import("./components/profile/Profile"));
const Blank = React.lazy(() => import("./components/verification/Blank"));
const NotFound = React.lazy(() => import("./components/Error/NotFound"));
const Auth = React.lazy(() => import("./pages/Auth"));

const ProtectedRoute = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/auth" />;
};

function App() {
  const [loading, setLoading] = useState(true);
  const isAuth = Boolean(useSelector((state) => state.user));
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NotificationProvider>
        {loading ? (
          <Loading />
        ) : (
          <Suspense fallback={<Loading />}>
            <ResponsiveAppBar />
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
              <Route
                path="/auth/users/:id/verify/:token"
                element={<VerifyEmail />}
              />
              <Route path="/auth/email" element={<Email />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/pizza" element={<Homepage />} />
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
          </Suspense>
        )}
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
