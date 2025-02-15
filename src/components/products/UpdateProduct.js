import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { db } from "../../firebase/index";
// import { doc, setDoc } from "firebase/firestore";

import BreadCrumbContainer from '../BreadCrumbContainer'

import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import Icon from '@mui/material/Icon';

import { useCreate } from "../../contexts/CreateContext";
import { useAuth } from '../../contexts/AuthContext'
import { useMobile } from './../../contexts/MobileContext'

import MobileList from '../../cms_components/MobileList'
import useMobileStyles from '../../hooks/useMobileStyles'


const UpdateProduct = () => {

  const { mobile, mobileDisplays, setMobileDisplays, mobileHeight, menuShowing, setMenuShowing, mobileWidth } = useMobile()
  const containerStyles = useMobileStyles()

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prodPrice, setPrice] = useState("");
  const { admin } = useAuth()
  const originalImgSize = '100%'
  const [prodImgSize, setImgSize] = useState({ width: `${originalImgSize}px`, height: 'auto' })
  const [prodImg, setImg] = useState()

  const {
    imageUrl,
    productOption,
    setProductOption,
    setSingleProduct,
    singleProduct,
    productCategories,
    setImageUrl,
    allProducts,
    setProducts
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length < 4 || description < 20 || !imageUrl) {
      setError("You are missing some of the required upload parameters");
      return;
    }

    setError(false);
    setLoading(true);



    let updatedProduct = {
      name: name,
      description: description,
      thumbnail: imageUrl,
      price: prodPrice,
      id: singleProduct.id,
      category: productOption
    }

    // FOR REAL DATABASE UPDATE USE:
    // await setDoc(doc(db, productOption, singleProduct.id.toString()), updatedProduct)

    let otherProducts = allProducts.filter(prod => prod.id !== singleProduct.id)

    otherProducts.push(updatedProduct)

    setProducts(otherProducts)

    setTimeout(() => {
      setSingleProduct(updatedProduct)
      navigate(`/cms/products/${productOption}/${singleProduct.id}`, { replace: true });
    }, 1000);

  }

  useEffect(() => {


    if (singleProduct) {
      localStorage.setItem('singleProduct', JSON.stringify(singleProduct))

      setProductOption(singleProduct.category);
      setName(singleProduct.name);
      setDescription(singleProduct.description);
      setPrice(singleProduct.price);
      setImageUrl(singleProduct.thumbnail);
    }

    else {

      let existingProduct = JSON.parse(localStorage.getItem('singleProduct'))
      setSingleProduct(existingProduct)
      setProductOption(existingProduct.category);
      setName(existingProduct.name);
      setDescription(existingProduct.description);
      setPrice(existingProduct.price);
      setImageUrl(existingProduct.thumbnail);
    }

  }, []);

  const handleImgResize = (e) => {
    if (e.target.value > 50) {
      console.log((1 + Number(e.target.value) / 100).toFixed(1))
      document.getElementById('update-product-image').style.transform = `scale(${((1 + Number(e.target.value) / 100).toFixed(1)).toString()})`
    }
    else {
      document.getElementById('update-product-image').style.transform = `scale(${(1 - ((50 - Number(e.target.value)) / 100)).toFixed(1).toString()})`
    }
  }

  const updateImg = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]))
    setImg(URL.createObjectURL(e.target.files[0]))
  }

  const uploadImg = (e) => {
    e.preventDefault()
    document.getElementById("upfile").click()
  }

  return (
    <>
      <div id="dummy-container-update" style={admin ? {
        position: 'absolute', top: mobile ? '60px' : '0',
        left: mobile ? '40px' : '240px', width: mobile ? 'calc(100% - 40px)' : 'calc(100% - 240px)'
      } : {}}
        onClick={(e) => { if (e.target.id === "dummy-container-update") setMobileDisplays(false) }}>
        {/* {!mobile && admin && <Navigation />} */}

        {!mobile && <BreadCrumbContainer />}

        <Row className="dummy-container-mobile" onLoad={(e) => { mobile && admin && e.target.scrollIntoView({ block: 'center' }) }}
          style={mobile ? { ...containerStyles, margin: '0 auto', height: '100%' } : {
            height: '100vh', margin: '3rem auto',
            justifyContent: 'center', alignItems: 'start'
          }}>

          {/* {admin && mobile && <Navigation />} */}
          {mobile && <Icon className="icon-mobile-displays" onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}
          {mobileDisplays && <MobileList />}

          <Col lg={mobile ? 12 : 6}
            style={mobile ? { paddingTop: '10px', overflowY: 'scroll', height: `${mobileHeight - 20}px`, width: `${mobileWidth}px` }
              : !mobile && admin ? { width: 'fit-content' } : { marginTop: '-40px', width: '600px', height: '500px' }}>
            {admin && !mobile && <h2 style={{ color: 'brown', textAlign: 'center', padding: '10px' }}>Product nr. {singleProduct.id}</h2>}
            {singleProduct ? (
              <Card className="p-2" style={mobile ? {
                marginTop: '40px',
                height: 'fit-content', overflowY: 'hidden'
              } : admin ? { height: 'fit-content', width: '800px' } : {
                marginTop: '',
                height: `${mobileHeight - 20}px`, overflowY: 'scroll'
              }}>

                <Card.Body id="update-card" onLoad={(e) => { !mobile && document.getElementById('update-card').scrollIntoView({ block: 'center' }) }}
                  className="p-2" onClick={(window.innerWidth < 1100 || mobile) && menuShowing ? () => setMenuShowing(false) : null}
                  style={!mobile && admin ? {
                    display: 'flex', justifyContent: 'start', width: '800px',
                    height: 'fit-content', flexWrap: 'wrap', alignItems: 'start'
                  } : {}}>

                  {admin && mobile && <Card.Title className="p-2" style={{ textAlign: 'center' }}>Update a product entry</Card.Title>}
                  {error && <Alert variant="danger">{error}</Alert>}

                  <div style={!mobile && admin ? { width: '30%', height: '60%' } : {}} >
                    <div style={!mobile && admin ? {
                      zIndex: '5', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', width: '100%', maxHeight: '300px', overflow: 'hidden'
                    } : {}}>
                      <Card.Img id="update-product-image" style={!mobile && admin ? { zIndex: '4', width: prodImgSize.width } :
                        {}} src={prodImg ? prodImg : singleProduct.thumbnail} />
                    </div>

                    {!mobile && admin && <Form.Range style={{ position: 'absolute', top: '65%', width: '30%' }}
                      onChange={handleImgResize}></Form.Range>}
                    <Form onSubmit={uploadImg} style={!mobile ? {
                      left: `calc(15% - 45px)`,
                      width: '90px', textAlign: 'center', position: 'absolute', top: '72%'
                    } : { position: 'relative', width: '100%', display: 'inline-block', margin: '10px auto' }}>
                      <div style={{ height: '0px', width: '0px', overflow: 'hidden' }}>
                        <input id="upfile" type="file" onChange={updateImg} />
                      </div>
                      <input style={!mobile ? {
                        display: 'block', marginLeft: '20px', backgroundColor: 'rgb(13,110,253)', color: 'white', padding: '5px 15px',
                        borderRadius: '5px', border: '1px solid rgb(246, 212, 212)', boxShadow: '1px 1px 2px rgb(246, 212, 212)'
                      } : {
                        display: 'block', color: 'white', backgroundColor: 'rgb(13,110,253)', margin: '0 auto', borderRadius: '5px',
                        border: '1px solid rgb(246, 212, 212)', boxShadow: '1px 1px 2px rgb(246, 212, 212)', padding: '5px 15px'
                      }} type="submit" value="Upload" />
                    </Form>
                  </div>

                  <Form onSubmit={handleSubmit} style={!mobile && admin ? { width: '65%', marginLeft: '20px' } : {}}>
                    <Form.Group id="title" style={admin && !mobile ? { width: '100%' } : {}}>
                      <Form.Label className="py-2">Product name</Form.Label>
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
                      <Form.Label className="py-2">Description</Form.Label>
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
                  </Form>
                  <Form onSubmit={handleSubmit} style={!mobile && admin ? { marginTop: '40px', width: '100%', display: 'flex', alignItems: 'end', justifyContent: 'start' } : {}}>
                    <Form.Group controlId="exampleForm.ControlSelect2" style={!mobile && admin ? { marginRight: '15px', width: '31%' } : {}}>
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
                    <Form.Group id="price" style={!mobile && admin ? { marginRight: '20px', width: '31%' } : {}}>
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
                    <Form.Group
                      style={!mobile && admin ? { display: 'flex', width: '31%', justifyContent: 'center' } :
                        mobile ? { width: '100%', marginTop: '30px', display: 'flex', justifyContent: 'center' } : {
                          marginTop: '30px', justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                      <Button
                        disabled={loading}
                        type="submit"
                        style={!mobile && admin ? { width: '50%' } : { margin: '10px auto' }}
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
      </div >
    </>
  );
};

export default UpdateProduct;
