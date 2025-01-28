import React from "react";

import { Breadcrumb, Card } from "react-bootstrap";
import Icon from '@mui/material/Icon';

import { useMobile } from '../contexts/MobileContext'
import useMobileStyles from "../hooks/useMobileStyles";

const Home = () => {

  const { mobile, mobileDisplays, setMobileDisplays, setMobileWidth, setMobileHeight } = useMobile()
  const containerStyles = useMobileStyles()

  return (
    <>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
      </Breadcrumb>
      <Card style={mobile ? containerStyles : null} lg={mobile ? 12 : 6} className="mb-3 main-card col-sm-12 col-md-6 mx-auto mb-5 justify-content-center">

        {mobile && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{ border: '1px solid lightgrey', width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)' }} color='primary'>device_unknown</Icon>}
        {mobileDisplays && (<ul style={{ position: 'absolute', backgroundColor: 'rgba(255, 255, 255,0.9)', paddingLeft: '0', borderRadius: '5px', right: '20px', top: `0`, left: '0', listStyleType: 'none', zIndex: '3' }}>
          <li onClick={() => { setMobileWidth(500); setMobileHeight(600) }} className="mobile-displays-item" style={{ padding: '8px', paddingLeft: '20px', color: 'grey' }}>Samsung </li>
          <li onClick={() => { setMobileWidth(450); setMobileHeight(650) }} className="mobile-displays-item" style={{ padding: '8px', paddingLeft: '20px', color: 'grey' }}>Apple</li>
          <li onClick={() => { setMobileWidth(350); setMobileHeight(700) }} className="mobile-displays-item" style={{ padding: '8px', paddingLeft: '20px', color: 'grey' }}>Sony</li>
        </ul>)}
        <h2 className="mb-3 mt-3 col-12 d-flex justify-content-center">
          WELCOME TO WORK OUT!
        </h2>
        <Card.Img lg={mobile ? 12 : 6}
          className="col-sm-12 col-md-6 mx-auto p-0"
          style={{ border: "1px solid #ddd" }}
          variant="top"
          src="https://cdn.pixabay.com/photo/2017/09/17/19/43/woman-2759503__340.jpg"
        />
        <Card.Body>
          <Card.Text className="text-muted medium">
            <b>WORK OUT</b> has you covered for all your work footwear and
            clothing needs with well over 200 work brands to choose from. We
            believe we have the most comprehensive selection of work clothes,
            boots, shoes, and accessories. Choose from the best of the best for
            clothing, like Carhartt or Wrangler. With over a thousand styles of
            Work Boots to choose from, you willll find exactly what you need from
            great brands like Wolverine Boots and Carolina Shoes. Our selection
            of FR workwear and high visibility workwear is awesome.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Home;
