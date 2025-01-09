import { useState } from "react";
import { AuthForm } from "../components/auth/AuthForm";
import { useNotification } from "../context/NotificationProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../state/auth";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(() => true);
  const [loading, setLoading] = useState(() => false);
  const dispatch = useDispatch();
  const notify = useNotification();
  const navigate = useNavigate();

  const signIn = async (values) => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/signin`, values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        dispatch(login({ user: res.data.user, token: res.data.token }));
        notify(res.data.message, "success");
        navigate("/pizza");
      })
      .catch((err) => {
        notify(err.response.data.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signUp = async (values) => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        notify(res.data.message, "success");
        navigate("/auth/blank");
      })
      .catch((err) => {
        notify(err.response.data.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AuthForm
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        handleSubmit={isLogin ? signIn : signUp}
        loading={loading}
      />
    </div>
  );
}
