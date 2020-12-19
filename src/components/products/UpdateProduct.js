import React, { useState } from "react";
import UploadImageDropzone from "./UploadImageDropzone";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";

const UpdateProduct = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prodPrice, setPrice] = useState("");
  const { currentUser } = useAuth();
  const {
    imageUrl,
    productOption,
    setProductOption,
    setSingleProduct,
    singleProduct,
  } = useCreate();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePrice = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
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
      const ranNumber = Math.floor(Math.random() * 10000);

      const docRef = db.collection(`${productOption}`).doc(`${ranNumber}`).set({
        name: name,
        description: description,
        thumbnail: imageUrl,
        price: prodPrice,
        id: ranNumber,
      });

      db.collection(`${productOption}`)
        .doc(`${ranNumber}`)
        .get()
        .then((doc) => {
          setSingleProduct(doc.data());
          setTimeout(() => {
            navigate(`/products/${productOption}/${ranNumber}`);
          }, 1000);
        });
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
              <Card.Title>Update a product entry</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="title">
                  <Form.Label>Product name</Form.Label>
                  <Form.Control
                    type="title"
                    onChange={handleNameChange}
                    value={singleProduct.name}
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
                    value={singleProduct.description}
                    required
                  />
                  {singleProduct.description &&
                    singleProduct.description.length < 20 && (
                      <Form.Text className="text-danger">
                        Please update with a description at least 20 characters
                        long.
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
                <Form.Group id="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="title"
                    onChange={handlePrice}
                    value={singleProduct.price}
                    required
                  />
                  {prodPrice && prodPrice === "0" && (
                    <Form.Text className="text-danger">
                      Please set the product price.
                    </Form.Text>
                  )}
                </Form.Group>
                {productOption && <UploadImageDropzone type={productOption} />}
                <Button disabled={loading} type="submit" className="mx-auto">
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

export default UpdateProduct;
