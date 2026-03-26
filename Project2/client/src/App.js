import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import EditorPage from "./EditorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:id" element={<EditorPage />} />
    </Routes>
  );
}

export default App;