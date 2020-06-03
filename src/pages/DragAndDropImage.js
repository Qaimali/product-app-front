import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "../sass/main.scss";
import { storage } from "../firebase/firebase";
import CircularProgressWithLabel from "../components/progressBar";

const DropFile = (props) => {
  //states

  const [fileNames, setFileNames] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  //methods

  const handleDrop = (acceptedFiles) => {
    var imageAsFile = acceptedFiles[0];
    if (imageAsFile) {
      setIsUploading(true);
      const uploadTask = storage
        .ref(`/images/${imageAsFile.name}`)
        .put(imageAsFile);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          //takes a snap shot of the process as it is happening

          var percent = Math.round(
            (snapShot.bytesTransferred * 100) / snapShot.totalBytes
          );
          setProgress(percent);
        },
        (err) => {
          //catches the errors
          console.log(err);
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage
            .ref("images")
            .child(imageAsFile.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              setIsUploading(false);
              setFileNames((files) => [...files, acceptedFiles[0].name]);
            });
        }
      );
    } else {
      alert("Invlid File ,Drop Image");
    }
  };

  //View
  return (
    <div className="container">
      <Dropzone
        onDrop={handleDrop}
        accept="image/*"
        minSize={1024}
        maxSize={3072000}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject,
        }) => {
          // additional CSS depends on dragging status
          const additionalClass = isDragAccept
            ? "accept"
            : isDragReject
            ? "reject"
            : "";

          return (
            <div
              {...getRootProps({
                className: `dropzone ${additionalClass}`,
              })}
            >
              <input {...getInputProps()} />
              <span>{isDragActive || isUploading ? "📂" : "📁"}</span>
              <p>Drag'n'drop images, or click to select files</p>
              {isUploading && <CircularProgressWithLabel value={progress} />}
            </div>
          );
        }}
      </Dropzone>
      <div className="images-list">
        <strong>Files:</strong>
        <ul>
          {fileNames.map((fileName) => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default DropFile;
