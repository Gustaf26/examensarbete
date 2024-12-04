import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useCreate } from "../contexts/CreateContext";

const UpdateProfile = () => {
  const { updateProfileData } = useAuth();
  // const [displayNameRef, setNameRef] = useState("");
  // const [passwordRef, setPassRef] = useState("");
  // const [passwordConfirmRef, setPassConfirmRef] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  // const [emailRef, setEmailRef] = useState(currentUser.email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    const updateTasks = [];

    try {
      // disable update-button while updating is in progress
      setLoading(true);

      let name = e.target[0].value
      let mail = e.target[1].value
      let password1 = e.target[2].value
      let password2 = e.target[3].value

      if (password1 !== password2) {
        throw Error({ err: 'passwords don´t match' })
      }

      const msg = updateProfileData(mail, password1, name)

      console.log(msg)
      // profit!
      setMessage(msg.msg);
      setLoading(false);
    } catch (e) {
      setError(e.err);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   let passwordInStorage = localStorage.getItem("currentPass");
  //   if (currentPassword) {
  //     setPassRef(currentPassword);
  //     setPassConfirmRef(currentPassword);
  //   } else if (passwordInStorage) {
  //     setCurrentPassword(passwordInStorage);
  //   }
  // }, []);

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card id="update-profile-form">
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="displayName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={currentUser.displayName}
                  />
                </Form.Group>

                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={currentUser.email}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label type="password">Password</Form.Label>
                  <Form.Control
                    id="password"
                    placeholder="Enter a new password"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    id="password-confirm"
                    type="password"
                    placeholder="Confirm the new password"
                    // defaultValue={currentPassword}
                    required
                  />
                </Form.Group>
                <Button disabled={loading} type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UpdateProfile;
