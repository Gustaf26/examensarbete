import React, { useState } from "react";
import { Link, useNavigate } from 'react-router'

import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";

import Icon from '@mui/material/Icon';
import { Breadcrumb } from "react-bootstrap";
import HomeIcon from '@mui/icons-material/Home';


import Navigation from '../../components/Navigation'

import { useAuth } from "../../contexts/AuthContext";
import { useMobile } from "../../contexts/MobileContext";

import MobileList from '../../cms_components/MobileList'
import useMobileStyles from '../../hooks/useMobileStyles'

const UpdateProfile = () => {
  // const { updateProfileData, admin } = useAuth();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser, admin } = useAuth();
  const { mobile, mobileDisplays, setMobileDisplays, mobileWidth, menuShowing, setMenuShowing } = useMobile()
  const navigate = useNavigate()

  const { containerStyles, microMobile } = useMobileStyles()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    // disable update-button while updating is in progress
    setLoading(true);

    let name = e.target[0].value
    let mail = e.target[1].value
    let password1 = e.target[2].value
    let password2 = e.target[3].value

    if (password1 !== password2) {
      setError('Passwords don´t match')
      return
    }

    setCurrentUser({ displayName: name, email: mail })

    setMessage('User successfully updated. You are being redirected')

    setTimeout(() => {
      navigate(admin ? '/cms/index' : '/index', { replace: true })
    }, 2000)

    setLoading(false);

  }
  return (
    <>
      <Row id="dummy-container-products" className={microMobile ? 'dummy-container-products micromobile' : admin && mobile ? 'dummy-container-products admin mobile' :
        admin ? 'dummy-container-products admin' : mobile ? 'dummy-container-products mobile' : 'dummy-container-products'} onClick={(e) => { if (e.target.id === "dummy-container-products") setMobileDisplays(false) }}>
        {((admin && microMobile) || (admin && !mobile)) && <Navigation />}
        <div id="dummy-container-products-row" className={microMobile ? 'dummy-container-products-row micromobile' :
          admin && mobile ? 'dummy-container-products-row admin mobile' :
            admin ? 'dummy-container-products-row admin' : mobile ? 'dummy-container-products-row mobile' : 'dummy-container-products-row'}
          style={mobile && admin && !microMobile ? { ...containerStyles }
            : {}}>

          {admin && mobile && !microMobile && <Navigation />}

          {!mobile && <Breadcrumb className="mx-5 pt-5">

            <HomeIcon sx={{ mr: 1, mb: 0 }} fontSize="medium" />

            <Breadcrumb.Item >
              <Link to={admin ? "/cms/index" : "/"}> Home</Link>
            </Breadcrumb.Item>
          </Breadcrumb>}

          {mobile && admin && !microMobile && <Icon className="icon-mobile-displays" onClick={() => setMobileDisplays(!mobileDisplays)}
            color='primary'>device_unknown</Icon>}

          {mobileDisplays && <MobileList />}

          <Card onClick={() => {
            mobileDisplays && setMobileDisplays(!mobileDisplays);
            if ((window.innerWidth < 1100 || mobile) && menuShowing) setMenuShowing(false);
          }} id="update-profile-form" className={microMobile ? 'micromobile' :
            admin && mobile ? 'admin mobile' :
              admin ? 'admin' : mobile ? 'mobile' : ''}>

            <Card.Body style={mobile & admin ? { width: '100%' } : {}}>
              <Card.Title>Update Profile</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}

              <Form onSubmit={handleSubmit} onChange={() => { setMessage(''); setError(null); setLoading(false) }}>
                <Form.Group id="displayName" className="form-div">
                  <Form.Label className="mt-3">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Gustaf Sverdrup"
                    defaultValue={currentUser.display_name}
                  />
                </Form.Group>

                <Form.Group id="email" className="form-div">
                  <Form.Label className="mt-2">Email</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={currentUser.email}
                    required
                  />
                </Form.Group>

                <Form.Group className="form-div">
                  <Form.Label className="mt-2" type="password">Password</Form.Label>
                  <Form.Control
                    id="password"
                    placeholder="Enter a new password"
                    required
                  />
                </Form.Group>
                <Form.Group className="form-div">
                  <Form.Label className="mt-2">Password Confirmation</Form.Label>
                  <Form.Control
                    id="password-confirm"
                    type="password"
                    placeholder="Confirm the new password"
                    required
                  />
                </Form.Group>
                <Button className="mt-5" disabled={loading} type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </>
  );
};

export default UpdateProfile;
