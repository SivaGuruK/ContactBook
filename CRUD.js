import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CRUD.css';

const CRUD = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    
    const [editId, setEditId] = useState("");
  const [editfname, seteditFName] = useState("");
  const [editlname, seteditLName] = useState("");
  const [editemail, seteditEmail] = useState("");
  const [editphonenumber, seteditPhoneNumber] = useState("");
  const [editage, seteditAge] = useState("");
  const [editaddress, seteditAddress] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
      getData();
  }, []);
    const getData = () => {
        axios.get("http://localhost:5014/api/Contact")
          .then((result) => {
            setData(result.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

  const handleEdit = (id) => {
      handleShow();
      axios.get(`http://localhost:5014/api/Contact/${id}`)
        .then((result) => {
          seteditFName(result.data.firstName);
          seteditLName(result.data.lastName);
          seteditEmail(result.data.email);
          seteditPhoneNumber(result.data.phoneNumber);
          seteditAge(result.data.age);
            seteditAddress(result.data.address);
            setEditId(id);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?") === true) {
        axios.delete(`http://localhost:5014/api/Contact/${id}`)
          .then((result) => {
            if (result.status === 200) {
              toast.success("Contact Is been deleted!");
              getData();
            }
          })
          .catch((error) => {
            toast.error(error);
          });
    }
  };

    const handleUpdate = () => {
        const url = `http://localhost:5014/api/Contact/${editId}`;
        const data = {
            "id": editId,
          "firstName": editfname,
          "lastName": editlname,
          "email": editemail,
            "phoneNumber": editphonenumber,
          "age": editage,
          "address": editaddress,
        }
        axios.put(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success("Contact Is been Updated!")
            }).catch((error) => {
             toast.error(error);
        })
    };
    const handleSave = () => {
        const url = "http://localhost:5014/api/Contact";
        const data = {
          "firstName": fname,
          "lastName": lname,
          "email": email,
            "phoneNumber": phonenumber,
          "age": age,
          "address": address,
        }
        axios.post(url, data)
            .then((result) =>{
                getData();
                clear();
                toast.success("Contact Is been Added!")
            }).catch((error) => {
             toast.error(error);
        })
    }
    const clear = () =>{
        setFName('');
        setLName('');
        setEmail('');
        setPhoneNumber('');
        setAge('');
        setAddress('');
         seteditFName("");
         seteditLName("");
         seteditEmail("");
         seteditPhoneNumber("");
         seteditAge("");
        seteditAddress("");
        setEditId('');
    }
  return (
    <>
      <h1>ConnectHub</h1>
      <h4>Unifying Connections, One Hub at a Time!</h4>
      <ToastContainer />
      <Container>
        <Row>
          <Col>
            <input
              type="text"
              className="form-contol"
              placeholder="Enter FirstName"
              value={fname}
              onChange={(e) => setFName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-contol"
              placeholder="Enter LastName"
              value={lname}
              onChange={(e) => setLName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-contol"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col className="f4">
            <input
              type="text"
              className="form-contol"
              placeholder="Enter Phone Number"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Col>
          <Col className="f5">
            <input
              type="text"
              className="form-contol"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Col>
          <Col className="f6">
            <input
              type="text"
              className="form-contol"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
          <Col className="btnn">
            <Button
              className="btn1"
              variant="primary"
              onClick={() => handleSave()}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>Age</th>
            <th>Address</th>
            <th>Manage Contacts</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.age}</td>
                    <td>{item.address}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-contol"
                placeholder="Enter FirstName"
                value={editfname}
                onChange={(e) => seteditFName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-contol"
                placeholder="Enter LastName"
                value={editlname}
                onChange={(e) => seteditLName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-contol"
                placeholder="Enter Email"
                value={editemail}
                onChange={(e) => seteditEmail(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-contol"
                placeholder="Enter Phone Number"
                value={editphonenumber}
                onChange={(e) => seteditPhoneNumber(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-contol"
                placeholder="Enter Age"
                value={editage}
                onChange={(e) => seteditAge(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-contol"
                placeholder="Enter Address"
                value={editaddress}
                onChange={(e) => seteditAddress(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CRUD;
