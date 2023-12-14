import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import Profile from "./components/Profile";
import Error from "./components/Error";
import { UserProvider } from "./context/UserContext";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  return (
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/articles"
            element={
              <Articles
                isError={isError}
                setIsError={setIsError}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/articles/:article_id"
            element={
              <SingleArticle
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isError={isError}
                setIsError={setIsError}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          />
          <Route path="/*" element={<Error message="route not found" />} />
        </Routes>
      </UserProvider>
  );
}

export default App;
