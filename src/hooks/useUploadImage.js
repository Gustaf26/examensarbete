import { useState, useEffect, useRef } from "react";
import { db, storage } from "../firebase";

const useUploadImage = ({ file, type }) => {
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const imageUrl = useRef("");
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

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
    const fileRef = storage.ref(`${type}/${file.name}`);

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
        imageUrl.current = url;
      });
    });
    //       db.collection("images")
    //         .add(image)
    //         .then(() => {
    //           // let user know we're done
    //           setIsSuccess(true);
    //           setUploadProgress(null);

    //           // file has been added to db, refresh list of files
    //           setUploadedImage(image);
    //           setIsSuccess(true);
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("File upload triggered an error!", error);
    //     setError({
    //       type: "warning",
    //       msg: `Image could not be uploaded due to an error (${error.code})`,
    //     });
    //   });
  }, [file]);

  return { uploadProgress, uploadedImage, error, isSuccess, imageUrl };
};

export default useUploadImage;
