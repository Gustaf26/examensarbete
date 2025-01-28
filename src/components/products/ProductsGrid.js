//import firebase from "firebase/app";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';


import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from './../../contexts/MobileContext'

import useMobileStyles from '../../hooks/useMobileStyles'

import { db } from "../../firebase";

const ProductsGrid = ({ products, type }) => {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const { setSingleProduct, setProductOption, setProdId } = useCreate();
  const { mobile, mobileDisplays, setMobileDisplays, setMobileWidth, mobileHeight, setMobileHeight } = useMobile()

  const containerStyles = useMobileStyles()

  const [selectedIndex, setSelectedIndex] = useState(0)

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
    <div id="dummy-container-products" onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>
      <div style={mobile ? containerStyles : null}>
        {mobile && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}

        {mobileDisplays && <List style={{ position: 'absolute', backgroundColor: 'rgba(255, 255, 255,0.9)', paddingLeft: '0', borderRadius: '5px', right: '20px', top: `0`, left: '0', listStyleType: 'none', zIndex: '3' }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton id="0" selected={selectedIndex === '0'} onClick={(e) => { setSelectedIndex('0'); setMobileWidth(500); setMobileHeight(600) }} className="mobile-displays-item" >
              <ListItemText primary={'Samsung'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton id="0" selected={selectedIndex === '1'} onClick={(e) => { setSelectedIndex('1'); setMobileWidth(450); setMobileHeight(650) }} className="mobile-displays-item" >
              <ListItemText primary={'Apple'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton id="0" selected={selectedIndex === '2'} onClick={(e) => { setSelectedIndex('2'); setMobileWidth(350); setMobileHeight(700) }} className="mobile-displays-item" >
              <ListItemText primary={'Sony'} />
            </ListItemButton>
          </ListItem>
        </List>}
        <Row className="mb-5" style={{
          overflowY: mobile ? 'scroll' : 'hidden', height: mobile ? `${mobileHeight - 20}px` : '', marginTop: '0px'
        }} onLoad={() => setProductOption(type)}>
          {products &&
            products.map((item) => (
              <Col className="pl-2 pr-2" sm={6} md={4} lg={mobile ? 12 : 3} key={item.id}>
                <Card className="mb-2 mt-0">
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
                    onClick={() => { setSingleProduct(item); if (admin) navigate(`/cms/products/${item.category}/${item.id}`, { replace: true }) }}
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
    </div>
  );
};

export default ProductsGrid;
