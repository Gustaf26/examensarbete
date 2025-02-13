import React, { useEffect } from "react";
// import { db } from "../../firebase";

import { Link, useLocation } from "react-router-dom";
import { Row, Breadcrumb } from "react-bootstrap";


import Icon from '@mui/material/Icon';

import Navigation from '../Navigation'
import MobileList from '../../cms_components/MobileList'
import CardContainer from '../products/CardContainer'
import ProductCard from "../products/ProductCard";

import { useCreate } from "../../contexts/CreateContext";
import { useAuth } from "../../contexts/AuthContext";
import { useMobile } from "../../contexts/MobileContext";

import useMobileStyles from '../../hooks/useMobileStyles'

const SearchResults = () => {
  // const navigate = useNavigate();
  const {
    searchResults,
    setLocation,
  } = useCreate();

  const { admin } = useAuth();
  const location = useLocation();

  const { mobile, mobileDisplays, setMobileDisplays } = useMobile()
  const containerStyles = useMobileStyles()


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
      <div id="dummy-container-products" style={admin ? {
        position: 'absolute', top: mobile ? '60px' : '120px', left: mobile ? '40px' : '240px',
        width: mobile ? 'calc(100% - 40px)' : 'calc(100% - 240px)'
      } : {}} onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>
        <Row style={mobile && admin ? { ...containerStyles, padding: '10px 10px', marginTop: '3rem' } :
          { margin: '3rem auto', justifyContent: 'center' }}>
          {admin && mobile && <Navigation />}
          {mobile && admin && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}
          {mobileDisplays && <MobileList />}
          <CardContainer>
            {searchResults.length > 0 &&
              searchResults.map((item, i) => (
                <ProductCard key={item.id} onLoad={(e) => i === 0 && e.target.scrollIntoView({ block: 'start' })} item={item} />
              ))}
          </CardContainer>
        </Row>
      </div>
    </>
  );
};

export default SearchResults;
