import React, { useState, useEffect, useCallback, useContext } from "react";
import Alert from "react-bootstrap/Alert";
import ProgressBar from "react-bootstrap/esm/ProgressBar";
import { useDropzone } from "react-dropzone";
import useUploadImage from "../../hooks/useUploadImage";
import { useCreate } from "../../contexts/CreateContext";

const UploadImageDropzone = ({ type }) => {
  const [uploadFile, setUploadFile] = useState({ file: "", type: "" });
  const [message, setMessage] = useState(null);
  const { imageUrl } = useCreate();
  const { uploadProgress, error, isSuccess } = useUploadImage(uploadFile);

  useEffect(() => {
    if (error) {
      setMessage({
        error: true,
        text: error,
      });
    } else if (isSuccess) {
      setMessage({
        success: true,
        text: "Image successfully uploaded!",
      });
    } else {
      setMessage(null);
    }
  }, [error, isSuccess]);

  const onDrop = useCallback((acceptedFiles) => {
    setMessage(null);

    if (acceptedFiles.length === 0) {
      return;
    }

    setUploadFile({
      file: acceptedFiles[0],
      type: type,
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png",
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      id="upload-image-dropzone-wrapper"
      className={`text-center px-4 py-3 my-3 ${
        isDragAccept ? `drag-accept` : ``
      } ${isDragReject ? `drag-reject` : ``}`}
    >
      <input type="image" {...getInputProps()} />
      {isDragActive ? (
        isDragAccept ? (
          <p>Drop image</p>
        ) : (
          <p>File not allowed</p>
        )
      ) : (
        <p>Drop here product picture</p>
      )}
      {acceptedFiles && (
        <div className="accepted-files mt-2">
          <ul className="list-unstyled">
            {acceptedFiles.map((file) => (
              <li key={file.name}>
                {file.name} ({Math.round(file.size / 1024)} kb)
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Output upload status */}
      {uploadProgress !== null && uploadProgress !== 100 && (
        <ProgressBar variant="success" animated now={uploadProgress} />
      )}

      {message && (
        <Alert variant={message.error ? "warning" : "success"}>
          {message.text}
        </Alert>
      )}
    </div>
  );
};

export default UploadImageDropzone;