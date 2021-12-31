// import React, { useState, useEffect } from "react";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import { Link } from "react-router-dom";

// //import "./../CSS/Navbar.css";
// import { IconContext } from "react-icons";
// import { Button } from "react-bootstrap";
import React, { Component } from 'react';
import {Link} from "react-router";
import './Navbar.css'

class Navbar extends Component {
  state = { clicked: false };

  handleClick=()=>{
    this.setState({clicked:!this.state.clicked})
  }

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">Comunication_LTD</h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-links">
          <a href="/home">Home</a>
          </li>

          <li className="nav-links">
            <a href="/changepassword">Change Password</a>
          </li>

          <li className="nav-links-login"> 
            <a href="/SignIn">Sign In</a>
          </li>

          <li className="nav-links-signup">
            <a href="/SignUp">Sign Up</a>
          </li>
        </ul>
      </nav>
    );
  }
}


// function Navbar() {

// }

export default Navbar;
