import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import NavbarM from "./components/Navbar/NavbarM/NavbarM";
import "./App.css";

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <NavbarM />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Other routes can be added here */}
        </Routes>
      </>
    </Router>
  );
};

export default App;
