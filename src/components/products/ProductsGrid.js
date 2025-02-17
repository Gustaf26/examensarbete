//import firebase from "firebase/app";
import React from "react";
// import { Link } from "react-router-dom";

import { Row } from "react-bootstrap";
import Icon from '@mui/material/Icon';

import { BounceLoader } from "react-spinners";


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

  const [loading, setLoading] = React.useState(true)
  // const navigate = useNavigate();
  const { admin } = useAuth();
  const { setProductOption } = useCreate();
  const { mobile, mobileDisplays, setMobileDisplays } = useMobile()

  const { containerStyles, microMobile } = useMobileStyles()



  return (<>
    {loading && (
      <div style={{ marginTop: '10%' }} className="d-flex justify-content-center align-items-center">
        <BounceLoader color={"#888"} size={100} />
      </div>
    )}
    <div id="dummy-container-products"
      style={admin ? {
        position: 'absolute', top: mobile ? '60px' : '220px', left: mobile ? '40px' : '240px',
        width: mobile ? 'calc(100% - 40px)' : 'calc(100% - 240px)', paddingRight: !mobile && admin ? '200px' : ''
      } : {}} onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>
      {!(admin && mobile) && <BreadcrumbContainer />}

      <Row id="dummy-container-mobile" onLoad={(e) => { setProductOption(type) }}
        style={mobile && admin ? { ...containerStyles, padding: '10px 10px' } : mobile ? {
          marginTop: '5rem', padding: '20px',
          display: 'flex', justifyContent: 'center'
        } :
          admin ? { margin: '-3rem auto', justifyContent: 'center' } : {}}>

        {admin && mobile && <Navigation />}

        {mobile && admin && !microMobile && <Icon className="icon-mobile-displays" onClick={() => setMobileDisplays(!mobileDisplays)} style={{
          border: '1px solid lightgrey',
          width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px',
          borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)'
        }}
          color='primary'>device_unknown</Icon>}

        {mobileDisplays && <MobileList />}

        <CardContainer onLoad={(e) => e.target.scrollIntoView({ block: 'start' })}>

          {products &&
            products.map((item, i) => (
              <ProductCard setLoading={setLoading} index={i} id={`${item.id}`} key={item.id} item={item} />
            ))}

        </CardContainer>
      </Row >
    </div >
  </>
  );
};

export default ProductsGrid;
