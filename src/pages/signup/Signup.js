import { useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let email = e.target[0].value
    let passOne = e.target[1].value
    let passTwo = e.target[2].value

    // make sure user has entered the same password in both input fields
    if (passOne !== passTwo) {
      setError("The passwords does not match");
      return;
    }

    setError(null);

    try {
      // try to sign up the user with the specified credentials
      setLoading(true);
      let message = await signup(email, passOne);
      if (message.error) {
        alert(error)
        navigate('/signup')
      }
      navigate("/");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card id="signup-form">
            <Card.Title>Sign Up</Card.Title>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='emailRef' required />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='passwordRef' required />
              </Form.Group>

              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  name='passwordConfirmRef'
                  required
                />
              </Form.Group>

              <Button disabled={loading} type="submit">
                Create Account
              </Button>
            </Form>
          </Card>
          <div className="text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
