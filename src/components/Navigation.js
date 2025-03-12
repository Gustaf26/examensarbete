/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import {
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Row,
  NavItem
} from "react-bootstrap";

import { useAuth } from "../contexts/AuthContext";
import { useCreate } from "../contexts/CreateContext";
import { useMobile } from '../contexts/MobileContext'

import useMobileStyles from "../hooks/useMobileStyles";

import MenuIcon from '@mui/icons-material/Menu';
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
  const { microMobile } = useMobileStyles()


  const showMenu = () => {
    setMenuShowing(!menuShowing)
  }

  const omitReload = (e) => {
    e.preventDefault();
  };

  const changeString = (val) => {
    setSearchString(val);
    localStorage.setItem("search", JSON.stringify(val));
    navigate(admin ? "/cms/search-results" : "/search-results", { replace: true });
  };

  const showSubMenu = () => {
    setSubMenu(true)
  }

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
        setMenuShowing(false)
        setMobile(true)
      }
      else {
        setMenuShowing(true)
        setMobile(false)
      }
    });
    // let inputEl = document.getElementById("product-search");
    // inputEl.focus();
  }, [mobile]);

  return (
    <div style={mobile && admin ? {
      position: 'absolute', backgroundColor: 'rgba(231, 229, 229, 0.7)', height: menuShowing ? 'fit-content' : '0',
      width: microMobile ? '100%' : `${mobileWidth}px`
      , borderTopLeftRadius: !microMobile ? '20px' : '', borderTopRightRadius: !microMobile ? '15px' : '',
      zIndex: '3', top: '0', left: '0', right: '0', padding: !menuShowing ? '0' : ''
    } : admin ? { width: '100%' } : { zIndex: '10', position: 'sticky', top: '0', width: '100%', height: 'fit-content' }}>

      {!menuShowing ?
        (<div style={{
          color: 'grey', borderTopLeftRadius: !microMobile ? '15px' : '0px', borderTopRightRadius: !microMobile ? '15px' : '0px', width: `100%`,
          padding: '0px', backgroundColor: 'brown', transition: '2s ease-in-out'
        }}>
          <div style={{ height: '50px' }}>
            <MenuIcon style={{ margin: '10px 20px', color: 'rgb(210, 129, 37)' }} className="mobile-nav-icon" onClick={showMenu} />
            {microMobile && admin && <MenuIcon style={{ margin: '10px 20px', color: 'rgb(210, 129, 37)' }} className="mobile-nav-icon" onClick={() => { setFullScreen(!fullScreen) }} />}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center', alignItems: 'center'
          }}>
            <SearchForm />

          </div>
        </div>) :
        (<Row className="px-0">
          <Nav id="navigation" className="mx-auto" style={mobile && admin ? {
            display: 'flex', height: 'fit-content', width: microMobile ? '100%' : `${mobileWidth}px`,
            borderTopLeftRadius: '20px', borderTopRightRadius: '20px',
            alignItems: 'center', justifyContent: 'center', padding: '10px', flexDirection: 'column'
          } : mobile ? {
            flexDirection: 'column', width: '100%',
            justifyContent: 'space-evenly', height: 'fit-content', alignItems: 'center'
          } : admin ? {
            display: 'flex', alignItems: 'center', justifyContent: 'end', flexDirection: 'row',
            height: '80px'
          } : {
            display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row',
            height: '80px'
          }}>

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
            <div style={{ width: '50%', display: 'flex', justifyContent: 'center', aignItems: 'center' }}>
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
            </div>
          </Nav>
          {subMenu && (<NavItem id="basic-nav-dropdown" style={mobile && admin ? { maxWidth: microMobile ? '100%' : `${mobileWidth}px` }
            : { zIndex: '3' }}>
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
