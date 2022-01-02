import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Login from './Pages/Login/login';
import CreateUser from "./Pages/SignUp/CreateUser";
import Home from "./Pages/Home/home";

import "./App.css";
import { LogIn } from "react-ionicons";


function App() {
  const username = localStorage.getItem("username");
  return (
    <Router>
      {!username ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/SignIn" element={<Login />} />
            <Route path="/SignUp" element={<CreateUser />} />
          </Routes>
        </>
      ) : (
          <>
            <Navbar />
          {/* <Route path="/home" element={<Home />} />  */}
          </>
      )}
    </Router>
  );
}
export default App;
