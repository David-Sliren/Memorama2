import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import "./App.css";
import Home from "./assets/pages/Home";
import Game from "./assets/pages/Game";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter basename="/Memorama2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
