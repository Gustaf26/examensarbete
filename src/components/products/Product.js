import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router";

import { BounceLoader } from "react-spinners";
import { Row } from "react-bootstrap";

import Navigation from '../Navigation'
import ProductCard from '../products/ProductCard'
import CardContainer from '../products/CardContainer'
import BreadCrumbContainer from "../BreadCrumbContainer";

import { useCreate } from "../../contexts/CreateContext";
import { useMobile } from './../../contexts/MobileContext'
import { useAuth } from "../../contexts/AuthContext";

import "../../assets/scss/app.scss";
import Icon from '@mui/material/Icon';

import MobileList from '../../cms_components/MobileList'
import useMobileStyles from '../../hooks/useMobileStyles'

const Product = () => {

  const [loading, setLoading] = React.useState(true)

  const {
    singleProduct,
    setSingleProduct,
    setLocation,
    setProdId,
    allProducts,
    setProductOption
  } = useCreate();

  const { admin } = useAuth();

  const location = useLocation();
  const { productId } = useParams();

  const { mobile, setMobile, mobileDisplays, setMobileDisplays } = useMobile()
  const { containerStyles, microMobile } = useMobileStyles()


  // This effect is for when page is reloaded
  // Updates location and context vars to get single prod 
  useEffect(() => {
    if (!singleProduct && productId) {

      setLocation(location.pathname);
      setProdId(Number(productId));

      let singleP = allProducts.filter(prod => prod.id === Number(productId))

      if (singleP[0]) { setSingleProduct(singleP[0]); setProductOption(singleP[0].category); }
      if (window.innerWidth <= 1000) setMobile(true)
    }

  }, [allProducts]);

  useEffect(() => {
    setLocation(location.pathname)
  }, [location])

  return (
    <>
      {loading === 0 && (
        <div style={{ marginTop: '10%' }} className="d-flex justify-content-center align-items-center">
          <BounceLoader color={"#888"} size={100} />
        </div>
      )}
      <div id="dummy-container-products"
        className={microMobile ? 'dummy-container-products micromobile' : admin && mobile ? 'dummy-container-products admin mobile' :
          admin ? 'dummy-container-products admin' : mobile ? 'dummy-container-products mobile' : 'dummy-container-products'}
        onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>

        {((admin && microMobile) || (admin && !mobile)) && <Navigation />}

        {!(admin && mobile) && <BreadCrumbContainer />}

        <Row className={microMobile ? 'dummy-container-products-row micromobile' : admin && mobile ? 'dummy-container-products-row admin mobile' :
          admin ? 'dummy-container-products-row admin' : mobile ? 'dummy-container-products-row mobile' : 'dummy-container-products-row'}
          style={mobile && admin && !microMobile ? { ...containerStyles } : {}}>

          {admin && mobile && !microMobile && <Navigation />}

          {mobile && admin && !microMobile && <Icon className="icon-mobile-displays" onClick={() => setMobileDisplays(!mobileDisplays)}
            color='primary'>device_unknown</Icon>}
          {mobileDisplays && <MobileList />}

          {!singleProduct && <BounceLoader color={"#888"} size={20} />}
          <CardContainer style={{ visibility: loading !== 1 ? 'hidden' : 'visible' }} onLoad={(e) => { mobile && e.target.scrollIntoView({ block: 'start', behaviour: 'smooth' }) }}>
            {singleProduct && (
              <ProductCard setLoading={setLoading} index={0} item={singleProduct} />
            )}
          </CardContainer>
        </Row>
      </div >
    </>
  );
};

export default Product;
