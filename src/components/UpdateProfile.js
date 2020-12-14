import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const UpdateProfile = () => {
	const displayNameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [error, setError] = useState(null)
	const [message, setMessage] = useState(null)
	const [loading, setLoading] = useState(false)
	const { currentUser, updateEmail, updatePassword, updateProfile } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()

		// make sure user has entered the same password in both input fields
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match")
		}

		setError(null);
		const updateTasks = []

		try {
			// disable update-button while updating is in progress
			setLoading(true)

			// update displayName if user has changed it
			if (displayNameRef.current.value !== currentUser.displayName) {
				updateTasks.push(updateProfile(displayNameRef.current.value))
			}

			// update email if user has changed it
			if (emailRef.current.value !== currentUser.email) {
				updateTasks.push(updateEmail(emailRef.current.value))
			}

			// wait for all updateTasks to finish
			await Promise.all(updateTasks)

			// update password if user has provided a new password
			if (passwordRef.current.value) {
				await updatePassword(passwordRef.current.value)
			}

			// profit!
			setMessage("Profile successfully updated")
			setLoading(false)
		} catch (e) {
			setError("Error updating profile. Try logging out and in again.")
			setLoading(false)
		}
	}

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Update Profile</Card.Title>

							{error && (<Alert variant="danger">{error}</Alert>)}
							{message && (<Alert variant="success">{message}</Alert>)}

							<Form onSubmit={handleSubmit}>

								<Form.Group id="displayName">
									<Form.Label>Name</Form.Label>
									<Form.Control type="text" ref={displayNameRef} defaultValue={currentUser.displayName} />
								</Form.Group>

								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
								</Form.Group>

								<Form.Group id="password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} />
								</Form.Group>

								<Form.Group id="password-confirm">
									<Form.Label>Password Confirmation</Form.Label>
									<Form.Control type="password" ref={passwordConfirmRef} />
								</Form.Group>

								<Button disabled={loading} type="submit">Update</Button>

							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default UpdateProfile
