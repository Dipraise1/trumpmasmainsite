import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Socials from "./components/Socials";
import SpinWheel from "./components/SpinWheel";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Snow } from "./components/Snow";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-red-800 to-green-900">
        <Canvas className="fixed top-0 left-0 w-full h-full pointer-events-none">
          <Snow />
        </Canvas>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spin" element={<SpinWheel />} />
          <Route path="/about" element={<About />} />
          <Route path="/socials" element={<Socials />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
