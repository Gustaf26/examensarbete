import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import { Row } from "react-bootstrap";
import Icon from "@mui/material/Icon";
import Navigation from "../Navigation";

import { useMobile } from "../../contexts/MobileContext";
import { useAuth } from "../../contexts/AuthContext";
import useMobileStyles from "../../hooks/useMobileStyles";

import MobileList from "../../cms_components/MobileList";
import HomeSections from '../../components/home_sections/HomeSections'

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
        style={
          admin
            ? {
              position: "absolute",
              left: mobile ? "0px" : "240px",
              padding: mobile ? '15px' : '0',
              width: mobile ? "calc(100% - 70px)" : "calc(100% - 240px)",
              justifyContent: mobile ? 'center' : '',
            }
            : mobile ? {
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginLeft: '0px',
              padding: '10px'
            } : {}
        }
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
          className='dummy-container-mobile'
          style={
            mobile && admin
              ? { ...containerStyles, marginTop: "60px" }
              : mobile
                ? {
                  margin: "20px auto",
                  width: '100%',
                  padding: "0px",
                  display: "flex",
                  justifyContent: "center",
                }
                : { margin: "0 auto" }
          }
          lg={mobile ? 12 : 6}
        >
          {admin && <Navigation />}
          {mobile && admin && !microMobile && (
            <Icon
              className='icon-mobile-displays'
              onClick={() => {
                setMobileDisplays(!mobileDisplays);
              }}
              style={{
                border: "1px solid lightgrey",
                width: "40px",
                height: "40px",
                textAlign: "left",
                zIndex: "5",
                margin: "0 auto",
                padding: "8px",
                borderRadius: "5px",
                position: "absolute",
                top: `-20px`,
                left: "45%",
                backgroundColor: "rgb(255, 255, 255)",
              }}
              color='primary'
            >
              device_unknown
            </Icon>
          )}
          {mobileDisplays && <MobileList />}

          <HomeSections onLoad={(e) => {
            e.target.scrollIntoView({ block: 'end' });
          }}
            onClick={() =>
              !admin && menuShowing && mobile ? setMenuShowing(false) : null
            }
            style={{ overflowX: 'hidden' }}
          />
        </Row>
      </div>
    </>
  );
};

export default Home;
