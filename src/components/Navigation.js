/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import {
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Row,
  NavItem
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useCreate } from "../contexts/CreateContext";
import { useMobile } from '../contexts/MobileContext'

import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = () => {
  const { currentUser, admin } = useAuth();
  const [createLink, setCreate] = useState(false);
  const [customMenu, setCustMenu] = useState(false);
  const { setSearchResults, setSearchString } = useCreate();
  const navigate = useNavigate();
  const { mobile, setMobile, menuShowing, setMenuShowing, mobileWidth } = useMobile()
  const [subMenu, setSubMenu] = useState(true)


  const showMenu = () => {
    setMenuShowing(!menuShowing)
  }

  const omitReload = (e) => {
    e.preventDefault();
  };

  const changeString = (e) => {
    setSearchResults([]);
    setSearchString(e.target.value);
    localStorage.setItem("search", JSON.stringify(e.target.value));
    navigate(admin ? "/cms/search-results" : "/search-results", { replace: true });
  };

  const showSubMenu = () => {
    setSubMenu(!subMenu)
  }

  useEffect(() => {
    if (admin === true) {
      setCreate(true);
    } else {
      setCreate(false);
    }
  }, [admin, currentUser]);

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setCustMenu(true);
    }

    if (mobile) {
      setMenuShowing(false)
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
      , borderTopLeftRadius: '20px', borderTopRightRadius: '15px', zIndex: '3', top: '0', left: '0', right: '0'
    } : { width: '100%', height: 'fit-content', backgroundColor: 'rgba(231, 229, 229, 0.7)' }}>

      {!menuShowing ?
        (<div style={{
          color: 'grey', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', width: 'calc(100%)',
          padding: '10px 20px', backgroundColor: 'rgba(243, 234, 234, 0.9)', transition: '2s ease-in-out'
        }}>
          <MenuIcon onClick={showMenu} />
        </div>) :
        (<Row>
          <Nav id="navigation" className="mx-auto" style={mobile && admin ? {
            display: 'flex', height: 'fit-content', width: `${mobileWidth}px`,
            backgroundColor: 'rgba(243, 234, 234, 0.9)', borderTopLeftRadius: '20px', borderTopRightRadius: '20px',
            alignItems: 'center', justifyContent: 'center', padding: '10px', flexDirection: 'column'
          } : mobile ? {
            backgroundColor: 'rgba(243, 234, 234, 0.9)', flexDirection: 'column',
            justifyContent: 'space-evenly', height: 'fit-content', alignItems: 'center'
          } : {
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
            backgroundColor: 'rgba(243, 234, 234, 0.9)', height: '120px'
          }}>

            <Nav.Item style={mobile && admin ? { width: '100%', padding: '10px', justifyContent: 'center' } : {
              justifyContent: mobile ?
                'center' : 'end', alignItems: 'center', width: '20%', textAlign: 'center'
            }}
              className="d-flex align-items-center my-3 navitem">
              <NavLink to={"/"} id="logo" className="navbar-brand">
                Work Out
              </NavLink>
            </Nav.Item>
            < div id="nav-container" style={mobile ? {
              justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column',
              height: '75%', width: '100%'
            } : { display: 'flex', alignItems: 'center' }}>
              <Nav.Item className="d-flex align-items-center my-0 navitem"
                style={mobile ? {
                  width: '100%', textAlign: 'center', margin: '0', padding: '20px 0px', height: '100%',
                } : {}}>
                <Form style={mobile ? {
                  width: '100%', textAlign: 'center', padding: '15px', display: 'flex',
                  margin: '0', height: '100%'
                }
                  : { width: '400px' }} onSubmit={omitReload}>
                  <FormControl
                    style={mobile && admin ? { minWidth: '200px' } : mobile ? { width: '60%', margin: '0 auto' } : { margin: '0 auto' }}
                    onChange={changeString}
                    type="text"
                    id="product-search"
                    placeholder="Search product"
                  />
                </Form>
              </Nav.Item>
              <Nav.Item
                id="clothes-select"
                className="navitem"
                onClick={(e) => { if ((e.target.id === "clothes-select") || (e.target.id === "all-clothes-select")) showSubMenu() }}
                // variant="disabled"
                style={mobile ? { width: '100%', textAlign: 'center', margin: '0', padding: '20px', height: '100%' } : {
                  width: '130px', borderRadius: '15px'
                }}
              > <NavLink id="all-clothes-select">
                  All clothes
                </NavLink>
                {subMenu && (<div id="basic-nav-dropdown" style={mobile && admin ? { maxWidth: `${mobileWidth}px` }
                  : { zIndex: '3' }}>
                  <NavLink inline
                    to={admin ? '/cms/products/troussers' : "/products/troussers"}
                    className="dropdown-item"
                  >
                    Troussers
                  </NavLink>
                  <NavDropdown.Divider className="m-0" />
                  <NavLink inline to={admin ? '/cms/products/jackets' : "/products/jackets"} className="dropdown-item">
                    Jackets
                  </NavLink>
                  <NavDropdown.Divider className="m-0" />
                  <NavLink inline
                    to={admin ? '/cms/products/t-shirts' : "/products/t-shirts"}
                    className="dropdown-item"
                  >
                    T-shirts
                  </NavLink>
                </div>)}
              </Nav.Item>
              {currentUser ? (
                <div style={mobile ? { width: '100% !important' } : { width: 'fit-content' }}>
                  <NavDropdown
                    style={mobile ? { width: '100% !important', padding: '10px', textAlign: 'center' } : {}}
                    title={currentUser.display_name ? currentUser.display_name : currentUser.email}
                    // id="basic-nav-dropdown"
                    className="mx-auto w-100 navitem"
                  >
                    <NavLink
                      style={mobile ? { width: '100%', textAlign: 'center' } : {}}
                      to={admin ? '/cms/update-profile' : "/update-profile"}
                      className="dropdown-item mx-auto"
                    >
                      Update Profile
                    </NavLink>
                    <NavDropdown.Divider />
                    <NavLink style={mobile ? { width: '100%', textAlign: 'center' } : {}}
                      to={admin ? '/cms/logout' : "/logout"} className="mx-auto dropdown-item">
                      Log Out
                    </NavLink>
                  </NavDropdown>
                  {!admin && (
                    <ShoppingBasket
                      id="basket-icon"
                      color="primary"
                      className="mx-lg-3 p-1"
                      rounded
                    />
                  )}
                </div>
              ) : (
                <NavItem className="navitem" style={mobile ? {
                  width: '100%', margin: '0', padding: '20px',
                  height: '100%', borderTop: '1px solid rgb(234, 215, 215)'
                } : {}}>
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
          </Nav >
        </Row>)
      }
    </div >
  );
};

export default Navigation;
