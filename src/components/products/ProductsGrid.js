//import firebase from "firebase/app";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";

import Icon from '@mui/material/Icon';


import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { db } from "../../firebase";

const ProductsGrid = ({ products, type }) => {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const { setSingleProduct, setProductOption, mobile } = useCreate();
  const [mobileDisplays, setMobileDisplays] = useState(false)
  const [mobileWidth, setMobileWidth] = useState(400);
  const [mobileHeight, setMobileHeight] = useState(750)

  const containerStyles = {
    border: mobile ? '2px solid lightgrey' : 'none',
    width: mobile ? `${mobileWidth}px` : '1000px',
    margin: mobile ? '0 auto' : '10px',
    padding: '0 10px 10px 10px',
    height: mobile ? `${mobileHeight}px` : 'none',
    borderRadius: '20px',
    position: 'relative',
    backgroundColor: mobile ? 'rgb(255, 255, 255)' : ''
  }

  const handleUpdateProduct = (product) => {
    setSingleProduct(product);
    navigate(`/cms/products/update`, { replace: true });
  };

  const handleDeleteProduct = (product) => {
    try {
      const deletion = async () => {
        console.log("ddeleteing " + product.name);

        await db.collection(`${type}`).doc(`${product.id}`).delete();
      };

      deletion();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <SRLWrapper>
    <div style={containerStyles}>
      {mobile && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(253, 246, 246' }} color='primary'>device_unknown</Icon>}
      {mobileDisplays && (<ul style={{ position: 'absolute', backgroundColor: 'rgba(255, 255, 255,0.9)', paddingLeft: '0', borderRadius: '5px', right: '20px', top: `0`, left: '0', listStyleType: 'none', zIndex: '3' }}>
        <li onClick={() => { setMobileWidth(500); setMobileHeight(600) }} className="mobile-displays-item" style={{ padding: '8px', paddingLeft: '20px', color: 'grey' }}>Samsung </li>
        <li onClick={() => { setMobileWidth(450); setMobileHeight(650) }} className="mobile-displays-item" style={{ padding: '8px', paddingLeft: '20px', color: 'grey' }}>Apple</li>
        <li onClick={() => { setMobileWidth(350); setMobileHeight(700) }} className="mobile-displays-item" style={{ padding: '8px', paddingLeft: '20px', color: 'grey' }}>Sony</li>
      </ul>)}
      <Row className="mb-5" style={{
        overflowY: 'scroll', height: mobile ? `${mobileHeight - 20}px` : '', marginTop: '0px'
      }} onLoad={() => setProductOption(type)}>
        {products &&
          products.map((item) => (
            <Col className="pl-2 pr-2" sm={6} md={4} lg={mobile ? 12 : 3} key={item.id}>
              <Card className="mb-3 mt-3">
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
                  onClick={() => setSingleProduct(item)}
                >
                  {" "}
                  <Link to={admin ? `/ cms / products / ${type} /${item.id}` : `products/${type}/${item.id}`} >
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
                  </Link>
                  {
                    admin && (
                      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                        <Button
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
    // </SRLWrapper>
  );
};

export default ProductsGrid;
