//import firebase from "firebase/app";
import React from "react";
import { Link } from "react-router-dom";

import { Row, Breadcrumb } from "react-bootstrap";
import Icon from '@mui/material/Icon';
// import HomeIcon from '@mui/icons-material/Home';
import ArrowBack from '@mui/icons-material/ArrowBack';

import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from "../../contexts/MobileContext";

import MobileList from '../../cms_components/MobileList'
import useMobileStyles from '../../hooks/useMobileStyles'

import Navigation from '../Navigation'
import ProductCard from '../products/ProductCard'
import CardContainer from '../products/CardContainer'
import BreadcrumbContainer from "../BreadCrumbContainer";

const ProductsGrid = ({ products, type }) => {
  // const navigate = useNavigate();
  const { admin } = useAuth();
  const { setProductOption } = useCreate();
  const { mobile, mobileDisplays, setMobileDisplays } = useMobile()

  const containerStyles = useMobileStyles()



  return (
    <div id="dummy-container-products" style={admin ? {
      position: 'absolute', top: mobile ? '60px' : '120px', left: mobile ? '40px' : '240px',
      width: mobile ? 'calc(100% - 40px)' : 'calc(100% - 240px)'
    } : {}} onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>
      {!mobile && <BreadcrumbContainer />}
      <Row onLoad={() => setProductOption(type)} style={mobile && admin ? { ...containerStyles, padding: '10px 10px' } :
        { margin: '3rem auto', justifyContent: 'center' }}>

        {admin && mobile && <Navigation />}

        {mobile && admin && <Icon className="icon-mobile-displays" onClick={() => setMobileDisplays(!mobileDisplays)} style={{
          border: '1px solid lightgrey',
          width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px',
          borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)'
        }}
          color='primary'>device_unknown</Icon>}

        {mobileDisplays && <MobileList />}

        <CardContainer>
          {products &&
            products.map((item, i) => (
              <ProductCard key={item.id} onLoad={(e) => i === 0 && e.target.scrollIntoView({ block: 'start' })} item={item} />
            ))}
        </CardContainer>
      </Row >
    </div >
  );
};

export default ProductsGrid;
