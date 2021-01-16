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

const Navigation = () => {
  const { currentUser, admin } = useAuth();
  const [createLink, setCreate] = useState(false);
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
  }, [admin]);

  return (
    <div>
      <Navbar id="navigation">
        <Container>
          <Row className="justify-content-end py-3 m-left-3" lg={12}>
            <Col lg={3}>
              <Link to="/" className="navbar-brand m-left-3 nav-item">
                <img
                  alt="A logo"
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{" "}
                Work Out
              </Link>
            </Col>
            <Col sm={12} md={10} lg={8} className="mx-auto">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Form onSubmit={omitReload} inline>
                  <FormControl
                    onChange={changeString}
                    type="text"
                    placeholder="Search"
                    className="mr-sm-1 ml-5"
                  />
                </Form>
                <Nav className="mx-5">
                  {createLink === true ? (
                    <NavLink
                      to="/create"
                      className="mx-4 my-auto"
                      variant="light"
                      href="e-commerce.catala-sverdrup.se"
                    >
                      Create
                    </NavLink>
                  ) : null}
                  <NavDropdown
                    title="All clothes"
                    id="basic-nav-dropdown"
                    className="mx-lg-2"
                  >
                    <NavLink to="/products/troussers" className="dropdown-item">
                      Troussers
                    </NavLink>
                    <NavLink to="/products/jackets" className="dropdown-item">
                      Jackets
                    </NavLink>
                    <NavLink to="/products/t-shirts" className="dropdown-item">
                      T-shirts
                    </NavLink>
                  </NavDropdown>
                  {currentUser ? (
                    <div className="d-flex align-items-center justify-content-between">
                      <NavDropdown
                        title={currentUser.displayName || currentUser.email}
                        id="basic-nav-dropdown"
                        className="mx-lg-2"
                      >
                        <NavLink to="/update-profile" className="dropdown-item">
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
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
