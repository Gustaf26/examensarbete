
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router";

import CloseIcon from '@mui/icons-material/Close';
import {
  Nav,
  NavDropdown,
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

  const [customMenu, setCustMenu] = useState(false);

  const { setSearchString, yScrolling } = useCreate();

  const navigate = useNavigate();

  const { currentUser, admin, setAdmin, setCurrentUser } = useAuth();
  const { mobile, setMobile, menuShowing, setMenuShowing, mobileWidth, setFullScreen, fullScreen } = useMobile()
  const { microMobile, setMicro } = useMobileStyles()

  const [subMenu, setSubMenu] = useState(true)
  const navRef = useRef()

  const showMenu = () => {
    setMenuShowing(!menuShowing)
  }

  const changeString = (val) => {
    setSearchString(val);
    localStorage.setItem("search", JSON.stringify(val));
    navigate(admin ? "/cms/search-results" : "/search-results", { replace: true });
  };

  // This effect closes or opens the main categories menu when mobile
  // && addas listener to adapt menu showing to device
  useEffect(() => {

    if (mobile) {
      setMenuShowing(false)
    }
    else {
      setMenuShowing(true)
    }

    window.addEventListener("resize", function (e) {
      if (window.innerWidth >= 1110) {
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


  // We scroll to start of page (navigation start) with this effect  
  useEffect(() => {
    navRef.current?.scrollIntoView({ block: 'start' })
  }, [yScrolling])


  return (
    <div ref={navRef} id="navigation-container" className={microMobile ? ' micromobile' : admin && mobile ? 'admin mobile' :
      admin ? ' admin' : mobile ? ' mobile' : ''} style={{
        height: 'fit-content',
        width: microMobile ? '' : mobile && admin ? `${mobileWidth}px` : '', padding: !menuShowing ? '0' : '0'
      }}>

      {menuShowing === false ?
        (<div id="closed-nav-menu-and-search">
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
        (<div id="navigation-container-row" className={microMobile ? ' micromobile' : admin && mobile ? 'admin mobile' :
          admin ? ' admin' : mobile ? ' mobile' : ''}>
          <Nav id="navigation" className={microMobile ? 'navigation micromobile' : admin && mobile ? 'navigation admin mobile' :
            admin ? 'navigation admin' : mobile ? 'navigation mobile' : ''}
            style={mobile && admin ? {
              width: microMobile ? '' : `100%`
            } : {}}>

            <Nav.Item style={mobile && admin ? { width: '100%', padding: '10px', justifyContent: 'center' } :
              mobile ? { width: '100%', padding: '10px', justifyContent: 'center' } : {
                justifyContent: 'center', alignItems: 'center', width: '50%', textAlign: 'center'
              }} className="d-flex align-items-center my-3 navitem">

              {mobile && <CloseIcon className="close-nav-icon" onClick={() => setMenuShowing(false)} />}

              <NavLink to={"/"} id="logo" className="navbar-brand" style={!mobile && admin ? { marginLeft: '' } :
                { margin: '0 auto' }}>
                <span>Work</span>{" "}<span>Out</span>
              </NavLink>

            </Nav.Item>
            <Nav.Item id="subnavigation" className={microMobile ? ' micromobile' : admin && mobile ? 'admin mobile' :
              admin ? ' admin' : mobile ? ' mobile' : ''}>
              <Nav.Item
                id="clothes-select"
                className="navitem"
                onClick={(e) => {
                  if (e.target.id === 'all-clothes-select') e.preventDefault(); changeString(' ');
                }}
                style={mobile ? { display: 'none', width: '100%', textAlign: 'center', margin: '0', padding: '20px', height: '100%' } : {
                  width: '130px', borderRadius: '15px'
                }}
              > <NavLink id="all-clothes-select">
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
                  <NavLink style={mobile ? { width: '100%', textAlign: 'center' } : {}}
                    onClick={() => { setAdmin(false); setCurrentUser(null); localStorage.removeItem('currentUser') }}
                    to={"/logout"} className="mx-auto dropdown-item">
                    Log Out
                  </NavLink>
                </NavDropdown>
              ) : (
                <NavItem className="navitem" style={mobile ? {
                  width: '100%', padding: '20px',
                  height: '100%'
                } : { width: '180px', marginLeft: !microMobile && !mobile ? '600px' : '0' }}>
                  <NavLink
                    className={microMobile ? ' micromobile' : admin && mobile ? 'admin mobile' :
                      admin ? ' admin' : mobile ? ' mobile' : ''}
                    to={admin ? 'cms/login' : "/login"}
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
            <NavLink
              to={admin ? '/cms/products/jackets' : "/products/jackets"} className="dropdown-item"
            >
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
          {/* <div style={{ padding: '0', width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center', height: '60px' }}> */}
          <SearchForm />
          {/* </div> */}
        </div>)
      }
    </div >
  );
};

export default Navigation;
