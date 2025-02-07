import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router'

import { Breadcrumb, Card, Row } from "react-bootstrap";
import Icon from '@mui/material/Icon';
import Navigation from '../components/Navigation'

import { useMobile } from '../contexts/MobileContext'
import { useAuth } from '../contexts/AuthContext'
import useMobileStyles from "../hooks/useMobileStyles";

import MobileList from '../cms_components/MobileList'

const Home = () => {

  const { mobile, mobileDisplays, setMobileDisplays, mobileHeight, setMobile, menuShowing, setMenuShowing } = useMobile()
  const containerStyles = useMobileStyles()

  const navigate = useNavigate()
  const { admin } = useAuth()

  useEffect(() => {
    admin && navigate('/cms/index', { replace: true })
  }, [admin])

  return (
    <>
      <div id="dummy-container-home" onClick={(e) => { if (e.target.id === "dummy-container-home") setMobileDisplays(false) }}>
        <Row id="home-row" onClick={(window.innerWidth < 1100 || mobile) && menuShowing ?
          (e) => { if (e.target.id === 'home-card-text') setMenuShowing(false) } : null}
          className="dummy-container-mobile" style={mobile && admin ? { ...containerStyles, marginTop: '5rem' } : null}
          lg={mobile ? 12 : 6}>
          {mobile && admin && <Navigation />}
          {mobile && admin && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{
            border: '1px solid lightgrey',
            width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto',
            padding: '8px', borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)'
          }} color='primary'>device_unknown</Icon>}
          <Card onClick={() => !admin && menuShowing && mobile ? setMenuShowing(false) : null} style={{
            padding: '10px',
            overflowY: mobile && admin ? 'scroll' : '', width: mobile ? '400px' : '600px',
            height: mobile && admin ? `calc(${mobileHeight - 70}px)` : 'fit-content',
            marginTop: !mobile && admin ? '5rem' : mobile ? '3rem' : '5rem'
          }}
            className="mb-3 main-card col-sm-12 col-md-6 mx-auto mb-5">
            {mobileDisplays && <MobileList />}
            <h2 className="mb-3 mt-3 col-12 d-flex justify-content-center">
              WELCOME TO WORK OUT!
            </h2>
            <Card.Img lg={mobile ? 12 : 6}
              className="col-sm-12 col-md-6 mx-auto p-0"
              style={{ border: "1px solid #ddd" }}
              variant="top"
              src="https://cdn.pixabay.com/photo/2017/09/17/19/43/woman-2759503__340.jpg"
            />
            <Card.Body >
              <Card.Text id="home-card-text" className="text-muted medium">
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
        </Row>
      </div>
    </>
  );
};

export default Home;
