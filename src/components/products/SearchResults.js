import React, { useEffect, useState, useTransition } from "react";
// import { db } from "../../firebase";
// import { Suspense, lazy } from "react";

import { useLocation } from "react-router-dom";
import { Row, Alert } from "react-bootstrap";

import { BounceLoader } from "react-spinners";


import Icon from '@mui/material/Icon';
// import ArrowBack from '@mui/icons-material/ArrowBack';


import Navigation from '../Navigation'
import MobileList from '../../cms_components/MobileList'
import CardContainer from '../products/CardContainer'
// import ProductCard from "../products/ProductCard";
import BreadcrumbContainer from "../BreadCrumbContainer";
import ProductCard from "../products//ProductCard";


import { useCreate } from "../../contexts/CreateContext";
import { useAuth } from "../../contexts/AuthContext";
import { useMobile } from "../../contexts/MobileContext";

import useMobileStyles from '../../hooks/useMobileStyles'




const SearchResults = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [isPending, startTransition] = useTransition()

  const {
    searchResults,
    setLocation,
    setSearchString,
    searchString
  } = useCreate();

  const { admin } = useAuth();
  const location = useLocation();

  const { mobile, mobileDisplays, setMobileDisplays } = useMobile()
  const { containerStyles, microMobile } = useMobileStyles()



  useEffect(() => {
    setLocation(location.pathname);

    startTransition(() => {
      if (loading === searchResults.length) {
        setLoaded(true)
      }
    })
  }, [searchResults, loading]);

  useEffect(() => {

    return () => {
      setSearchString('')
    }

  }, [])

  return (
    <>
      {/* {!mobile && admin && <Navigation />} */}

      <div id="dummy-container-products" className={microMobile ? 'dummy-container-products micromobile' : admin && mobile ? 'dummy-container-products admin mobile' :
        admin ? 'dummy-container-products admin' : mobile ? 'dummy-container-products mobile' : 'dummy-container-products'}
        onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>

        {(microMobile || (admin && !mobile)) && <Navigation />}
        {!mobile && <BreadcrumbContainer />}

        <Row className={microMobile ? 'dummy-container-products-row micromobile' : admin && mobile ? 'dummy-container-products-row admin mobile' :
          admin ? 'dummy-container-products-row admin' : mobile ? 'dummy-container-products-row mobile' : 'dummy-container-products-row'}
          style={mobile && admin ? { ...containerStyles, padding: '10px 10px' }
            : {}}>
          {admin && mobile && <Navigation />}

          {mobile && admin && !microMobile && <Icon className="icon-mobile-displays"
            onClick={() => setMobileDisplays(!mobileDisplays)}
            style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}

          {mobileDisplays && <MobileList />}

          <CardContainer>
            {searchResults.length > 0 &&
              searchResults.map((item, i) => (
                <ProductCard setLoading={setLoading} key={item.id} onLoad={(e) => {
                  if (i === 0) e.target.scrollIntoView({ block: 'start' })
                }} item={item} />
              ))}

            {!loaded ? (<div style={{ marginTop: '10%' }} className="d-flex justify-content-center align-items-center">
              <BounceLoader color={"#888"} size={100} />
            </div>) : null}
          </CardContainer>

        </Row>
      </div>
    </>
  );
};

export default SearchResults;
