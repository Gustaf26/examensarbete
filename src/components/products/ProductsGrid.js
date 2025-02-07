//import firebase from "firebase/app";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";
import Icon from '@mui/material/Icon';
import { Breadcrumb } from "react-bootstrap";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
  const { mobile, mobileDisplays, setMobileDisplays, mobileHeight, mobileWidth, menuShowing, setMenuShowing } = useMobile()

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
      {!mobile && <Breadcrumb className="m-5 pt-5">
        <HomeIcon sx={{ mr: 1, mb: 0 }} fontSize="medium" />
        <Breadcrumb.Item >
          <Link to={admin ? "/cms/index" : "/"}> Home</Link>
        </Breadcrumb.Item>
        <NavigateNextIcon style={{ color: ' brown' }} sx={{ mr: 1, ml: 1, mt: 0.4 }} fontSize="medium" />
        <Breadcrumb.Item>
          {type && (
            <Link to={admin ? `/cms/products/${type}` : `/products/${type}`}>{type}</Link>
          )}
        </Breadcrumb.Item>
      </Breadcrumb>}
      <Row style={mobile && admin ? { ...containerStyles, justifyContent: 'center', width: `${mobileWidth}px` }
        : mobile ? { width: '100%', marginTop: '3rem' } : { marginTop: '1rem' }}>

        {admin && mobile && <Navigation />}

        {mobile && admin && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{
          border: '1px solid lightgrey',
          width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px',
          borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)'
        }}
          color='primary'>device_unknown</Icon>}

        {mobileDisplays && <MobileList />}

        <Row onClick={(window.innerWidth < 1100 || mobile) && menuShowing ? () => setMenuShowing(false) : null}
          className="mb-5"
          style={mobile && admin ? {
            overflowY: 'scroll', height: `calc(${mobileHeight - 20}px - 3rem)`, width: `105%`, marginTop: '3rem'
          } : { overflowY: 'hidden', display: 'flex', justifyContent: 'center' }} onLoad={() => setProductOption(type)}>
          {products &&
            products.map((item) => (
              <Col style={mobile && admin ? { width: '100%' } : mobile ? { width: '330px', margin: '0 auto' } :
                { width: '330px' }} className="pl-2 pr-2" lg={mobile && admin ? 12 : 4} key={item.id}>
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
                      else navigate(admin ? `/cms/products/${item.category}/${item.id}` : `/products/${item.category}/${item.id}`, { replace: true })
                    }}
                  >
                    {" "}
                    {/* <Link to={admin ? `/ cms / products / ${type} /${item.id}` : `products/${type}/${item.id}`} > */}
                    <Card.Text style={{ color: 'rgb(79, 48, 48)' }} className="small">
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
      </Row >
    </div>
  );
};

export default ProductsGrid;
