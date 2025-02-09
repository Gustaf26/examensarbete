import React, { useEffect } from "react";
import { db } from "../../firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Card, Button, Breadcrumb } from "react-bootstrap";
import Navigation from '../Navigation'
import Icon from '@mui/material/Icon';

import MobileList from '../../cms_components/MobileList'

import { useCreate } from "../../contexts/CreateContext";
import { useAuth } from "../../contexts/AuthContext";
import { useMobile } from "../../contexts/MobileContext";

import useMobileStyles from '../../hooks/useMobileStyles'

const SearchResults = () => {
  const navigate = useNavigate();
  const {
    setSingleProduct,
    setProductOption,
    searchResults,
    setSearchResults,
    productOption,
    setLocation,
  } = useCreate();

  const { admin } = useAuth();
  const location = useLocation();

  const { mobile, mobileDisplays, setMobileDisplays, mobileHeight, menuShowing, setMenuShowing } = useMobile()
  const containerStyles = useMobileStyles()

  const handleUpdateProduct = (product) => {
    setSingleProduct(product);
    navigate(`/update`);
  };

  const handleDeleteProduct = (product) => {
    console.log(product);

    try {
      const deletion = async () => {
        console.log("ddeleteing " + productOption + product.name);

        await db
          .collection(`${productOption}`)
          .doc(`${product.id}`)
          .delete()
          .then(setSearchResults([]))
          .then(navigate(`/products/${productOption}`));
      };

      deletion();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLocation(location.pathname);
  }, []);

  return (
    <>
      {!mobile && admin && <Navigation />}
      {!mobile && <Breadcrumb className="m-5 pt-5">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Search results</Breadcrumb.Item>
      </Breadcrumb>}
      <div id="dummy-container-products" onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>
        <Row style={mobile && admin ? { ...containerStyles, marginTop: '5rem', padding: '0' } : mobile ? { width: "100%", marginTop: '5rem' }
          : { padding: '20px' }}>
          {admin && mobile && <Navigation />}
          {mobile && admin && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}
          {mobileDisplays && <MobileList />}
          <Row onClick={window.innerWidth < 1100 && menuShowing ? () => setMenuShowing(false) : null}
            style={mobile && admin ? {
              overflowY: 'scroll', height: `${mobileHeight - 20}px`, margin: '0px 2px', width: '100%', padding: '0'
            } : { maxWidth: admin ? 'calc(100vw - 240px)' : '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Col style={mobile && admin ? { width: '100%' } : mobile ? { width: '330px', margin: '0 auto' } :
              { display: 'flex', width: '100%', flexWrap: 'wrap' }} lg={mobile && admin ? 12 : 4}
              onClick={() => { if (menuShowing) setMenuShowing(false); if (mobileDisplays) setMobileDisplays(!mobileDisplays) }}>
              {searchResults &&
                searchResults.map((item) => (
                  <Card key={item.id} style={mobile && admin ? { width: '100%' } : { width: '330px', margin: '0 auto' }} className="mb-3 p-2 mx-auto">
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
                        setProductOption(item.category);
                        if (e.target.id === 'updateProduct') navigate(`/cms/products/update/`, { replace: true })
                        else navigate(admin ? `/cms/products/${item.category}/${item.id}` : `/products/${item.category}/${item.id}`, { replace: true })
                      }}
                    >
                      {" "}
                      <Link to={`/products/${item.category}/${item.id}`}>
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
                      {admin && (
                        <div className="d-flex justify-content-around">
                          <Button
                            variant="danger"
                            size="sm"
                            className="col-5 mt-3 ml-3 p-2"
                            onClick={() => {
                              handleDeleteProduct(item);
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="col-5 mt-3 ml-2 p-2"
                            onClick={() => {
                              handleUpdateProduct(item);
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                ))}
            </Col>
          </Row>
        </Row>
      </div>
    </>
  );
};

export default SearchResults;
