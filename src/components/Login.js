// import firebaseLocalStorage from "../firebase";
import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import { useCreate } from "../contexts/CreateContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, checkIfAdmin, setAdmin } = useAuth();
  const [adminChecked, setChecked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [adminAlert, setAdminAlert] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();


    let email = e.target[0].value
    let passOne = e.target[1].value
    let adminCheck = e.target[2].checked

    setError(null);

    // try to log in the user with the specified credentials


    setLoading(true);
    const user = await login(email, passOne);

    if (user) {
      setError(null)
      setLoading(false)

      // Check if user is admin manually
      let admin = checkIfAdmin(user.email)
      if (admin) {
        console.log(adminCheck)
        if (adminCheck === false) {
          setAdminAlert(true);
          setLoading(false);
          return;
        } else {
          setAdminAlert(false);
          setAdmin(true);
          navigate('/cms/index', { replace: true })
        }
      }
      else {
        navigate('/products/troussers')
        return
      }
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
              <Form style={{ minWidth: '300px' }} onSubmit={handleSubmit} onChange={() => { setError(null); setAlert('') }}>
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
      </Row >
    </>
  );
};

export default Login;
