import React, { useState } from 'react'
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'

const CreateAlbum = () => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [title, setTitle] = useState("")
	const { currentUser } = useAuth()
	const navigate = useNavigate()

	const handleTitleChange = (e) => {
		setTitle(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (title.length < 4) {
			return;
		}

		setError(false)
		setLoading(true)

		try {
			const docRef = await db.collection('albums').add({
				title,
				owner: currentUser.uid,
			})

			navigate(`/albums/${docRef.id}`)
		} catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Create a New Album</Card.Title>

							{error && (<Alert variant="danger">{error}</Alert>)}

							<Form onSubmit={handleSubmit}>

								<Form.Group id="title">
									<Form.Label>Album Title</Form.Label>
									<Form.Control type="title" onChange={handleTitleChange} value={title} required />
									{title && title.length < 4 && (
										<Form.Text className="text-danger">Please enter a title at least 4 characters long.</Form.Text>
									)}
								</Form.Group>

								<Button disabled={loading} type="submit">Create</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default CreateAlbum
