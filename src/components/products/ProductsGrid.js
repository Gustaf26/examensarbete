//import firebase from "firebase/app";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Row, Col, Breadcrumb } from "react-bootstrap";
import Icon from '@mui/material/Icon';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBack from '@mui/icons-material/ArrowBack';

import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";

import MobileList from '../../cms_components/MobileList'
import useMobileStyles from '../../hooks/useMobileStyles'

import Navigation from '../Navigation'
import ProductCard from '../products/ProductCard'
import CardContainer from '../products/CardContainer'

const ProductsGrid = ({ products, type }) => {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const { setProductOption } = useCreate();
  const { mobile, mobileDisplays, setMobileDisplays, mobileHeight, mobileWidth, menuShowing, setMenuShowing } = useMobile()

  const containerStyles = useMobileStyles()



  return (
    <div id="dummy-container-products" style={admin ? {
      position: 'absolute', top: mobile ? '60px' : '120px', left: mobile ? '40px' : '240px',
      width: mobile ? 'calc(100% - 40px)' : 'calc(100% - 240px)'
    } : {}} onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>
      {!mobile && <Breadcrumb className="m-5 pt-5">
        <ArrowBack style={{ color: ' brown' }} sx={{ mr: 1, ml: 1, mt: 0.4 }} fontSize="medium" />
        <Breadcrumb.Item >
          <Link to={admin ? "/cms/index" : "/"}> Home</Link>
        </Breadcrumb.Item>
      </Breadcrumb>}
      <Row onLoad={() => setProductOption(type)} style={mobile && admin ? { ...containerStyles, justifyContent: 'center', width: `${mobileWidth}px` }
        : mobile ? { width: '100%', margin: '3rem auto', padding: '0' } : { marginTop: '1rem' }}>

        {admin && mobile && <Navigation />}

        {mobile && admin && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{
          border: '1px solid lightgrey',
          width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px',
          borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)'
        }}
          color='primary'>device_unknown</Icon>}

        {mobileDisplays && <MobileList />}

        <CardContainer>
          {products &&
            products.map((item, i) => (
              <ProductCard onLoad={(e) => i === 0 && e.target.scrollIntoView({ block: 'start' })} item={item} />
            ))}
        </CardContainer>
      </Row >
    </div >
  );
};

export default ProductsGrid;
