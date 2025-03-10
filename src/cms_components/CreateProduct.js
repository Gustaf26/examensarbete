import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import UploadImageDropzone from "./UploadImageDropzone";

import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import Icon from '@mui/material/Icon';

import MobileList from '../cms_components/MobileList'


import { useAuth } from "../contexts/AuthContext";
import { useCreate } from "../contexts/CreateContext";
import { useMobile } from "../contexts/MobileContext";

import useMobileStyles from "../hooks/useMobileStyles";
import BreadCrumbContainer from '../components/BreadCrumbContainer'


const originalImgSize = '100%'

const CreateProduct = () => {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prodPrice, setPrice] = useState("");
  const [prodImgSize, setImgSize] = useState({ width: `${originalImgSize}px`, height: 'auto' })
  const [prodImg, setImg] = useState()

  const { currentUser } = useAuth();
  const {
    imageUrl,
    productOption,
    setProductOption,
    setSingleProduct,
    singleProduct,
    productCategories,
    // setImageUrl,
  } = useCreate();

  const { mobile, mobileDisplays, setMobileDisplays, mobileHeight, menuShowing, setMenuShowing, mobileWidth } = useMobile()
  const { containerStyles, microMobile } = useMobileStyles()
  const { admin } = useAuth()

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

    let newProduct = {
      name: name,
      description: description,
      thumbnail: imageUrl,
      price: prodPrice,
      id: ranNumber,
      category: productOption,
      qty: 0,
    }


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
    <div id="dummy-container-update" style={admin ? {
      position: 'absolute', top: mobile ? '60px' : '0',
      left: mobile ? '40px' : '240px', width: mobile ? 'calc(100% - 40px)' : 'calc(100% - 240px)'
    } : {}}
      onClick={(e) => { if (e.target.id === "dummy-container-update") setMobileDisplays(false) }}>

      {!mobile && <BreadCrumbContainer />}

      <Row className="dummy-container-mobile" onLoad={(e) => { mobile && admin && e.target.scrollIntoView({ block: 'center' }) }}
        style={mobile ? { ...containerStyles, margin: '0 auto', height: microMobile ? 'calc(100vh + 70px)' : 'fit-content' } : {
          height: '100vh', margin: '3rem auto',
          justifyContent: 'center', alignItems: 'start'
        }}>

        {mobile && admin && !microMobile && <Icon className="icon-mobile-displays" onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}
        {mobileDisplays && <MobileList />}

        <Col lg={mobile ? 12 : 6}
          style={mobile ? { paddingTop: '10px', overflowY: 'scroll', height: `${mobileHeight - 20}px`, width: `${mobileWidth}px` }
            : !mobile && admin ? { width: 'fit-content' } : { marginTop: '-40px', width: '600px', height: '500px' }}>
          {admin && !mobile && <h2 style={{ color: 'brown', textAlign: 'center', padding: '10px' }}>Product nr. {singleProduct.id}</h2>}
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

                    <Form.Text className="text-danger">
                      Please enter a description at least 20 characters long.
                    </Form.Text>

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
    </div>
  );
};

export default CreateProduct;
