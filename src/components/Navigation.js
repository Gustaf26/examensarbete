/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
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
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/images/logo.svg";

const Navigation = () => {
  const { currentUser, admin } = useAuth();
  const [createLink, setCreate] = useState(false);

  useEffect(() => {
    if (admin === true) {
      setCreate(true);
    } else {
      setCreate(false);
    }
  }, [admin]);

  return (
    <div>
      <Navbar bg="info" variant="dark">
        <Container>
          <Row className="justify-content-end py-3 m-left-3" lg={12}>
            <Link to="/" className="navbar-brand m-left-3">
              <img
                alt="A photo album"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Work Out
            </Link>
            <Col lg={8}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-1 ml-5 pr-lg-5"
                  />
                </Form>
                <Nav className="ml-auto">
                  {createLink === true ? (
                    <NavLink
                      to="/create"
                      className="mx-4 my-auto"
                      variant="dark"
                    >
                      Create product
                    </NavLink>
                  ) : null}
                  <NavDropdown title="All clothes" id="basic-nav-dropdown">
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
                    <NavDropdown
                      title={currentUser.displayName || currentUser.email}
                      id="basic-nav-dropdown"
                    >
                      <NavLink to="/update-profile" className="dropdown-item">
                        Update Profile
                      </NavLink>
                      <NavDropdown.Divider />
                      <NavLink to="/logout" className="dropdown-item">
                        Log Out
                      </NavLink>
                    </NavDropdown>
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
