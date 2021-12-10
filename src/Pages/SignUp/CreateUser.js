import React, { useState } from "react";
import Modal from "../../Modal";
import { Form, Button } from "react-bootstrap";


async function createUserAPI(credentials) {
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
    } else if (res.status == 401) {
      return "Username already in use";
    }
  });
}

export default function CreateUser() {
  const [username, setUsername] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();

  const [role, setRole] = useState("0");

  // Errors
  const [errorUsername, setErrorUsername] = useState();
  const [errorPassword1, setErrorPassword1] = useState();
  const [errorPassword2, setErrorPassword2] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState();

  const handleChangeUsername = async (event) => {
    event.preventDefault();
    if (!event.target.value) 
    {
      setErrorUsername("Username is not valid!");
    }
    else {
      setErrorUsername("");
    }
    setUsername(event.target.value);
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
    if (event.target.value != password1)
      setErrorPassword2("Passwords are not match");
    else {
      setErrorPassword2("");
    }
    setPassword2(event.target.value);
  };

  const handleChangeRole = async (event) => {
    event.preventDefault();
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( errorUsername || errorPassword1 || errorPassword2) {
      setText("You can't submit!");
      setIsOpen(true);
    } else {
      const val = await createUserAPI({
        username: username.toLowerCase(),
        password: password2,
      });
      if (val && val != "Username already in use") {
        setText("User created successfully");
        setUsername("");
        setPassword1("");
        setPassword2("");
        setRole("0");
        setErrorUsername("");
        setErrorPassword1("");
        setErrorPassword2("");
        setIsOpen(true);
      } else if (val) {
        setText("Username already in use");
        setIsOpen(true);
      } else {
        setText("User was not created");
        setUsername("");
        setPassword1("");
        setPassword2("");
        setRole("0");
        setErrorUsername("");
        setErrorPassword1("");
        setErrorPassword2("");
        setIsOpen(true);
      }
    }
  };

  return (
    <div className="create-user-form main-content">
      <h1 className="hColor"> Create User </h1>
      <Form onSubmit={handleSubmit}>
      
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            required
            value={username}
            onChange={handleChangeUsername}
          />

          {errorUsername && (
            <Form.Text className="error">{errorUsername}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            value={password1}
            onChange={handleChangePassword1}
          />

          {errorPassword1 && (
            <Form.Text className="error">{errorPassword1}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword2">
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            value={password2}
            onChange={handleChangePassword2}
          />

          {errorPassword2 && (
            <Form.Text className="error">{errorPassword2}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Role&nbsp;</Form.Label>
          <Form.Check
            inline
            name="role"
            type="radio"
            id="regular"
            label="Regular"
            value={0}
            className="radioC"
            checked={role == 0}
            onChange={handleChangeRole}
          />
          <Form.Check
            inline
            name="role"
            type="radio"
            id="admin"
            label="Admin"
            value={1}
            className="radioC"
            checked={role == 1}
            onChange={handleChangeRole}
          />
        </Form.Group>
        <Button size="sm" variant="primary" type="submit" block>
          Submit
        </Button>
      </Form>

      <Modal text={text} open={isOpen} onclose={() => setIsOpen(false)} />
    </div>
  );
}
