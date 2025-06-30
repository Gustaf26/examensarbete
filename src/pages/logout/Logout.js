import { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const Logout = () => {
  const { currentUser, admin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    setTimeout(() => {
      (!admin || !currentUser) && navigate("/", { replace: true });
    }, 1000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row style={{ marginTop: '6rem' }}>
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
