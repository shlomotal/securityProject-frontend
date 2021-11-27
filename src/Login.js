import React, { useState } from "react";
import Modal from "./Modal";
import { Form, Button } from "react-bootstrap";
import "./css/login.css";
import { LockClosedOutline, PersonOutline } from "react-ionicons";

async function loginUser(credentials) {
  return fetch("http://localhost:4040/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [errorPassword, setErrorPassword] = useState();
  const [errorUsername, setErrorUsername] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState();

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (event.target.value.length < 10)
      setErrorPassword("Password must be at least 10 characters long!");
    else {
      setErrorPassword("");
    }
    setPassword(event.target.value);
  };

  const handleChangeUsername = async (event) => {
    event.preventDefault();
    if (event.target.value.length < 3)
      setErrorUsername("Username must be at least 3 characters long!");
    else {
      setErrorUsername("");
    }
    setUsername(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("username: " + username, +" password: " + password);
    if (errorPassword || errorUsername) {
      setText("You can't submit!");
      setUsername("");
      setPassword("");
      setErrorUsername("");
      setErrorPassword("");
      setIsOpen(true);
    } else {
      const token = await loginUser({
        username: username.toLowerCase(),
        password: password,
      });
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username); //saving the username for getting user information - hello message , checking role

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
          timeZone: "Asia/Jerusalem",
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

        // fetch(
        //   "https://mekorot-api.pblm.tech/api/user/updateLogin/" +
        //     username +
        //     "/" +
        //     encodeURIComponent(thedate, "UTF-8"),
        //   {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Accept: "application/json",
        //     },
        //   }
        // ).then(async (res) => {
        //   if (res.ok) {
        //     const data = await res.json();
        //   }
        // });

        window.location.reload();
      } else {
        setText("You entered wrong credentials");
        setUsername("");
        setPassword("");
        setErrorUsername("");
        setErrorPassword("");
        setIsOpen(true);
      }
    }
  };

  return (
    <Form className="loginScreen" onSubmit={handleSubmit}>
      <div className="loginScreen">
        <Modal text={text} open={isOpen} onclose={() => setIsOpen(false)} />
        <div className="Login">
          <h1>Login</h1>
        </div>

        <Form.Group className="UserName" controlId="formEmail">
          <Form.Label className="Username">
            <PersonOutline color={"#00000"} className="userPerson" />
                Username
          </Form.Label>

          <Form.Control
            className="userInput"
            type="text"
            placeholder="Enter Username"
            value={username}
            required
            onChange={handleChangeUsername}
          />

          {errorUsername && <Form.Text>{errorUsername}</Form.Text>}
        </Form.Group>

        <Form.Group className="md-3  pass" controlId="formPassword">
          <Form.Label className="pass">
            <LockClosedOutline
              color={"#00000"}
              className="lock-closed-outline"
            />
            Password
          </Form.Label>
          <Form.Control
            className="passInput"
            type="password"
            placeholder="··········"
            value={password}
            required
            onChange={handleChangePassword}
          />

          {errorPassword && <Form.Text>{errorPassword}</Form.Text>}
        </Form.Group>
        <Button
          className="submit"
          size="sm"
          variant="light"
          block
          type="submit"
        >
          {" "}
          Submit{" "}
        </Button>
      </div>
    </Form>
  );
}
