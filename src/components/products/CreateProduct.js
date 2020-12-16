import React, { useState } from "react";
import UploadImageDropzone from "./UploadImageDropzone";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const CreateProduct = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productOption, setProductOption] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 4 || description < 20 || !productOption) {
      setError("You are missing some of the required upload parameters");
      return;
    }

    setError(false);
    setLoading(true);

    try {
      const docRef = await db.collection("albums").add({
        name,
        owner: currentUser.uid,
      });

      navigate(`/albums/${docRef.id}`);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Create a product entry</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="title">
                  <Form.Label>Product name</Form.Label>
                  <Form.Control
                    type="title"
                    onChange={handleNameChange}
                    value={name}
                    required
                  />
                  {name && name.length < 4 && (
                    <Form.Text className="text-danger">
                      Please enter a name at least 4 characters long.
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="title"
                    onChange={handleDescriptionChange}
                    value={description}
                    required
                  />
                  {description && description.length < 20 && (
                    <Form.Text className="text-danger">
                      Please enter a description at least 20 characters long.
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                  <Form.Label>Choose product category</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    multiple
                    onClick={(e) =>
                      setProductOption(e.target.value.toLowerCase())
                    }
                  >
                    <option>Troussers</option>
                    <option>Jackets</option>
                    <option>T-shirts</option>
                  </Form.Control>
                </Form.Group>
                <UploadImageDropzone
                  type={productOption ? productOption : null}
                />
                <Button disabled={loading} type="submit" className="mx-auto">
                  Create
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateProduct;
