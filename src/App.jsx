import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Articles from "./components/Articles";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/articles"
          element={
            <Articles isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
