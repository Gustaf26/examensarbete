import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ForgotPassword = () => {
	const emailRef = useRef()
	const [error, setError] = useState(null)
	const [message, setMessage] = useState(null)
	const [loading, setLoading] = useState(false)
	const { resetPassword } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()

		setError(null);

		try {
			// try to send a password reset email to the specified user
			setLoading(true)
			await resetPassword(emailRef.current.value)
			setMessage("Please check your email for further instructions.")
		} catch (e) {
			setError("Something went wrong. Please check your email address.")
			setLoading(false)
		}
	}

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Forgot Password</Card.Title>

							{error && (<Alert variant="danger">{error}</Alert>)}
							{message && (<Alert variant="success">{message}</Alert>)}

							<Form onSubmit={handleSubmit}>

								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Button disabled={loading} type="submit">Reset Password</Button>

							</Form>
						</Card.Body>
					</Card>
					<div className="text-center mt-2">
						Remembered password? <Link to="/login">Log In</Link>
					</div>
				</Col>
			</Row>
		</>
	)
}

export default ForgotPassword
