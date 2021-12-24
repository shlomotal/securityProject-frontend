import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login/login';
import SignUp from './Pages/SignUp/CreateUser';
//import UsersTable from "./UsersTable";
//import UsersTable from "./ChangePassword";
//import "./CSS/App.css";

const navEl = document.getElementById("nav");

document.addEventListener("click", (e) => {
  if (e.target === navEl) {
    navEl?.classList?.remove("active");
  }
});

function App() {
  // const token = localStorage.getItem("token");

  // const email = localStorage.getItem("email");
  // const [currentUser, setCurrentUser] = useState();

  //   useEffect(() => {
  //     fetch("https://mekorot-api.pblm.tech/api/user/me/" + email?.toLowerCase(), {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     }).then(async (res) => {
  //       if (res.ok) {
  //         const data = await res.json();
  //         setCurrentUser(data);
  //       }
  //     });

  let date = Date.now();
  var formatter = new Intl.DateTimeFormat("en-us", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 3,
    hour12: true,
    timeZone: "UTC",
  });
  let dateSecondUpdated = formatter.formatToParts(date);
  var thedate =
    dateSecondUpdated[6].value +
    "-" +
    dateSecondUpdated[2].value +
    "-" +
    dateSecondUpdated[4].value +
    ", " +
    dateSecondUpdated[8].value +
    ":" +
    dateSecondUpdated[10].value +
    " " +
    dateSecondUpdated[16].value;
  console.log("debug the date = ", thedate);
  console.log("debug date params = ", dateSecondUpdated);

  return (
    <>
      <Router>
        {/* {username ? (
          <>
            <Navbar />
            <Routes>
              <Route exact path="/UsersTable" component={UsersTable} />
              <Route exact path="/ChangePassword" component={ChangePassword} />
            </Routes>
          </>
        ) : ( */}
          <>
            <Navbar />
            <Routes>
              <Route exact path="/Pages/Login" component={Login} />
              <Route exact path="/Pages/SignUp" component={SignUp} />
            </Routes>
          </>
        {/* )} */}
        )
      </Router>
    </>
  );
}

export default App;
