import "./App.css";
import Homepage from "./components/Homepage";
import ResponsiveAppBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import VerifyEmail from "./components/verification/VerifyEmail";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <ResponsiveAppBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/auth/signup" element={<Signup setUser={setUser} />} />
        <Route path="/auth/signin" element={<Signin setUser={setUser} />} />
        <Route path="/auth/:id/verify/:token" element={<VerifyEmail />} />
        <Route path="/pizza" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
