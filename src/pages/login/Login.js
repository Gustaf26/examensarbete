import { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useMobile } from "../../contexts/MobileContext";

const Login = () => {
  const emailRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, checkIfAdmin, setAdmin } = useAuth();
  const [adminChecked, setChecked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [adminAlert, setAdminAlert] = useState(false);
  const navigate = useNavigate();
  const { mobile } = useMobile()


  const handleSubmit = (e) => {
    e.preventDefault();

    let email = e.target[0].value
    let passOne = e.target[1].value
    let adminCheck = e.target[2].checked

    setError(null);

    // try to log in the user with the specified credentials
    setLoading(true);
    const user = login(email, passOne);

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
        <Col>
          <div id="login-form">
            <Card.Title style={{
              textAlign: 'center', width: '100%', height: 'fit-content', padding: '20px',
              backgroundColor: 'rgb(255, 255, 255)'
            }}>Please Log In</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form style={!mobile ? { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'start' } : { minWidth: '' }}
              onSubmit={handleSubmit} onChange={() => { setError(null); setAlert('') }}>
              <Form.Group className="form-div mt-2" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  onChange={restoreAlerts}
                  placeholder={'Ex. admin@email.se'}
                  required
                />
                <Form.Label className="mt-2">Password</Form.Label>
                <Form.Control id="password"
                  type="password"
                  onChange={restoreAlerts}
                  placeholder={'adminPass'}
                  required
                /><div className=" mt-3">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
              </Form.Group>
              <Form.Group className="form-div" controlId="formBasicCheckbox">
                <Form.Label>Be sure it´s you</Form.Label>
                <Button type="submit">
                  Log In
                </Button>
                <Form.Check
                  className="mt-4"
                  type="checkbox"
                  label="I am the administrator"
                  style={{ marginTop: '10px' }}
                  onChange={() => setChecked(!adminChecked)}
                />
                <div className="mt-1">
                  Need an account? <Link to="/signup">Sign Up</Link>
                </div>
              </Form.Group>
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
          </div>
        </Col>
      </Row >
    </>
  );
};

export default Login;
