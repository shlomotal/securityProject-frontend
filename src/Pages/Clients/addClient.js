import React, { useState } from "react";
import Modal from "../../Modal";
import { Form, Button, Table } from "react-bootstrap";
import "./addClient.css";





async function addClientAPI(credentials) {
    console.log("before api addClient")
    return fetch("http://localhost:4040/users/addClient", {
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

export default function AddClient() {

    const [clientFirstName, setClientFirstName] = useState();
    const [clientLastName, setClientLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [clientAdress, setClientAdress] = useState();

    // Errors
    const [errorClientFirstName, setErrorClientFirstName] = useState();
    const [errorClientLastName, setErrorClientLastName] = useState();
    const [errorPhoneNumber, setErrorPhoneNumber] = useState();
    const [errorClientAdress, setErrorClientAdress] = useState();
  
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState();
    const [client, setClient] = useState();

    const handleClientFirstName = async (event) => {
      event.preventDefault();
      if (!event.target.value) 
      {
        setErrorClientFirstName("First name is not valid!");
      }
      else {
        setErrorClientFirstName("");
      }
      setClientFirstName(event.target.value);
    };

    const handleClientLastName = async (event) => {
        event.preventDefault();
        if (!event.target.value) 
        {
          setErrorClientLastName("Last name is not valid!");
        }
        else {
          setErrorClientLastName("");
        }
        setClientLastName(event.target.value);
      };

    const handlePhoneNumber = async (event) => {
      event.preventDefault();
      // let isNum=/^\d+$/.test(event.target.value);
      // if (event.target.value.length < 10){
      //   setErrorPhoneNumber("Phone number must be 10 digits!");}
      // else if (!isNum){
      //   setErrorPhoneNumber("Phone number must be digits only!");
      // }
      // else {
        setErrorPhoneNumber("");
      //}
      setPhoneNumber(event.target.value);
    };

    const handleClientAdress = async (event) => {
      event.preventDefault();
      if (!event.target.value)
        setErrorClientAdress("Adress is not valid!");
      else {
        setErrorClientAdress("");
      }
      setClientAdress(event.target.value);
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        var cred = {
            clientFirstName: clientFirstName.toLowerCase(),
            clientLastName: clientLastName.toLowerCase(),
            clientPhoneNumber: phoneNumber,
            address: clientAdress
        }

        if ( errorClientFirstName || errorClientLastName || errorPhoneNumber || errorClientAdress) {
          setText("You can't submit!");
          setIsOpen(true);
        } else {
          const val = await addClientAPI(cred);
          if (val) {
            console.log("result: ", val);
            setClient(val.message);
            setText("Client added successfully");
            setClientFirstName("");
            setClientLastName("");
            setPhoneNumber("");
            setClientAdress("");
            setErrorClientFirstName("");
            setErrorClientLastName("");
            setErrorPhoneNumber("");
            setErrorClientAdress("");
            setIsOpen(true);
          } else {
            setText("Client was not added, phone number already exists!");
            setClientFirstName("");
            setClientLastName("");
            setPhoneNumber("");
            setErrorClientFirstName("");
            setErrorClientLastName("");
            setErrorPhoneNumber("");
            setErrorClientAdress("");
            setIsOpen(true);
          }
        }
      };
    
return (
  <div>
    <Form className="add-client-form-main" onSubmit={handleSubmit}>
      <Modal text={text} open={isOpen} onclose={() => setIsOpen(false)} />

      <h1 className="add-client-title"> Add Client </h1>

      <Form.Group className="add-client-form-group" controlId="form-firstname">
        <label>First Name</label>
        <Form.Control
          className="input"
          type="text"
          placeholder="Enter First name"
          value={clientFirstName}
          required
          onChange={handleClientFirstName}
        />

        {errorClientFirstName && <Form.Text>{errorClientFirstName}</Form.Text>}
      </Form.Group>

      <Form.Group className="add-client-form-group" controlId="form-lastname">
        <label>Last Name</label>
        <Form.Control
          className="input"
          type="text"
          placeholder="Enter Last name"
          value={clientLastName}
          required
          onChange={handleClientLastName}
        />

        {errorClientLastName && <Form.Text>{errorClientLastName}</Form.Text>}
      </Form.Group>

      <Form.Group
        className="add-client-form-group"
        controlId="form-phonenumber"
      >
        <label>Phone Number</label>
        <Form.Control
          className="input"
          type="text"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          required
          onChange={handlePhoneNumber}
        />

        {errorPhoneNumber && <Form.Text>{errorPhoneNumber}</Form.Text>}
      </Form.Group>

      <Form.Group
        className="add-client-form-group"
        controlId="form-phonenumber"
      >
        <label>Adress</label>
        <Form.Control
          className="input"
          type="text"
          placeholder="Enter Adress"
          value={clientAdress}
          required
          onChange={handleClientAdress}
        />

        {errorClientAdress && <Form.Text>{errorClientAdress}</Form.Text>}
      </Form.Group>

      <Button className="submit" size="sm" variant="light" block type="submit">
        Submit
      </Button>
    </Form>

    {client ? (
      <table class="center">
        <thead>
          <tr>
            <td> First Name </td>
            <td> Last Name </td>
            <td> Phone Number </td>
            <td> Address </td>
            <td> Created Date </td>
          </tr>
        </thead>
        <tbody>
          <td>{client.clientFirstName}</td>
          <td> {client.clientLastName}</td>
          <td>{client.phoneNumber}</td>
          <td>{client.address}</td>
          <td>{client.createdDate}</td>
        </tbody>
      </table>
    ) : (
      <tr></tr> 
    )}

  </div>
);
}
