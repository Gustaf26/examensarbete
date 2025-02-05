/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import {
  Nav,
  NavDropdown,
  Form,
  FormControl,
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
      position: 'absolute', backgroundColor: 'rgba(244, 242, 242, 0.9)', height: menuShowing ? 'fit-content' : '', maxWidth: '95%'
      , borderTopLeftRadius: '20px', zIndex: '3', top: '0', left: '0', right: '0'
    } : { width: '100%', height: 'fit-content', backgroundColor: 'rgba(244, 242, 242, 0.9)' }}>
      {!menuShowing ? (<div style={{ color: 'grey', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', width: 'calc(106%)', padding: '10px 20px', backgroundColor: 'rgba(244, 242, 242, 0.9)' }}>
        <MenuIcon onClick={showMenu} />
      </div>) : (
        <Nav id="navigation" className="mx-auto" style={mobile && admin ? {
          display: 'flex', height: 'fit-content',
          backgroundColor: 'rgba(244, 242, 242, 0.9)', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', alignItems: 'center', justifyContent: 'center', padding: '10px', width: '100%', flexDirection: 'column'
        } : { padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'rgba(244, 242, 242, 0.9)' }}>
          <Nav.Item style={mobile && admin ? { width: '100%', padding: '10px' } : { borderBottom: '1px solid grey' }} className="d-flex justify-content-center align-items-center navitem">
            <NavLink to={"/"} style={{ textAlign: 'center', padding: '10px' }} id={!mobile && "logo"} className="navbar-brand">
              Work Out
            </NavLink>
          </Nav.Item>
          < div id="nav-container" style={mobile ? { justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', height: '75%', width: '100%' } : { display: 'flex', alignItems: 'center' }}>
            <Nav.Item className="d-flex align-items-center navitem mx-5">
              <Form style={mobile ? { width: '100%', textAlign: 'center', padding: '10px', display: 'flex', justifyContent: 'center' } : { width: '400px' }} onSubmit={omitReload}>
                <FormControl
                  style={mobile && admin ? { minWidth: '200px' } : null}
                  onChange={changeString}
                  type="text"
                  id="product-search"
                  placeholder="Search product"
                />
              </Form>
            </Nav.Item>
            <NavDropdown
              title="All clothes"
              id="basic-nav-dropdown"
              className="ml-3 navitem"
              variant="disabled"
              style={mobile ? { width: '100%', padding: '10px', textAlign: 'center' } : null}
            >
              <NavLink
                to={admin ? '/cms/products/troussers' : "/products/troussers"}
                className="dropdown-item"
              >
                Troussers
              </NavLink>
              <NavDropdown.Divider />
              <NavLink to={admin ? '/cms/products/jackets' : "/products/jackets"} className="dropdown-item">
                Jackets
              </NavLink>
              <NavDropdown.Divider />
              <NavLink
                to={admin ? '/cms/products/t-shirts' : "/products/t-shirts"}
                className="dropdown-item"
              >
                T-shirts
              </NavLink>
            </NavDropdown>
            {currentUser ? (
              <div className="d-flex align-items-center justify-content-center w-40">
                <NavDropdown
                  style={mobile ? { width: '100%', padding: '10px', textAlign: 'center' } : {}}
                  title={currentUser.display_name ? currentUser.display_name : currentUser.email}
                  id="basic-nav-dropdown"
                  className="mx-lg-2 navitem"
                >
                  <NavLink
                    style={mobile ? { width: '100%', textAlign: 'center' } : {}}
                    to={admin ? 'cms/update-profile' : "/update-profile"}
                    className="dropdown-item"
                  >
                    Update Profile
                  </NavLink>
                  <NavDropdown.Divider />
                  <NavLink style={mobile ? { width: '100%', textAlign: 'center' } : {}} to={admin ? 'cms/logout' : "/logout"} className=" dropdown-item">
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
              <NavLink
                style={mobile ? { width: '100%', textAlign: 'center' } : {}}
                to={admin ? 'cms/login' : "/login"}
                className="nav-link signin navitem ml-3"
                id="login-link"
              >
                Sign In / Register
              </NavLink>
            )}
            {/* {customMenu && <Nav.Item><SimpleMenu /></Nav.Item>} */}

          </div>
        </Nav >)
      }
    </div >
  );
};

export default Navigation;
