/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/images/logo.svg'

const Navigation = () => {
	const { currentUser } = useAuth()

	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Link to="/" className="navbar-brand">
						<img
							alt="A photo album"
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>{' '}
						Snapgram
					</Link>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<NavLink to="/albums" className="nav-link">Albums</NavLink>
							{
								currentUser ? (
									<NavDropdown title={currentUser.displayName || currentUser.email} id="basic-nav-dropdown">
										<NavLink to="/update-profile" className="dropdown-item">Update Profile</NavLink>
										<NavDropdown.Divider />
										<NavLink to="/logout" className="dropdown-item">Log Out</NavLink>
									</NavDropdown>
								) : (
									<NavLink to="/login" className="nav-link">Login</NavLink>
								)
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}

export default Navigation
