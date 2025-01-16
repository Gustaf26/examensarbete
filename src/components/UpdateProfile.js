import React, { useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const UpdateProfile = () => {
  const { updateProfileData } = useAuth();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    // disable update-button while updating is in progress
    setLoading(true);

    let name = e.target[0].value
    let mail = e.target[1].value
    let password1 = e.target[2].value
    let password2 = e.target[3].value

    if (password1 !== password2) {
      setError('Passwords don´t match')
      return
    }


    // profit!
    const msg = await updateProfileData(mail, password1, name)
    if (msg.error) setError(msg.error)
    else setMessage(msg.msg)

    setLoading(false);

  }
  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card id="update-profile-form">
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}

              <Form onSubmit={handleSubmit} onChange={() => { setMessage(''); setError(null); setLoading(false) }}>
                <Form.Group id="displayName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={currentUser.display_name}
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
