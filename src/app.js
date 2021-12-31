import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Login from './Pages/Login/login';
import CreateUser from "./Pages/SignUp/CreateUser";
import "./App.css";
import { LogIn } from "react-ionicons";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/SignIn" element={<Login />} />
        <Route path="/SignUp" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}
export default App;
