import React, { useState } from "react";
import { Link } from 'react-router-dom'

import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import Icon from '@mui/material/Icon';
import { Breadcrumb } from "react-bootstrap";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Navigation from '../components/Navigation'

import { useAuth } from "../contexts/AuthContext";
import { useMobile } from "../contexts/MobileContext";

import MobileList from '../cms_components/MobileList'
import useMobileStyles from '../hooks/useMobileStyles'

const UpdateProfile = () => {
  const { updateProfileData, admin } = useAuth();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { mobile, mobileDisplays, setMobileDisplays, mobileWidth, menuShowing, setMenuShowing } = useMobile()

  const containerStyles = useMobileStyles()

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


    // profit!
    const msg = await updateProfileData(mail, password1, name)
    if (msg.error) setError(msg.error)
    else setMessage(msg.msg)

    setLoading(false);

  }
  return (
    <>
      <Row>
        {!mobile && <Breadcrumb className="m-5 pt-5">
          <HomeIcon sx={{ mr: 1, mb: 0 }} fontSize="medium" />
          <Breadcrumb.Item >
            <Link to={admin ? "/cms/index" : "/"}> Home</Link>
          </Breadcrumb.Item>
        </Breadcrumb>}
        <Row style={mobile && admin ? { ...containerStyles, justifyContent: 'center', width: `${mobileWidth}px` }
          : mobile ? { width: '100%', marginTop: '3rem' } : { marginTop: '1rem' }}>

          {admin && mobile && <Navigation />}

          {mobile && admin && <Icon onClick={() => setMobileDisplays(!mobileDisplays)} style={{
            border: '1px solid lightgrey',
            width: '40px', height: '40px', textAlign: 'left', zIndex: '5', margin: '0 auto', padding: '8px',
            borderRadius: '5px', position: 'absolute', top: `-20px`, left: '45%', backgroundColor: 'rgb(255, 255, 255)'
          }}
            color='primary'>device_unknown</Icon>}

          {mobileDisplays && <MobileList />}
          <Col style={mobile & admin ? { width: '100%' } : {}}>
            <Card onClick={() => {
              mobileDisplays && setMobileDisplays(!mobileDisplays);
              if ((window.innerWidth < 1100 || mobile) && menuShowing) setMenuShowing(false);
            }
            } id="update-profile-form" style={mobile & admin ? { maxWidth: '100%', width: '100%', margin: '3rem 0' } : {}}>
              <Card.Body style={mobile & admin ? { width: '100%' } : {}}>
                <Card.Title>Update Profile</Card.Title>

                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}

                <Form onSubmit={handleSubmit} onChange={() => { setMessage(''); setError(null); setLoading(false) }}>
                  <Form.Group id="displayName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={currentUser.display_name}
                    />
                  </Form.Group>

                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={currentUser.email}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label type="password">Password</Form.Label>
                    <Form.Control
                      id="password"
                      placeholder="Enter a new password"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                      id="password-confirm"
                      type="password"
                      placeholder="Confirm the new password"
                      // defaultValue={currentPassword}
                      required
                    />
                  </Form.Group>
                  <Button disabled={loading} type="submit">
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default UpdateProfile;
