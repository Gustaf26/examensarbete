/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Row,
  FormControl,
  Col,
} from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useCreate } from "../contexts/CreateContext";
import { useMobile } from '../contexts/MobileContext'

import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import MenuIcon from '@mui/icons-material/Menu';
import SimpleMenu from "./SimpleMenu";

const Navigation = () => {
  const { currentUser, admin } = useAuth();
  const [createLink, setCreate] = useState(false);
  const [customMenu, setCustMenu] = useState(false);
  const { setSearchResults, setSearchString } = useCreate();
  const navigate = useNavigate();
  const { mobile } = useMobile()
  const [menuShowing, setMenuShowing] = useState(true)

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
    navigate("/search-results");
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
      if (window.innerWidth > 1000) {
        setCustMenu(false);
      }
      if (e.offsetX < 1000) {
        setCustMenu(true);
      }
    });
    // let inputEl = document.getElementById("product-search");
    // inputEl.focus();
  }, [mobile]);

  return (
    <div style={mobile ? { position: 'absolute', backgroundColor: 'rgba(103, 101, 101,0.8)', height: menuShowing ? '200px' : '', color: 'white', width: 'calc(100% - 20px)', borderTopLeftRadius: '15px', zIndex: '3', top: '0', left: '0' } : {}}>
      {!menuShowing ? (<div style={{ padding: '10px', color: 'white' }}>
        <MenuIcon variant="light" onClick={showMenu} />
      </div>) : (
        <Nav onClick={showMenu} id="navigation" className="mx-auto d-flex align-items-center justify-content-around">
          <div id="nav-container" style={mobile ? { justifyContent: 'space-around', color: 'white', alignItems: 'center', flexDirection: 'column', width: '100%' } : {}}>
            <Nav.Item className="navitem">
              <NavLink to={admin ? 'cms/index' : "/"} id={!mobile && "logo"} className="navbar-brand">
                Work Out
              </NavLink>
            </Nav.Item>
            <Nav.Item className="navitem">
              <Form onSubmit={omitReload}>
                <FormControl
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
            >
              <NavLink
                to={admin ? 'cms/products/troussers' : "/products/troussers"}
                className="dropdown-item"
              >
                Troussers
              </NavLink>
              <NavDropdown.Divider />
              <NavLink to={admin ? 'cms/products/jackets' : "/products/jackets"} className="dropdown-item">
                Jackets
              </NavLink>
              <NavDropdown.Divider />
              <NavLink
                to={admin ? 'cms/products/t-shirts' : "/products/t-shirts"}
                className="dropdown-item"
              >
                T-shirts
              </NavLink>
            </NavDropdown>
            {currentUser ? (
              <div className="d-flex align-items-center justify-content-between">
                <NavDropdown
                  title={currentUser.display_name ? currentUser.display_name : currentUser.email}
                  id="basic-nav-dropdown"
                  className="mx-lg-2 navitem"
                >
                  <NavLink
                    to={admin ? 'cms/update-profile' : "/update-profile"}
                    className="dropdown-item"
                  >
                    Update Profile
                  </NavLink>
                  <NavDropdown.Divider />
                  <NavLink to={admin ? 'cms/logout' : "/logout"} className="dropdown-item">
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
    </div>
  );
};

export default Navigation;
