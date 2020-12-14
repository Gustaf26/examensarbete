import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
	const { currentUser } = useAuth()

	return (
		<div>
			<p>This is my home component.</p>

			<p>You are logged in as <strong>{currentUser.uid}</strong></p>
		</div>
	)
}

export default Home
