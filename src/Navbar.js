import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
//import "./../CSS/Navbar.css";
import { IconContext } from "react-icons";
import { Button } from "react-bootstrap";
//import logo from "./../images/mek-logo.jpg";

function Navbar() {
  const [currentUser, setCurrentUser] = useState();

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // const onLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("email");
  //   window.location.reload();
  // };

  // const email = localStorage.getItem("email");

  // useEffect(() => {
  //   fetch("https://mekorot-api.pblm.tech/api/user/me/" + email?.toLowerCase(), {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   }).then(async (res) => {
  //     if (res.ok) {
  //       const data = await res.json();
  //       setCurrentUser(data);
  //     }
  //   });
  // }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          {/* <img src={logo} width="200" height="80" className="logo" /> */}
          <label className="hello">
            Hello{" "}
            {/* {currentUser && currentUser.UserData
              ? currentUser.UserData.name
              : null}{" "} */}
          </label>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>

        <div>
          <nav id="nav" className={sidebar ? "nav-menu active" : "nav-menu"}>
            {/* <nav className='nav-menu active'> */}
            <ul className="nav-menu-items" onClick={showSidebar}>
              {/* <ul className='nav-menu-items'> */}

              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <>
                    {!currentUser ? (
                      item.title == "Login" || item.title == "Sign Up" ? (
                        <>
                          <li key={index} className={item.cName}>
                            <Link to={item.path}>
                              {item.icon}
                              <span>{item.title}</span>
                            </Link>
                          </li>
                        </>
                      ) : null
                    ) : currentUser ? (
                      item.title == "Change Password" ||
                      item.title == "Users Table" ? (
                        <>
                          <li key={index} className={item.cName}>
                            <Link to={item.path}>
                              {item.icon}
                              <span>{item.title}</span>
                            </Link>
                          </li>
                        </>
                      ) : null
                    ) : null}
                  </>
                );
              })}
              <div>
                <p> </p>
                <Button
                  size="sm"
                  variant="danger"
                  block
                  //onClick={onLogout}
                >
                  Log Out
                </Button>
              </div>
            </ul>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
}
export default Navbar;
