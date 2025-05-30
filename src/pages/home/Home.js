import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import { Row } from "react-bootstrap";
import Icon from "@mui/material/Icon";
import Navigation from "../../components/Navigation";

import { useMobile } from "../../contexts/MobileContext";
import { useAuth } from "../../contexts/AuthContext";
import useMobileStyles from "../../hooks/useMobileStyles";

import MobileList from "../../cms_components/MobileList";
import HomeSections from './HomeSections'

const Home = () => {
  const {
    mobile,
    mobileDisplays,
    setMobileDisplays,
    menuShowing,
    setMenuShowing,
  } = useMobile();
  const { containerStyles, microMobile } = useMobileStyles();

  const navigate = useNavigate();
  const { admin } = useAuth();

  useEffect(() => {
    if (admin) navigate("/cms/index", { replace: true });
  }, [admin]);

  return (
    <>
      <div
        id='dummy-container-home'
        className={microMobile ? 'micromobile' : admin && mobile ? 'admin mobile' : admin ? 'admin' : mobile ? 'mobile' : ''}
        onClick={(e) => {
          if (e.target.id === "dummy-container-home") setMobileDisplays(false);
        }}
      >
        <Row
          id='home-row'
          onClick={
            (window.innerWidth < 1100 || mobile) && menuShowing
              ? (e) => {
                if (e.target.id === "home-card-text") setMenuShowing(false);
              }
              : null
          }
          className={microMobile ? 'micromobile' : admin && mobile ? 'admin mobile' : admin ? 'admin' : mobile ? 'mobile' : ''}
          style={mobile && admin && !microMobile ? { ...containerStyles } : {}}
          lg={mobile ? 12 : 6}
        >
          {admin && <Navigation />}
          {mobile && admin && !microMobile && (
            <Icon
              className='icon-mobile-displays'
              onClick={() => {
                setMobileDisplays(!mobileDisplays);
              }} color='primary'
            >device_unknown
            </Icon>
          )}
          {mobileDisplays && <MobileList />}

          <HomeSections onLoad={(e) => {
            e.target.scrollIntoView({ block: 'end' });
          }}
            onClick={() =>
              !admin && menuShowing && mobile ? setMenuShowing(false) : null
            }
            style={{ overflowX: 'hidden', maxWidth: '100%' }}
          />
        </Row>
      </div>
    </>
  );
};

export default Home;
