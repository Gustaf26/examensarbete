import React from 'react'
import { useParams } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import ImagesGrid from './ImagesGrid'
import useAlbum from '../../hooks/useAlbum'
import UploadAlbumImage from './UploadAlbumImage'

const Album = () => {
	const { albumId } = useParams()
	const { album, images, loading } = useAlbum(albumId)

	return (
		<>
			<h2 className="mb-3">Album {album && album.title}</h2>

			<UploadAlbumImage albumId={albumId} />

			<hr />

			{loading
				? (<BounceLoader color={"#888"} size={20} />)
				: (<ImagesGrid images={images} />)
			}
		</>
	)
}

export default Album
