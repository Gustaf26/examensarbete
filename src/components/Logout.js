import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth, currentUser } from "../contexts/AuthContext";

const Logout = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // localStorage.removeItem("currentPass");
      await logout(currentUser.email);
      navigate("/login");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Log Out</Card.Title>

              <Card.Text>
                Please wait while you're being logged out...
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Logout;
