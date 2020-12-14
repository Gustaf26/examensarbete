import { useEffect } from 'react';
import { db, storage } from '../firebase';

const useDeleteImage = image => {
	useEffect(() => {
		if (!image) {
			return;
		}

		(async () => {
			// delete document in firestore for this image
			await db.collection('images').doc(image.id).delete();

			// delete image from storage
			await storage.ref(image.path).delete();

			// profit! 💰
		})();
	}, [image]);

	return {}
}

export default useDeleteImage
