// import firebaseLocalStorage from "../firebase";
import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import { useCreate } from "../contexts/CreateContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, checkIfAdmin, setAdmin, admin, currentUser, setCurrentUser } = useAuth();
  const [adminChecked, setChecked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [adminAlert, setAdminAlert] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (currentUser?.email && !admin) {
      navigate("/");
    }
    else if (admin) {
      navigate('/cms')
    }

  }, [currentUser])

  const handleSubmit = async (e) => {
    e.preventDefault();


    let email = e.target[0].value
    let passOne = e.target[1].value
    let admin = e.target[2].checked

    setError(null);

    // try to log in the user with the specified credentials
    setLoading(true);
    if (admin) {
      const adminBoolean = checkIfAdmin(email);
      if (adminBoolean === false) {
        setAlert(true);
        setLoading(false);
        return;
      } else {
        setAlert(false);
      }
    } else if (adminChecked === false) {
      const adminBoolean = checkIfAdmin(email);
      if (adminBoolean === true) {
        setAdminAlert(true);
        setLoading(false);
        return;
      } else {
        setAdminAlert(false);
      }
    }
    const user = await login(email, passOne);

    if (user) {
      setError(null)
      setLoading(false)
      navigate('/products/troussers')
      return
    }
    else {
      setError(
        "Could not log in. Please check your email address and your password."
      );
      setLoading(false);
    }
  };

  const restoreAlerts = () => {
    setError(false);
    setAdminAlert(false);
    setAlert(false);
  };

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card id="login-form">
            <Card.Body>
              <Card.Title>Log In</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit} onChange={() => { setError(null); setAlert('') }}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    onChange={restoreAlerts}
                    required
                  />
                </Form.Group>

                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={restoreAlerts}
                    ref={passwordRef}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I am the administrator"
                    onChange={() => setChecked(!adminChecked)}
                  />
                </Form.Group>
                <Button type="submit">
                  Log In
                </Button>
              </Form>
              {alert === true ? (
                <Alert variant="danger" className="mt-3">
                  You don´t have admin permissions
                </Alert>
              ) : null}

              {adminAlert === true ? (
                <Alert variant="warning" className="mt-3">
                  You are admin. Please check the admin-box
                </Alert>
              ) : null}
              <div className="text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
