import React, { useState } from "react";
import Modal from "../../Modal";
import { Form, Button } from "react-bootstrap";
// import "./login-form.css";
import { LockClosedOutline, PersonOutline } from "react-ionicons";

import UpdatePassword from "./updatePassword";
import { Navigate, useNavigate } from "react-router-dom";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const IconLabel = ({ iconElement, label }) => (
  <Form.Label className="red">
    {iconElement} {label}
  </Form.Label>
);

async function forgetPassword(credentials) {
  return fetch("http://localhost:4040/users/reset-password-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return false;
    }
  });
}

export default function ForgetPassword() {
  const history = useNavigate();
  const [userEmail, setEmail] = useState();

  const [errorEmail, setErrorEmail] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState();

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
    if (errorEmail) {
      setText("You can't submit!");
      setEmail("");
      setErrorEmail("");
      setIsOpen(true);
    } else {
      const forgetPasswordResponse = await forgetPassword({
        username: userEmail.toLowerCase(),
      });
      if (!forgetPasswordResponse) {
        setText("You entered incorrect email address");
        setEmail("");
        setErrorEmail("");
        setIsOpen(true);
      } else {
        console.log("debug success")(
          // good email .....
          history("/updatePassword")
        );
      }
    }
  };

  return (
    <Form className="login-form-main" onSubmit={handleSubmit}>
      <Modal text={text} open={isOpen} onclose={() => setIsOpen(false)} />
      <h1 className="login-title">Forget Password</h1>

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

      <Button className="submit" size="sm" variant="light" block type="submit">
        Submit
      </Button>
    </Form>
  );
}
