import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { db } from "../../firebase/index";
import { doc, setDoc } from "firebase/firestore";

import { Row, Col, Card, Form, Button, Alert, Breadcrumb } from "react-bootstrap";
import Icon from '@mui/material/Icon';
import Navigation from '../Navigation'

import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from './../../contexts/MobileContext'

import MobileList from '../../cms_components/MobileList'
import useMobileStyles from '../../hooks/useMobileStyles'


const UpdateProduct = () => {

  const { mobile, mobileDisplays, setMobileDisplays, mobileHeight } = useMobile()
  const containerStyles = useMobileStyles()

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
    admin
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
      <div id="dummy-container-update" onClick={(e) => { if (e.target.id === "dummy-container-update") setMobileDisplays(false) }}>
        {!mobile && admin && <Navigation />}
        {!mobile && <Breadcrumb className="m-3">
          <Breadcrumb.Item>
            <Link to={admin ? "/cms/index" : "/"}>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {productOption && (
              <Link to={`/cms/products/${productOption}`}></Link>
            )}
          </Breadcrumb.Item>
        </Breadcrumb>}
        <Row className="dummy-container-mobile" style={mobile ? { ...containerStyles, margin: '5rem auto', height: '100%' } : { height: '100vh', margin: '3rem auto', justifyContent: 'center', alignItems: 'start' }}>
          {admin && mobile && <Navigation />}
          {mobile && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}
          {mobileDisplays && <MobileList />}
          <Col lg={mobile ? 12 : 6} style={mobile ? { padding: '10px', overflowY: 'scroll', height: `${mobileHeight - 20}px` } : { marginTop: '-40px', width: '600px', height: '500px' }}>
            {singleProduct ? (
              <Card className="my-3 p-3" style={{ height: mobile ? 'fit-content' : `${mobileHeight - 20}px`, overflowY: mobile ? 'hidden' : 'scroll' }}>
                <Card.Body className="p-2">
                  <Card.Title className="p-2" style={{ textAlign: 'center' }}>Update a product entry</Card.Title>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Card.Img src={singleProduct.thumbnail} />
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="title">
                      <Form.Label className="p-2">Product name</Form.Label>
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
                      <Form.Label className="p-2">Description</Form.Label>
                      <textarea className="p-2" style={{ width: '100%', height: '200px', overflowY: 'scroll', border: '0.5px solid lightgrey', borderRadius: '8px' }}
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
                      <Form.Label className="p-2">Choose product category</Form.Label>
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
      </div>
    </>
  );
};

export default UpdateProduct;
