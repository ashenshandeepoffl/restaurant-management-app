import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./components/About";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;