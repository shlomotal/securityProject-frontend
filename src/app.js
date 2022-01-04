import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Login from "./Pages/Login/login";
import CreateUser from "./Pages/SignUp/CreateUser";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import ForgetPassword from "./Pages/ForgetPassword/forgetPassword"
import UpdatePassword from './Pages/ForgetPassword/updatePassword'
import Home from "./Pages/Home/home";

import "./App.css";
import { LogIn } from "react-ionicons";

function App() {
  const username = localStorage.getItem("username");
  console.log("debug username is: ", username);
  return (
    <Router>
      {!username ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/SignIn" element={<Login />} />
            <Route path="/SignUp" element={<CreateUser />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
          </Routes>
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            {/* <Route path="/home" element={<Home />} />  */}
            <Route path="/changePassword" element={<ChangePassword />} />
          </Routes>
        </>
      )}
    </Router>
  );
}
export default App;
