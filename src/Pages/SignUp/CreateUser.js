import React, { useState } from "react";
import Modal from "../../Modal";
import { Form, Button } from "react-bootstrap";
import "./CreateUser.css";
import { LockClosedOutline, PersonOutline } from "react-ionicons";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const IconLabel = ({ iconElement, label }) => (
  <Form.Label className="red">
    {iconElement} {label}
  </Form.Label>
);

async function createUserAPI(credentials) {
  console.log("before api signup")
  return fetch("http://localhost:4040/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else if (res.status === 401) {
      return "Username already in use";
    }
  });
}

export default function CreateUser() {


  const [userEmail, setEmail] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();


  // Errors
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword1, setErrorPassword1] = useState();
  const [errorPassword2, setErrorPassword2] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState();

  const handleChangeEmail = async (event) => {
    event.preventDefault();
    if (!event.target.value) 
    {
      setErrorEmail("Email is not valid!");
    }
    if (!validEmailRegex.test(event.target.value))
      setErrorEmail("Email is not valid");
    else {
      setErrorEmail("");
    }
    setEmail(event.target.value);
  };
  const handleChangePassword1 = async (event) => {
    event.preventDefault();
    if (event.target.value.length < 10)
      setErrorPassword1("Password must be at least 10 characters long!");
    else {
      setErrorPassword1("");
    }
    setPassword1(event.target.value);
  };
  const handleChangePassword2 = async (event) => {
    event.preventDefault();
    if (event.target.value !== password1)
      setErrorPassword2("Passwords are not match");
    else {
      setErrorPassword2("");
    }
    setPassword2(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submiting")
        console.log("username", userEmail)
        console.log("password", password2)
    var cred = {
      username: userEmail.toLowerCase(),
      password:password1,
      confirmPassword: password2,
    }
    //console.log("credddd:   ", cred)
    //await createUserAPI(cred);
    if ( errorEmail || errorPassword1 || errorPassword2) {
      setText("You can't submit!");
      setIsOpen(true);
    } else {
      const val = await createUserAPI(cred);
      if (val && val !== "Email already in use") {
        setText("User created successfully");
        setEmail("");
        setPassword1("");
        setPassword2("");
        setErrorEmail("");
        setErrorPassword1("");
        setErrorPassword2("");
        setIsOpen(true);
      } else if (val) {
        setText("Username already in use");
        setIsOpen(true);
      } else {
        setText("User was not created");
        setEmail("");
        setPassword1("");
        setPassword2("");
        setErrorEmail("");
        setErrorPassword1("");
        setErrorPassword2("");
        setIsOpen(true);
      }
    }
  };

  return (
    <Form className="create-user-form-main" onSubmit={handleSubmit}>
      <Modal text={text} open={isOpen} onclose={() => setIsOpen(false)} />
      <h1 className="signup-title"> Create User </h1>

      <Form.Group className="signup-form-group" controlId="form-username">
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

        {errorEmail && <Form.Text >{errorEmail}</Form.Text>}
      </Form.Group>

      <Form.Group className="signup-form-group" controlId="form-Password1">
        <IconLabel
          iconElement={<LockClosedOutline color="#00000" />}
          label="Password"
        />
        <Form.Control
          type="password"
          placeholder="··········"
          required
          value={password1}
          onChange={handleChangePassword1}
        />

        {errorPassword1 && (
          <Form.Text className="error">{errorPassword1}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="signup-form-group" controlId="form-Password2">
        <IconLabel
          iconElement={<LockClosedOutline color="#00000" />}
          label="Password Confirmation"
        />
        <Form.Control
          type="password"
          placeholder="··········"
          required
          value={password2}
          onChange={handleChangePassword2}
        />

        {errorPassword2 &&  <Form.Text className="error">{errorPassword2}</Form.Text>}
      </Form.Group>

      <Button className="submit" size="sm" variant="light" block type="submit">
        Submit
      </Button>
    </Form>
  );
}
