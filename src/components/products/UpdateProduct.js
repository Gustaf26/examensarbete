import React, { useState, useEffect } from "react";
// import UploadImageDropzone from "./UploadImageDropzone";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/index";
import { useCreate } from "../../contexts/CreateContext";

import { doc, setDoc } from "firebase/firestore";

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

      let updatedProduct = {
        name: name,
        description: description,
        thumbnail: imageUrl,
        price: prodPrice,
        id: singleProduct.id,
        category: productOption
      }

      await setDoc(doc(db, productOption, singleProduct.id.toString()), updatedProduct)

      setTimeout(() => {
        setSingleProduct(updatedProduct)
        navigate(`/cms/products/${productOption}/${singleProduct.id}`, { replace: true });
      }, 1000);
    }

    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setProductOption(singleProduct.category);
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
                <Card.Img src={singleProduct.img} />
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
                    <textarea style={{ width: '100%', height: '200px', overflowY: 'scroll', border: '0.5px solid lightgrey', borderRadius: '8px' }}
                      type="title"
                      onChange={handleDescriptionChange}
                      // value={description}
                      defaultValue={singleProduct.description}
                      required
                    ></textarea>
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
                      // id="inlineFormCustomSelect"
                      custom
                      as="select"
                      required
                      onClick={(e) =>
                        setProductOption(e.target.value.toLowerCase())
                      }
                    >
                      {productCategories &&
                        productCategories.map((category, i) => {
                          if (category.name === singleProduct.category) {
                            return (
                              <option key={i}>
                                {category.name.toUpperCase()}
                              </option>
                            );
                          }
                        })}
                      {productCategories &&
                        productCategories.map((category, i) => {
                          if (category.name !== singleProduct.category) {
                            return (
                              <option key={i}>
                                {category.name.toUpperCase()}
                              </option>
                            );
                          }
                        })}
                    </Form.Control>
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
                  {/* {productOption && (
                    <UploadImageDropzone type={productOption} />
                  )} */}
                  <Form.Group className="d-flex mt-3 justify-content-between align-items-center">
                    <Form.Text className="text-danger mt-0">
                      If no photo is uploaded, you are keeping the same original
                      photo
                    </Form.Text>
                    <Button
                      disabled={loading}
                      type="submit"
                      className="mx-0"
                    >
                      Update
                    </Button>
                  </Form.Group>
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
