
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import {
  Nav,
  NavDropdown,
  Row,
  NavItem
} from "react-bootstrap";

import { useAuth } from "../contexts/AuthContext";
import { useCreate } from "../contexts/CreateContext";
import { useMobile } from '../contexts/MobileContext'

import useMobileStyles from "../hooks/useMobileStyles";

import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import SearchForm from "./SearchForm";
import CartIcon from '../components/cart/CartIcon'

const Navigation = () => {
  const { currentUser, admin, setAdmin, setCurrentUser } = useAuth();
  const [createLink, setCreate] = useState(false);
  const [customMenu, setCustMenu] = useState(false);
  const { setSearchString } = useCreate();
  const navigate = useNavigate();
  const { mobile, setMobile, menuShowing, setMenuShowing, mobileWidth, setFullScreen, fullScreen } = useMobile()
  const [subMenu, setSubMenu] = useState(true)
  const { microMobile, setMicro } = useMobileStyles()


  const showMenu = () => {
    setMenuShowing(!menuShowing)
  }

  const changeString = (val) => {
    setSearchString(val);
    localStorage.setItem("search", JSON.stringify(val));
    navigate(admin ? "/cms/search-results" : "/search-results", { replace: true });
  };

  useEffect(() => {
    if (admin === true) {
      setCreate(true);
    } else {
      setCreate(false);
    }
  }, [admin, currentUser]);

  useEffect(() => {

    if (mobile) {
      setMenuShowing(false)
    }
    else {
      setMenuShowing(true)
    }

    window.addEventListener("resize", function (e) {
      if (window.innerWidth > 1110) {
        setCustMenu(false);
        setMobile(false)
      }
      if (window.innerWidth < 1110) {
        setCustMenu(true);
        setMobile(true)

        if (window.innerWidth <= 500) {
          setMicro(true)
          setMenuShowing(false)
        }
      }
      else {
        setMenuShowing(true)
        setMobile(false)
      }
    });

  }, []);

  return (
    <div id="navigation-container" className={microMobile ? ' micromobile' : admin && mobile ? 'admin mobile' :
      admin ? ' admin' : mobile ? ' mobile' : ''} style={{
        height: 'fit-content',
        width: microMobile ? '100%' : mobile && admin ? `${mobileWidth}px` : '', padding: !menuShowing ? '0' : '0'
      }}>

      {menuShowing === false ?
        (<div style={{
          color: 'grey', borderTopLeftRadius: !microMobile ? '15px' : '0px', borderTopRightRadius: !microMobile ? '15px' : '0px', width: `100%`,
          padding: '0px', backgroundColor: 'brown', transition: '2s ease-in-out'
        }}>
          <div style={{ height: '50px' }}>
            <MenuIcon style={{ margin: '10px 20px', color: 'rgb(210, 129, 37)' }} className="mobile-nav-icon" onClick={showMenu} />
            {microMobile && admin && <AdminPanelSettingsIcon style={{ margin: '10px 20px', color: 'white' }} className="mobile-nav-icon" onClick={() => { setFullScreen(!fullScreen) }} />}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center', alignItems: 'center'
          }}>
            <SearchForm />

          </div>
        </div>) :
        (<Row id="navigation-container-row" className={microMobile ? ' micromobile' : admin && mobile ? 'admin mobile' :
          admin ? ' admin' : mobile ? ' mobile' : ''}>
          <Nav id="navigation" className={microMobile ? 'navigation micromobile' : admin && mobile ? 'navigation admin mobile' :
            admin ? 'navigation admin' : mobile ? 'navigation mobile' : ''}
            style={mobile && admin ? {
              width: microMobile ? '100%' : `${mobileWidth}px`
            } : {}}>

            <Nav.Item style={mobile && admin ? { width: '100%', padding: '10px', justifyContent: 'center' } :
              mobile ? { width: '100%', padding: '10px', justifyContent: 'center' } : {
                justifyContent: 'center', alignItems: 'center', width: '50%', textAlign: 'center'
              }} className="d-flex align-items-center my-3 navitem">

              {mobile && <CloseIcon onClick={() => setMenuShowing(false)} style={!admin ?
                { position: 'absolute', left: '40px', top: '20px', color: 'rgb(210, 129, 37)' } :
                { position: 'absolute', left: '20px', top: '20px', color: 'rgb(210, 129, 37)' }} />}

              <NavLink to={"/"} id="logo" className="navbar-brand" style={!mobile && admin ? { marginLeft: '' } :
                { margin: '0 auto' }}>
                <span>Work</span>{" "}<span>Out</span>
              </NavLink>

            </Nav.Item>
            <Nav.Item id="subnavigation" className={microMobile ? ' micromobile' : admin && mobile ? 'admin mobile' :
              admin ? ' admin' : mobile ? ' mobile' : ''} style={{ width: '50%', display: 'flex', justifyContent: 'center', aignItems: 'center' }}>
              <Nav.Item
                id="clothes-select"
                className="navitem"
                onClick={(e) => {
                  if (e.target.id === 'all-clothes-select') e.preventDefault(); changeString(' ');
                }}
                // variant="disabled"
                style={mobile ? { display: 'none', width: '100%', textAlign: 'center', margin: '0', padding: '20px', height: '100%' } : {
                  width: '130px', borderRadius: '15px'
                }}
              > <NavLink id="all-clothes-select" >
                  All clothes
                </NavLink>
              </Nav.Item>
              {""}
              {currentUser ? (
                <NavDropdown
                  style={mobile ? { width: '100%', padding: '10px', textAlign: 'center' } : { width: '180px', margin: '0 1rem' }}
                  title={currentUser.display_name ? currentUser.display_name : currentUser.email}
                  className="navitem"
                >
                  <NavLink
                    style={mobile ? { width: '100%', textAlign: 'center' } : {}}
                    to={admin ? '/cms/update-profile' : "/update-profile"}
                    className="dropdown-item mx-auto"
                  >
                    Update Profile
                  </NavLink>
                  {/* <NavDropdown.Divider /> */}
                  <NavLink style={mobile ? { width: '100%', textAlign: 'center' } : {}}
                    onClick={() => { setAdmin(false); setCurrentUser(null); localStorage.removeItem('currentUser') }}
                    to={"/logout"} className="mx-auto dropdown-item">
                    Log Out
                  </NavLink>
                </NavDropdown>
              ) : (
                <NavItem className="navitem" style={mobile ? {
                  width: '100%', margin: '0', padding: '20px',
                  height: '100%', borderTop: '1px solid rgb(234, 215, 215)'
                } : { width: '180px' }}>
                  <NavLink
                    style={admin && mobile ? { width: '100%', textAlign: 'center' } : mobile ? { width: 'fit-content' } : { maxWidth: '80px' }}
                    to={admin ? 'cms/login' : "/login"}
                    className="signin ml-3"
                    id="login-link"
                  >
                    Sign In / Register
                  </NavLink>
                </NavItem>
              )}
              {!admin && !mobile && <CartIcon />}
            </Nav.Item>
          </Nav>
          {subMenu && (<NavItem id="basic-nav-dropdown" className={microMobile ? ' micromobile' : admin && mobile ? 'admin mobile' :
            admin ? ' admin' : mobile ? ' mobile' : ''} style={mobile && admin ? { maxWidth: microMobile ? '100%' : `${mobileWidth}px` }
              : {}}>
            <NavLink
              to={admin ? '/cms/products/troussers' : "/products/troussers"}
              className="dropdown-item"
            >
              Troussers
            </NavLink>
            <NavDropdown.Divider className="m-0" />
            <NavLink to={admin ? '/cms/products/jackets' : "/products/jackets"} className="dropdown-item">
              Jackets
            </NavLink>
            <NavDropdown.Divider className="m-0" />
            <NavLink

              to={admin ? '/cms/products/t-shirts' : "/products/t-shirts"}
              className="dropdown-item"
            >
              T-shirts
            </NavLink>
          </NavItem>
          )}
          <div style={{ padding: '0', width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center', height: '60px' }}>
            <SearchForm />
          </div>
        </Row>)
      }
    </div >
  );
};

export default Navigation;
