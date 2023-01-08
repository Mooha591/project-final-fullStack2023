import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../src/Pages/Home";
import Register from "../src/Pages/Register";
import Login from "../src/Pages/Login";
import Navbar from "../src/components/Navbar";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Add from "./Pages/Add";

const App = () => {
  const [auth, setAuth] = useState(
    JSON.parse(window.localStorage.getItem("user")) || ""
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const handleDarkMode = () => {
    // toggle dark mode
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // disparaite le bouton login quand on se login et affiche le bouton logout et le nom de l'utilisateur connecté
  const [authButton, setAuthButton] = useState(false);
  const AuthButton = () => {
    setAuthButton(true);
  };

  return (
    <BrowserRouter>
      {/* nav en entête */}
      <Navbar auth={auth} />
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <button onClick={handleDarkMode} className="dark-mode__toggle">
          {darkMode ? "Light Mode" : "Dark Mode"}
          {darkMode ? "🌞" : "🌚"}
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setAuth={setAuth} AuthButton={AuthButton} />}
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute auth={auth}>
                <Add auth={auth} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute auth={auth}>
                {/* <Dashboard auth={auth} /> */}
              </ProtectedRoute>
            }
          />
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
