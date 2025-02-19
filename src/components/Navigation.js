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

// import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = () => {
  const { currentUser, admin, setAdmin, setCurrentUser } = useAuth();
  const [createLink, setCreate] = useState(false);
  const [customMenu, setCustMenu] = useState(false);
  const { setSearchString } = useCreate();
  const navigate = useNavigate();
  const { mobile, setMobile, menuShowing, setMenuShowing, mobileWidth } = useMobile()
  const [subMenu, setSubMenu] = useState(true)


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
      position: 'absolute', backgroundColor: 'rgba(231, 229, 229, 0.7)', height: menuShowing ? 'fit-content' : '0', width: `${mobileWidth}px`
      , borderTopLeftRadius: '20px', borderTopRightRadius: '15px', zIndex: '3', top: '0', left: '0', right: '0', padding: !menuShowing ? '0' : ''
    } : admin ? { width: '100%' } : { width: '100%', height: 'fit-content', backgroundColor: 'rgba(231, 229, 229, 0.7)' }}>

      {!menuShowing ?
        (<div style={{
          color: 'grey', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', width: 'calc(100%)',
          padding: '10px 20px', backgroundColor: 'rgba(243, 234, 234, 0.9)', transition: '2s ease-in-out'
        }}>
          <MenuIcon style={{ color: 'brown' }} className="mobile-nav-icon" onClick={showMenu} />
        </div>) :
        (<Row>
          <Nav id="navigation" className="mx-auto" style={mobile && admin ? {
            display: 'flex', height: 'fit-content', width: `${mobileWidth}px`,
            backgroundColor: 'rgba(243, 234, 234, 0.9)', borderTopLeftRadius: '20px', borderTopRightRadius: '20px',
            alignItems: 'center', justifyContent: 'center', padding: '10px', flexDirection: 'column'
          } : mobile ? {
            backgroundColor: 'rgba(243, 234, 234, 0.9)', flexDirection: 'column', width: '100%',
            justifyContent: 'space-evenly', height: 'fit-content', alignItems: 'center'
          } : admin ? {
            paddingRight: '240px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row',
            backgroundColor: 'rgba(243, 234, 234, 0.9)', height: '80px'
          } : {
            display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row',
            backgroundColor: 'rgba(243, 234, 234, 0.9)', height: '80px'
          }}>

            <Nav.Item style={mobile && admin ? { width: '100%', padding: '10px', justifyContent: 'center' } : {
              justifyContent: 'center', alignItems: 'center', width: '20%', textAlign: 'center'
            }} className="d-flex align-items-center my-3 navitem">

              {mobile && <CloseIcon onClick={() => setMenuShowing(false)} style={!admin ?
                { position: 'absolute', left: '40px', top: '20px', color: 'brown' } :
                { position: 'absolute', left: '20px', top: '20px', color: 'brown' }} />}

              <NavLink to={"/"} id="logo" className="navbar-brand" style={!mobile && admin ? { marginLeft: '30%' } :
                { margin: '0 auto' }}>
                <span>Work</span>{" "}<span>Out</span>
              </NavLink>
            </Nav.Item>
          </Nav>
          < div id="nav-container" style={mobile ? {
            justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column',
            height: '75%', width: '100%'
          } : admin ? { display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'fit-content', padding: '20px 240px 20px 20px' }
            : { display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'fit-content', padding: '20px' }}>
            <Nav.Item className="d-flex align-items-center my-0 navitem"
              style={mobile ? {
                width: '100%', textAlign: 'center', margin: '0', padding: '20px 0px', height: '100%',
              } : { width: '500px' }}>
              <Form style={mobile ? {
                width: '100%', textAlign: 'center', padding: '15px', display: 'flex', alignItems: 'center',
                margin: '0', height: '100%'
              }
                : { width: '400px' }} onSubmit={omitReload}>
                <FormControl
                  style={mobile && admin ? { minWidth: '200px', margin: '0 auto' } : mobile ? { width: '60%', margin: '0 auto' } :
                    admin ? { margin: '0 auto', maxWidth: '300px' } : { margin: '0 auto' }}
                  onChange={(e) => changeString(e.target.value)}
                  type="text"
                  id="product-search"
                  placeholder="Search product"
                />
              </Form>
            </Nav.Item>
            <Nav.Item
              id="clothes-select"
              className="navitem"
              onClick={(e) => {
                if (e.target.id === 'all-clothes-select') e.preventDefault(); changeString('a');
              }}
              // variant="disabled"
              style={mobile ? { display: 'none', width: '100%', textAlign: 'center', margin: '0', padding: '20px', height: '100%' } : {
                width: '130px', borderRadius: '15px'
              }}
            > <NavLink id="all-clothes-select" >
                All clothes
              </NavLink>
            </Nav.Item>

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
                  style={mobile ? { width: '100%', textAlign: 'center' } : { maxWidth: '80px' }}
                  to={admin ? 'cms/login' : "/login"}
                  className="signin ml-3"
                  id="login-link"
                >
                  Sign In / Register
                </NavLink>
              </NavItem>
            )}
          </div>
          {subMenu && (<NavItem id="basic-nav-dropdown" style={mobile && admin ? { maxWidth: `${mobileWidth}px` }
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
        </Row>)
      }
    </div >
  );
};

export default Navigation;
