import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
// import { db } from "../../firebase";

import { BounceLoader } from "react-spinners";
import { Breadcrumb, Row } from "react-bootstrap";

import Navigation from '../Navigation'
import ProductCard from '../products/ProductCard'

import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from './../../contexts/MobileContext'

import "../../assets/scss/app.scss";
import Icon from '@mui/material/Icon';
import ArrowBack from '@mui/icons-material/ArrowBack';

import MobileList from '../../cms_components/MobileList'
import useMobileStyles from '../../hooks/useMobileStyles'

const Product = () => {
  const {
    singleProduct,
    productOption,
    // setSingleProduct,
    setLocation,
    setProdId,
  } = useCreate();

  const { admin } = useAuth();
  // const navigate = useNavigate();
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
        {!mobile && <Breadcrumb className="m-5 pt-5">
          <ArrowBack style={{ color: '#0d6efd' }} sx={{ mr: 1, ml: 1, mt: 0.4 }} fontSize="medium" />
          <Breadcrumb.Item>
            {productOption && (
              <Link to={admin ? `/cms/products/${productOption}` : `/products/${productOption}`}>{productOption}</Link>
            )}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {singleProduct ? singleProduct.name : null}
          </Breadcrumb.Item>
        </Breadcrumb>}
        <Row className="dummy-container-mobile" style={mobile && admin ? { ...containerStyles, padding: '50px 0px' } :
          { margin: '3rem auto', justifyContent: 'center' }}>
          {admin && mobile && <Navigation />}
          {mobile && admin && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{
            border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left',
            zIndex: '5', margin: '0 auto', padding: '8px',
            borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)'
          }}
            color='primary'>device_unknown</Icon>}
          {/* {mobile && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>} */}
          {mobileDisplays && <MobileList />}
          {!singleProduct && <BounceLoader color={"#888"} size={20} />}
          {singleProduct && (
            <ProductCard item={singleProduct} />
          )}
        </Row>
      </div>
    </>
  );
};

export default Product;
