// import React, { useState, useEffect } from "react";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import { Link } from "react-router-dom";

// //import "./../CSS/Navbar.css";
// import { IconContext } from "react-icons";
import { Button } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router";
import "./Navbar.css";

class Navbar extends Component {
  state = { clicked: false, secureMode: true };
  //mode = {secure: true};

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  onLogout = () => {
    localStorage.removeItem("username");
    
    window.location.reload();
  };

  onSecure = () => {
    console.log("secure mode: " + !this.state.secureMode);
    if (!this.state.secureMode) {
      // from unsecured to secure mode
      console.log("from unsecured to secure mode ");
      fetch("http://localhost:4040/mode/secured", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    } else {
      // from secure to unsecured
      console.log("from secure to unsecured");
      fetch("http://localhost:4040/mode/notsecured", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    }
    this.setState({ secureMode: !this.state.secureMode });
  };

  render() {
    const username = localStorage.getItem("username");
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">Comunication_LTD</h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          <Button className={this.state.secureMode?"green-status":"red-status"} size="sm" variant="danger" block onClick={this.onSecure}>
            Secure
          </Button>
          {!username ? (
            <>
               <li className="nav-links">
                <a href="/home">Home</a>
              </li>
              <li className="nav-links-login">
                <a href="/SignIn">Sign In</a>
              </li>

              <li className="nav-links-signup">
                <a href="/SignUp">Sign Up</a>
              </li>

              <li className="nav-links-signup">
                <a href="/forgetPassword">Forget Password</a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-links">
                <a href="/home">Home</a>
              </li>
              <li className="nav-links">
                <a href="/addclient">Add client</a>
              </li>
              <li className="nav-links">
                <a href="/changepassword">Change Password</a>
              </li>
              <div>
                <p> </p>
                <Button
                  size="sm"
                  variant="danger"
                  block
                  onClick={this.onLogout}
                >
                  Log Out
                </Button>
              </div>
            </>
          )}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
