import React, { useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../contexts/AuthContext'
import useDeleteImage from '../../hooks/useDeleteImage'

const ImagesGrid = ({ images }) => {
	const [deleteImage, setDeleteImage] = useState(null);
	const { currentUser } = useAuth()
	useDeleteImage(deleteImage);

	const handleDeleteImage = (image) => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Are you really sure you want to delete the image\n"${image.name}"?`)) {
			setDeleteImage(image);
		}
	}

	return (
		<SRLWrapper>
			<Row className="my-3">
				{images.map(image => (
					<Col sm={6} md={4} lg={3} key={image.id}>
						<Card className="mb-3">
							<a href={image.url} title="View image in lightbox" data-attribute="SRL">
								<Card.Img variant="top" src={image.url} title={image.name} />
							</a>
							<Card.Body>
								<Card.Text className="text-muted small">
									{image.name} ({Math.round(image.size/1024)} kb)
								</Card.Text>
								{
									currentUser.uid === image.owner && (
										<Button variant="danger" size="sm" onClick={() => {
											handleDeleteImage(image)
										}}>
											Delete
										</Button>
									)
								}
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</SRLWrapper>
	)
}

export default ImagesGrid
