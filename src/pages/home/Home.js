import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

import { Row } from "react-bootstrap";
import Icon from "@mui/material/Icon";
import Navigation from "../../components/Navigation";

//Contexts
import { useMobile } from "../../contexts/MobileContext";
import { useAuth } from "../../contexts/AuthContext";
import { useCreate } from "../../contexts/CreateContext";

// Hooks
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

  const { setLocation } = useCreate()

  const { containerStyles, microMobile } = useMobileStyles();

  const location = useLocation()

  const navigate = useNavigate();
  const { admin } = useAuth();

  const toggleMobileDisplays = (e) => {

    let { id } = e.target

    if (id === "dummy-container-home") { setMobileDisplays(false); return }
    else if (id === 'icon-mobile-displays') setMobileDisplays(!mobileDisplays);

  }

  useEffect(() => {
    if (admin) navigate("/cms/index", { replace: true });
  }, [admin]);

  useEffect(() => {
    setLocation(location.pathname)
  }, [location])

  return (
    <>
      <div
        id='dummy-container-home'
        className={microMobile ? 'micromobile' : admin && mobile ? 'admin mobile' : admin ? 'admin' : mobile ? 'mobile' : ''}
        onClick={(e) => { admin && mobile && toggleMobileDisplays(e) }}
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
              id="icon-mobile-displays"
              className='icon-mobile-displays'
              onClick={(e) => { toggleMobileDisplays(e) }} color='primary'
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
