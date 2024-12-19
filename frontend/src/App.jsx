import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./components/About";


function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
