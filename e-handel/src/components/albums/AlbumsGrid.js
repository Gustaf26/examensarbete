import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PhotoPlaceholder from '../../assets/images/photo-placeholder.png'

const AlbumsGrid = ({ albums }) => {
	return (
		<Row>
			{albums.map(album => (
				<Col sm={6} md={4} lg={3} key={album.id}>
					<Card className="mb-3">
						<Link to={`/albums/${album.id}`}>
							<Card.Img variant="top" src={PhotoPlaceholder} title={album.title} />
						</Link>
						<Card.Body>
							<Card.Title className="mb-0">
								<Link to={`/albums/${album.id}`}>{album.title}</Link>
							</Card.Title>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	)
}

export default AlbumsGrid
