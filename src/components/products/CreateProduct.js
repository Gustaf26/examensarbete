import React, { useState, useEffect } from "react";
// import UploadImageDropzone from "./UploadImageDropzone";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";

const CreateProduct = () => {
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
    productCategories,
    // setImageUrl,
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

    if (name.length < 4 || description < 20) {
      setError("You are missing some of the required upload parameters");
      return;
    }

    setError(false);
    setLoading(true);
    const ranNumber = Math.floor(Math.random() * 10000);

    // fetch('http://127.0.0.1:8000/products/create-prod', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${currentUser.token}`
    //   },
    //   body: JSON.stringify({
    //     name: name,
    //     description: description,
    //     thumbnail: imageUrl,
    //     price: prodPrice,
    //     id: ranNumber,
    //     category: productOption,
    //   }),
    // })
    // .then(res => res.json())
    // .then(res => {
    //   // if (res) {
    //   //   setSingleProduct(res.product);
    //   //   navigate(`/products/${productOption}/${ranNumber}`);
    //   //   setLoading(false);
    //   //   // clearInterval(timingFunction);
    //   // }
    //   console.log(res)
    // })
    // .catch(err => console.log(err))
  };



  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {!loading && (
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
                  <Form.Group>
                    <Form.Label>Choose product category</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      id="inlineFormCustomSelect"
                      custom
                      onClick={(e) =>
                        setProductOption(e.target.value.toLowerCase())
                      }
                    >
                      {productCategories &&
                        productCategories.map((category) => (
                          <option key={category.id}>
                            {category.name.toUpperCase()}
                          </option>
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
                      value={prodPrice}
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
                  <Button disabled={loading} type="submit" className="mx-auto">
                    Create
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
          {loading && (
            <div className="d-flex justify-content-center my-5">
              <BounceLoader color={"#888"} size={100} />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CreateProduct;
