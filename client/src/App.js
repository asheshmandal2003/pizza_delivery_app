import "./App.css";
import Homepage from "./components/Homepage";
import ResponsiveAppBar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Homepage />
    </div>
  );
}

export default App;
