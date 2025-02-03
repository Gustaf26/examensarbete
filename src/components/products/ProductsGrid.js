//import firebase from "firebase/app";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";
import Icon from '@mui/material/Icon';

import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";

import MobileList from '../../cms_components/MobileList'
import useMobileStyles from '../../hooks/useMobileStyles'

import Navigation from '../Navigation'

const ProductsGrid = ({ products, type }) => {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const { setSingleProduct, setProductOption } = useCreate();
  const { mobile, mobileDisplays, setMobileDisplays, mobileHeight } = useMobile()

  const containerStyles = useMobileStyles()

  const handleUpdateProduct = (product) => {

    navigate(`/cms/products/update/`, { replace: true });
  };

  const handleDeleteProduct = (product) => {
    try {
      const deletion = () => {
        console.log("ddeleteing " + product.name);
        alert('I don´t want to delete products, sorry')
        // await db.collection(`${type}`).doc(`${product.id}`).delete();
      };

      deletion();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="dummy-container-products" onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>
      <div style={mobile ? containerStyles : null}>
        {mobile && <Navigation />}
        {mobile && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}
        {mobileDisplays && <MobileList />}
        <Row className="mb-5" style={mobile ? {
          overflowY: 'scroll', height: `${mobileHeight - 20}px`, marginTop: '0px'
        } : { overflowY: 'hidden', display: 'flex', justifyContent: 'center' }} onLoad={() => setProductOption(type)}>
          {products &&
            products.map((item) => (
              <Col style={mobile ? { width: '100%' } : { width: '300px' }} className="pl-2 pr-2" lg={mobile ? 12 : 4} key={item.id}>
                <Card className="mb-2 mt-0 p-2">
                  <a
                    href={item.thumbnail}
                    title="View image in lightbox"
                    data-attribute="SRL"
                  >
                    <Card.Img
                      variant="top"
                      src={item.thumbnail}
                      title={item.name}
                    />
                  </a>
                  <Card.Body
                    className="d-block"
                    onClick={(e) => {
                      setSingleProduct(item);
                      if (e.target.id === 'updateProduct') navigate(`/cms/products/update/`, { replace: true })
                      else if (admin) navigate(`/cms/products/${item.category}/${item.id}`, { replace: true })
                    }}
                  >
                    {" "}
                    {/* <Link to={admin ? `/ cms / products / ${type} /${item.id}` : `products/${type}/${item.id}`} > */}
                    <Card.Text className="text-muted small">
                      <b>{item.name}</b>
                    </Card.Text>
                    <Card.Text className="text-muted small">
                      <b>Price: </b> {item.price} €
                    </Card.Text>
                    <Card.Text className="text-muted small">
                      <b>Description: </b>{" "}
                      <span>
                        {item.description.slice(0, 100)}... <b>(Read more)</b>
                      </span>
                    </Card.Text>
                    {/* </Link> */}
                    {
                      admin && (
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                          <Button
                            id="deleteProduct"
                            variant="danger"
                            size="sm"
                            className="col-5 mt-3 mr-1 p-2"
                            onClick={() => {
                              handleDeleteProduct(item);
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            id="updateProduct"
                            variant="secondary"
                            size="sm"
                            className="col-5 mt-3 ml-3 p-2"
                            onClick={() => {
                              handleUpdateProduct(item);
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      )
                    }
                  </Card.Body >
                </Card >
              </Col >
            ))}
        </Row >
      </div >
    </div>
  );
};

export default ProductsGrid;
