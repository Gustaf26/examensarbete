import React, { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";

import { BounceLoader } from "react-spinners";
import { Card, Button, Breadcrumb, Row } from "react-bootstrap";
import Navigation from '../Navigation'

import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from './../../contexts/MobileContext'

import "../../assets/scss/app.scss";
import Icon from '@mui/material/Icon';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import MobileList from '../../cms_components/MobileList'
import useMobileStyles from '../../hooks/useMobileStyles'

const Product = () => {
  const {
    singleProduct,
    productOption,
    setSingleProduct,
    setLocation,
    setProdId,
  } = useCreate();

  const { admin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();

  const { mobile, mobileDisplays, setMobileDisplays, menuShowing, setMenuShowing } = useMobile()
  const containerStyles = useMobileStyles()

  useEffect(() => {
    if (!singleProduct) {
      setLocation(location.pathname);
      setProdId(productId);
    }
    console.log(location.pathname)

  }, []);

  const handleUpdateProduct = (product) => {
    setSingleProduct(product);
    navigate(`/cms/products/update`, { replace: true });
  };

  const handleDeleteProduct = (product) => {
    try {
      const deletion = async () => {
        console.log("deleteing " + product.name + "of" + productOption);

        db.collection(`${productOption}`).doc(`${product.id}`).delete();

        setTimeout(() => {
          navigate(`/products/${productOption}`);
        }, 1000);
      };

      deletion();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="dummy-container-products" onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>
        {location.pathname === `/cms/products/${productOption}/${productId}` && admin && !mobile && <Navigation />}
        {!mobile && <Breadcrumb className="m-5">
          <Breadcrumb.Item>
            <Link to={admin ? "/cms/index" : "/"}> <HomeIcon sx={{ mr: 1, mb: 0.3 }} fontSize="medium" />Home</Link>
          </Breadcrumb.Item>
          <NavigateNextIcon style={{ color: '#0d6efd' }} sx={{ mr: 1, ml: 1, mt: 0.4 }} fontSize="medium" />
          <Breadcrumb.Item>
            {productOption && (
              <Link to={admin ? `/cms/products/${productOption}` : `/products/${productOption}`}>{productOption}</Link>
            )}
          </Breadcrumb.Item>
          <NavigateNextIcon style={{ color: '#0d6efd' }} sx={{ mr: 1, ml: 1, mt: 0.4 }} fontSize="medium" />
          <Breadcrumb.Item active>
            {singleProduct ? singleProduct.name : null}
          </Breadcrumb.Item>
        </Breadcrumb>}
        <Row className="dummy-container-mobile" style={mobile ? { ...containerStyles, margin: '3rem auto', padding: '10px 0px' } : { margin: '3rem auto', justifyContent: 'center' }}>
          {admin && mobile && <Navigation />}
          {mobile && admin && <Icon style={{
            border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left',
            zIndex: '5', margin: '0 auto', padding: '8px',
            borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)'
          }}
            color='primary'>device_unknown</Icon>}
          {/* {mobile && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>} */}
          {mobileDisplays && <MobileList />}
          {!singleProduct && <BounceLoader color={"#888"} size={20} />}
          {singleProduct && (
            <Card onClick={(window.innerWidth < 1100 || mobile) && menuShowing ? (e) => { setMenuShowing(false) } : null}
              className="mb-3 col-6 pt-3 mx-3 mb-5 singleCard justify-content-start"
              style={{ paddingTop: mobile ? '3rem !important' : 'none', height: '100%', width: mobile ? 'fit-content' : '400px', overflowY: mobile && admin ? 'scroll' : 'hidden' }}>
              <h2 className="mb-3 col-12 d-flex justify-content-center">
                {" "}
                {singleProduct && singleProduct.name}
              </h2>
              <p
                href={singleProduct.thumbnail}
                title="View image in lightbox"
                data-attribute="SRL"
              >
                <Card.Img
                  variant="top"
                  src={singleProduct.thumbnail}
                  title={singleProduct.name}
                />
              </p>
              <Card.Body>
                <Card.Text className="text-muted small">
                  <b>{singleProduct.name}</b>
                </Card.Text>
                <Card.Text className="text-muted small">
                  <b>Price: </b> {singleProduct.price} €
                </Card.Text>
                <Card.Text className="text-muted small">
                  <b>Description: </b>{" "}
                  <span>
                    {singleProduct.description && singleProduct.description}
                  </span>
                </Card.Text>
                {admin && (
                  <div>
                    <Button
                      variant="danger"
                      size="sm"
                      className="col-12 mt-3 p-2"
                      onClick={() => {
                        handleDeleteProduct(singleProduct);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="col-12 mt-3 p-2"
                      onClick={() => {
                        handleUpdateProduct(singleProduct);
                      }}
                    >
                      Update
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Row>
      </div>
    </>
  );
};

export default Product;
