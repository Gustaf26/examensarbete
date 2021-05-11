import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const UpdateProfile = () => {
  const { currentUser, updateEmail, updatePassword, updateProfile } = useAuth();
  const [displayNameRef, setNameRef] = useState("");
  const [emailRef, setEmailRef] = useState(currentUser.email);
  const [passwordRef, setPassRef] = useState("");
  const [passwordConfirmRef, setPassConfirmRef] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // make sure user has entered the same password in both input fields
    if (passwordRef !== passwordConfirmRef) {
      return setError("The passwords don´t match");
    }

    setError(null);
    const updateTasks = [];

    try {
      // disable update-button while updating is in progress
      setLoading(true);

      // update displayName if user has changed it
      if (displayNameRef && displayNameRef !== currentUser.displayName) {
        updateTasks.push(updateProfile(displayNameRef));
      }

      // update email if user has changed it
      if (emailRef && emailRef !== currentUser.email) {
        updateTasks.push(updateEmail(emailRef));
      }

      // wait for all updateTasks to finish
      await Promise.all(updateTasks);

      // update password if user has provided a new password
      if (passwordRef) {
        await updatePassword(passwordRef);
      }

      // profit!
      setMessage("Profile successfully updated");
      setLoading(false);
    } catch (e) {
      setError("Error updating profile. Try logging out and in again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="displayName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setNameRef(e.target.value)}
                    // ref={displayNameRef}
                    defaultValue={currentUser.displayName}
                  />
                </Form.Group>

                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    // ref={emailRef}
                    onChange={(e) => setEmailRef(e.target.value)}
                    defaultValue={currentUser.email}
                    required
                  />
                </Form.Group>

                <Form.Group id="password">
                  <Form.Label type="text">Password</Form.Label>
                  <Form.Control
                    // ref={passwordRef}
                    onChange={(e) => setPassRef(e.target.value)}
                    placeholder="Enter a new password"
                    required
                  />
                </Form.Group>

                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    // ref={passwordConfirmRef}
                    onChange={(e) => setPassConfirmRef(e.target.value)}
                    placeholder="Confirm the new password"
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
