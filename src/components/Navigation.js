/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/images/logo.svg";

const Navigation = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Navbar bg="info" variant="dark">
        <Container className="py-3">
          <Link to="/" className="navbar-brand">
            <img
              alt="A photo album"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Work Out
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
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
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
