import "./App.css";
import Homepage from "./components/Homepage";
import ResponsiveAppBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <ResponsiveAppBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/auth" element={<Signup setUser={setUser} />} />
        <Route path="/pizza" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
