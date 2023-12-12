import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import Profile from "./components/Profile";
import { UserProvider } from "./context/UserContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <UserProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/articles"
          element={
            <Articles isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
        <Route
          path="/articles/:article_id"
          element={
            <SingleArticle isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile isLoading={isLoading} setIsLoading={setIsLoading} />
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
