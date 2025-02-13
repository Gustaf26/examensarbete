import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
// import { db } from "../../firebase";

import { BounceLoader } from "react-spinners";
import { Row } from "react-bootstrap";

import Navigation from '../Navigation'
import ProductCard from '../products/ProductCard'
import CardContainer from '../products/CardContainer'
import BreadCrumbContainer from "../BreadCrumbContainer";

import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from './../../contexts/MobileContext'

import "../../assets/scss/app.scss";
import Icon from '@mui/material/Icon';

import MobileList from '../../cms_components/MobileList'
import useMobileStyles from '../../hooks/useMobileStyles'

const Product = () => {
  const {
    singleProduct,
    productOption,
    setLocation,
    setProdId,
  } = useCreate();

  const { admin } = useAuth();

  const location = useLocation();
  const { productId } = useParams();

  const { mobile, setMobile, mobileDisplays, setMobileDisplays } = useMobile()
  const containerStyles = useMobileStyles()

  useEffect(() => {
    if (!singleProduct) {
      setLocation(location.pathname);
      setProdId(Number(productId));
      if (window.innerWidth <= 1000) setMobile(true)
    }
    console.log(location.pathname)

  }, []);



  return (
    <>
      <div id="dummy-container-products" style={admin ? {
        position: 'absolute', top: mobile ? '60px' : admin ? '0' : '120px', left: mobile ? '40px' : '240px',
        width: mobile ? 'calc(100% - 40px)' : 'calc(100% - 240px)'
      } : {}} onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>

        {location.pathname === `/cms/products/${productOption}/${productId}` && admin && !mobile && <Navigation />}
        {!mobile && <BreadCrumbContainer />}

        <Row className="dummy-container-mobile" style={mobile && admin ? { ...containerStyles, padding: '10px 10px' } :
          { margin: '3rem auto', justifyContent: 'center' }}>

          {admin && mobile && <Navigation />}

          {mobile && admin && <Icon className="icon-mobile-displays" onClick={() => setMobileDisplays(!mobileDisplays)} style={{
            border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left',
            zIndex: '5', margin: '0 auto', padding: '8px',
            borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)'
          }}
            color='primary'>device_unknown</Icon>}
          {mobileDisplays && <MobileList />}

          {!singleProduct && <BounceLoader color={"#888"} size={20} />}
          <CardContainer>
            {singleProduct && (
              <ProductCard item={singleProduct} />
            )}
          </CardContainer>
        </Row>
      </div >
    </>
  );
};

export default Product;
