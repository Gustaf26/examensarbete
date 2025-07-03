import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { Row, Card } from "react-bootstrap";
import Icon from '@mui/material/Icon';

import Navigation from '../../components/Navigation'
import MobileList from '../../cms_components/MobileList'
import CardContainer from '../../components/products/CardContainer'
import BreadcrumbContainer from "../../components/BreadCrumbContainer";
import ProductCard from "../../components/products/ProductCard";


import { useCreate } from "../../contexts/CreateContext";
import { useAuth } from "../../contexts/AuthContext";
import { useMobile } from "../../contexts/MobileContext";

import useMobileStyles from '../../hooks/useMobileStyles'


const SearchResults = () => {

  const [loading, setLoading] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const {
    searchResults,
    setLocation,
    setSearchString,
  } = useCreate();

  const { admin } = useAuth();
  const location = useLocation();

  const { mobile, mobileDisplays, setMobileDisplays } = useMobile()
  const { containerStyles, microMobile } = useMobileStyles()


  useEffect(() => {
    setLocation(location.pathname);

  }, [searchResults, loading]);

  useEffect(() => {

    setTimeout(() => {
      setLoaded(true)
    }, 2500)


    return () => {
      setSearchString(''); setLoaded(false)
    }

  }, [])


  useEffect(() => {
    setLocation(location.pathname)
  }, [location])

  return (
    <>
      <div id="dummy-container-products" className={microMobile ? 'dummy-container-products micromobile' : admin && mobile ? 'dummy-container-products admin mobile' :
        admin ? 'dummy-container-products admin' : mobile ? 'dummy-container-products mobile' : 'dummy-container-products'}
        onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>

        {((admin && !mobile) || (admin && microMobile)) && <Navigation />}
        {!mobile && <BreadcrumbContainer />}

        <Row className={microMobile ? 'dummy-container-products-row micromobile' : admin && mobile ? 'dummy-container-products-row admin mobile' :
          admin ? 'dummy-container-products-row admin' : mobile ? 'dummy-container-products-row mobile' : 'dummy-container-products-row'}
          style={microMobile ? { marginTop: '3rem', top: '0px' } : mobile && admin ? { ...containerStyles, padding: '10px 10px' }
            : {}}>
          {admin && mobile && !microMobile && <Navigation />}

          {mobile && admin && !microMobile && <Icon className="icon-mobile-displays"
            onClick={() => setMobileDisplays(!mobileDisplays)}
            style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}

          {mobileDisplays && <MobileList />}

          <CardContainer style={{ margin: microMobile && admin ? '5rem auto' : '3rem auto' }}>
            {searchResults.length > 0 &&
              searchResults.map((item, i) => (
                <ProductCard setLoading={setLoading} key={item.id} onLoad={(e) => {
                  if (i === 0) e.target.scrollIntoView({ block: 'start' })
                }} item={item} />
              ))}
          </CardContainer>
        </Row>
      </div>
    </>
  );
};

export default SearchResults;
