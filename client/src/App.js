import "./App.css";
import Homepage from "./components/Homepage";
import ResponsiveAppBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/pizza" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
