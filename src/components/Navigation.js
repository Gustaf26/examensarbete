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
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import logo from "../assets/images/logo.svg";
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
    if (admin === true && currentUser) {
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
  });

  return (
    <div>
      <Navbar id="navigation">
        <Container>
          <Row className="py-3 m-left-3 d-flex" id="nav-row">
            <Col lg={4} sm={12}>
              <Nav>
                <NavLink to="/" id="logo" className="navbar-brand m-left-3">
                  Work Out
                </NavLink>
              </Nav>
            </Col>
            <Col
              sm={12}
              md={10}
              lg={6}
              className="mx-auto my-auto justify-content-end"
            >
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Form onSubmit={omitReload} inline>
                  <FormControl
                    onChange={changeString}
                    type="text"
                    id="product-search"
                    placeholder="Search product"
                    className="mr-sm-1 ml-5 navitem"
                  />
                </Form>
                {!customMenu && (
                  <Nav className="mx-3" id="nav-links">
                    {createLink === true ? (
                      <NavLink
                        to="/create"
                        className="ml-3 mr-5 my-auto"
                        variant="light"
                        href="e-commerce.catala-sverdrup.se"
                      >
                        Create
                      </NavLink>
                    ) : null}
                    <NavDropdown
                      title="All clothes"
                      id="basic-nav-dropdown"
                      className="mx-lg-2 navitem"
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
                          title={currentUser.displayName || currentUser.email}
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
                      <NavLink to="/login" className="nav-link navitem">
                        Sign In / Register
                      </NavLink>
                    )}
                  </Nav>
                )}
                {customMenu && <SimpleMenu />}
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
