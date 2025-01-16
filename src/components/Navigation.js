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
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import SimpleMenu from "./SimpleMenu";

const Navigation = () => {
  const { currentUser, admin } = useAuth();
  const [createLink, setCreate] = useState(false);
  const [customMenu, setCustMenu] = useState(false);
  const { setSearchResults, setSearchString } = useCreate();
  const navigate = useNavigate();

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

    window.addEventListener("resize", function (event) {
      if (window.innerWidth > 1000) {
        setCustMenu(false);
      }
      if (window.innerWidth < 1000) {
        setCustMenu(true);
      }
    });
    let inputEl = document.getElementById("product-search");
    inputEl.focus();
  });

  return (
    <>
      {/* <Navbar id="navigation">
        <Container className="w-100 d-flex align-items-center">
          {/* <Row className="py-3 m-left-0 d-flex align-items-center" id="nav-row">
            <Col lg={4} md={3} sm={6}> */}
      <Nav id="navigation" className="mx-auto d-flex align-items-center justify-content-around">
        <div id="nav-container">
          <Nav.Item className="navitem">
            <NavLink to="/" id="logo" className="navbar-brand">
              Work Out
            </NavLink>
          </Nav.Item>
          {/* </Col>
            <Col
              sm={12}
              md={10}
              lg={6}
              className="h-200 d-flex mx-auto my-auto align-items-center justify-content-end"
            > */}
          <Nav.Item className="navitem">
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="navitem"> */}
            <Form onSubmit={omitReload}>
              <FormControl
                onChange={changeString}
                type="text"
                id="product-search"
                placeholder="Search product"
              // className="mr-sm-3 ml-5"
              />
              {/* <SearchIcon id="search-icon" /> */}
            </Form>
            {/* </Navbar.Collapse> */}
          </Nav.Item>
          {!customMenu && (
            <Nav.Item className="mx-3 navitem d-flex" id="nav-links">
              {createLink === true ? (
                <NavLink
                  to="/create"
                  className="ml-4 mr-3 my-auto create-button"
                >
                  Create
                </NavLink>
              ) : null}
              <NavDropdown
                title="All clothes"
                id="basic-nav-dropdown"
                className="ml-3 navitem"
              // id="clothes-drop-title"
              >
                <NavLink
                  to="/products/troussers"
                  className="dropdown-item"
                >
                  Troussers
                </NavLink>
                <NavDropdown.Divider />
                <NavLink to="/products/jackets" className="dropdown-item">
                  Jackets
                </NavLink>
                <NavDropdown.Divider />
                <NavLink
                  to="/products/t-shirts"
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
                      to="/update-profile"
                      className="dropdown-item"
                    >
                      Update Profile
                    </NavLink>
                    <NavDropdown.Divider />
                    <NavLink to="/logout" className="dropdown-item">
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
                  to="/login"
                  className="nav-link signin navitem ml-3"
                  id="login-link"
                >
                  Sign In / Register
                </NavLink>
              )}
            </Nav.Item>
          )}
          {customMenu && <Nav.Item><SimpleMenu /></Nav.Item>}
          {/* </Nav> */}
          {/* </Col>
          </Row> */}
        </div>
      </Nav>
      {/* </Container>
      </Navbar> */}
    </>
  );
};

export default Navigation;
