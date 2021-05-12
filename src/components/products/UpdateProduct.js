import React, { useState, useEffect } from "react";
import UploadImageDropzone from "./UploadImageDropzone";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { useCreate } from "../../contexts/CreateContext";

const UpdateProduct = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prodPrice, setPrice] = useState("");
  const {
    imageUrl,
    productOption,
    setProductOption,
    setSingleProduct,
    singleProduct,
    productCategories,
    setImageUrl,
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

  useEffect(() => {
    console.log(productCategories);
  }, [productCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 4 || description < 20 || !imageUrl) {
      setError("You are missing some of the required upload parameters");
      return;
    }

    setError(false);
    setLoading(true);

    try {
      db.collection(`${productOption}`).doc(`${singleProduct.id}`).set({
        name: name,
        description: description,
        thumbnail: imageUrl,
        price: prodPrice,
        id: singleProduct.id,
        category: productOption,
      });

      db.collection(`${productOption}`)
        .doc(`${singleProduct.id}`)
        .get()
        .then((doc) => {
          setSingleProduct(doc.data());
          setTimeout(() => {
            navigate(`/products/${productOption}/${singleProduct.id}`);
          }, 1000);
        });
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setProductOption("troussers");
    setName(singleProduct.name);
    setDescription(singleProduct.description);
    setPrice(singleProduct.price);
    setImageUrl(singleProduct.thumbnail);
  }, []);

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {singleProduct ? (
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
                      // value={name}
                      defaultValue={singleProduct.name}
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
                      // value={description}
                      defaultValue={singleProduct.description}
                      required
                    />
                    {singleProduct.description &&
                      singleProduct.description.length < 20 && (
                        <Form.Text className="text-danger">
                          Please update with a description at least 20
                          characters long.
                        </Form.Text>
                      )}
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Choose product category</Form.Label>
                    <Form.Control
                      id="inlineFormCustomSelect"
                      custom
                      as="select"
                      required
                      onClick={(e) =>
                        setProductOption(e.target.value.toLowerCase())
                      }
                    >
                      {productCategories &&
                        productCategories.map((category) => (
                          <option>{category.name.toUpperCase()}</option>
                        ))}
                    </Form.Control>
                    <Form.Text className="text-danger">
                      Please note that troussers are default option
                    </Form.Text>
                  </Form.Group>
                  <Form.Group id="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="title"
                      onChange={handlePrice}
                      // value={prodPrice}
                      defaultValue={singleProduct.price}
                      required
                    />
                    {prodPrice && prodPrice === "0" && (
                      <Form.Text className="text-danger">
                        Please set the product price.
                      </Form.Text>
                    )}
                  </Form.Group>
                  {productOption && (
                    <UploadImageDropzone type={productOption} />
                  )}
                  <Button disabled={loading} type="submit" className="mx-auto">
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Alert variant="warning">
              An error just occurred. Please navigate back to the products list
            </Alert>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UpdateProduct;
