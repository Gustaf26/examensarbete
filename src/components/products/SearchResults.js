import React, { useEffect, useState } from "react";
// import { db } from "../../firebase";
import { Suspense, lazy } from "react";

import { Link, useLocation } from "react-router-dom";
import { Row, Breadcrumb } from "react-bootstrap";

import { BounceLoader } from "react-spinners";


import Icon from '@mui/material/Icon';
// import ArrowBack from '@mui/icons-material/ArrowBack';


import Navigation from '../Navigation'
import MobileList from '../../cms_components/MobileList'
import CardContainer from '../products/CardContainer'
// import ProductCard from "../products/ProductCard";
import BreadcrumbContainer from "../BreadCrumbContainer";


import { useCreate } from "../../contexts/CreateContext";
import { useAuth } from "../../contexts/AuthContext";
import { useMobile } from "../../contexts/MobileContext";

import useMobileStyles from '../../hooks/useMobileStyles'


const ProductCard = lazy(() =>
  import("../products/ProductCard.js"));


const SearchResults = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const {
    searchResults,
    setLocation,
  } = useCreate();

  const { admin } = useAuth();
  const location = useLocation();

  const { mobile, mobileDisplays, setMobileDisplays } = useMobile()
  const { containerStyles, microMobile } = useMobileStyles()


  useEffect(() => {
    setLocation(location.pathname);
    if (searchResults.length === 0) { setLoading(false) }
  }, []);

  return (
    <>
      {!mobile && admin && <Navigation />}
      {loading && (
        <div style={{ marginTop: '10%' }} className="d-flex justify-content-center align-items-center">
          <BounceLoader color={"#888"} size={100} />
        </div>
      )}
      <div id="dummy-container-products" style={loading ? { visibility: 'hidden' } : admin ? {
        position: 'absolute', top: mobile ? '60px' : '200px', left: mobile ? '40px' : '240px',
        width: mobile ? 'calc(100% - 40px)' : 'calc(100%)', paddingRight: !mobile && admin ? '200px' : ''
      } : {}} onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>

        {!mobile && <BreadcrumbContainer />}

        <Row style={mobile && admin ? { ...containerStyles, padding: '10px 10px' }
          : mobile ? { margin: '5rem auto', justifyContent: 'center' }
            : { margin: '1rem auto', justifyContent: 'center' }}>
          {admin && mobile && <Navigation />}

          {mobile && admin && !microMobile && <Icon className="icon-mobile-displays" onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}

          {mobileDisplays && <MobileList />}


          <CardContainer>
            <Suspense fallback={<BounceLoader />}>
              {searchResults.length > 0 &&
                searchResults.map((item, i) => (
                  <ProductCard setLoading={setLoading} index={i} key={item.id} onLoad={(e) => {
                    if (i === 0) e.target.scrollIntoView({ block: 'start' })
                  }} item={item} />
                ))}
            </Suspense>
          </CardContainer>

        </Row>
      </div>
    </>
  );
};

export default SearchResults;
