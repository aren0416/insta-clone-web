import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { NotFound } from "./screens/NotFound";

function App() {
  const isLoggedIn = true;
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
