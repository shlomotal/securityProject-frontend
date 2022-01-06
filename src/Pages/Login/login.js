import React, { useState } from "react";
import Modal from "../../Modal";
import { Form, Button } from "react-bootstrap";
import "./login-form.css";
import { LockClosedOutline, PersonOutline } from "react-ionicons";
import { Navigate } from "react-router-dom";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const IconLabel = ({ iconElement, label }) => (
  <Form.Label className="red">
    {iconElement} {label}
  </Form.Label>
);

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
  const [userEmail, setEmail] = useState();
  const [password, setPassword] = useState();

  const [errorPassword, setErrorPassword] = useState();
  const [errorEmail, setErrorEmail] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState();

  const handleChangePassword = async (event) => {
    event.preventDefault();
    // if (event.target.value.length < 10)
    //   setErrorPassword("Password must be at least 10 characters long!");
    // else {
      setErrorPassword("");
   // }
    setPassword(event.target.value);
    console.log("password: ",password)
  };

  const handleChangeEmail = async (event) => {
    event.preventDefault();
    if (!validEmailRegex.test(event.target.value))
      setErrorEmail("Email is not valid");
    else {
      setErrorEmail("");
    }
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email: " + userEmail);
    console.log("Password: ",password);
    if (errorPassword || errorEmail) {
      setText("You can't submit!");
      setEmail("");
      setPassword("");
      setErrorEmail("");
      setErrorPassword("");
      setIsOpen(true);
    } else {
      const token = await loginUser({
        username: userEmail.toLowerCase(),
        password: password,
      });
      if (token) {
        //localStorage.setItem("token", token);
        localStorage.setItem("username", userEmail); //saving the username

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

       window.location.reload();
        // return token?<Navigate to="/"/>:window.location.reload();
      } else {
        setText("You entered wrong credentials");
        setEmail("");
        setPassword("");
        setErrorEmail("");
        setErrorPassword("");
        setIsOpen(true);
      }
    }
  };

  return (
    <Form className="login-form-main" onSubmit={handleSubmit}>
      <Modal text={text} open={isOpen} onclose={() => setIsOpen(false)} />
      <h1 className="login-title">Login</h1>

      <Form.Group className="login-form-group" controlId="formEmail">
        <IconLabel
          iconElement={<PersonOutline color="#00000" />}
          label="Email"
        />

        <Form.Control
          className="input"
          type="text"
          placeholder="Enter Email"
          value={userEmail}
          required
          onChange={handleChangeEmail}
        />

        {errorEmail && <Form.Text>{errorEmail}</Form.Text>}
      </Form.Group>

      <Form.Group className="login-form-group" controlId="formPassword">
        <IconLabel
          iconElement={<LockClosedOutline color="#00000" />}
          label="Password"
        />
        <Form.Control
          type="password"
          placeholder="··········"
          value={password}
          required
          onChange={handleChangePassword}
        />

        {errorPassword && <Form.Text>{errorPassword}</Form.Text>}
      </Form.Group>
      <Button className="submit" size="sm" variant="light" block type="submit">
        Submit
      </Button>
    </Form>
  );
}
