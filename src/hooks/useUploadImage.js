import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { useCreate } from "../contexts/CreateContext";

const useUploadImage = ({ file }) => {
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { setImageUrl, productOption } = useCreate();

  useEffect(() => {
    if (!file) {
      setUploadProgress(null);
      setUploadedImage(null);
      setError(null);
      setIsSuccess(false);

      return;
    }

    // reset environment
    setError(null);
    setIsSuccess(false);

    // get file reference
    const fileRef = storage.ref(`${productOption}/${file.name}`);

    // upload file to fileRef
    const uploadTask = fileRef.put(file);

    // attach listener for `state_changed`-event
    uploadTask.on("state_changed", (taskSnapshot) => {
      setUploadProgress(
        Math.round(
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
        )
      );
    });

    // are we there yet?
    uploadTask.then((snapshot) => {
      // retrieve URL to uploaded file
      snapshot.ref.getDownloadURL().then((url) => {
        // add uploaded file to db
        setImageUrl(url);
      });
    });
  }, [file]);

  return { uploadProgress, uploadedImage, error, isSuccess };
};

export default useUploadImage;
