import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { NotFound } from "./screens/NotFound";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
