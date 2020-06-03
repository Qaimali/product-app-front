import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "../sass/main.scss";
import { storage } from "../firebase/firebase";
import { fetchTasks, addtasks } from "../store/actions/product";
const DropFile = (props) => {
  const [fileNames, setFileNames] = useState([]);
  const handleDrop = (acceptedFiles) => {
    console.log(acceptedFiles[0]);
    var imageAsFile = acceptedFiles[0];
    setFileNames(acceptedFiles.map((file) => file.name));
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
        // var percent = Math.round(
        //   (snapShot.bytesTransferred * 100) / snapShot.totalBytes
        // );
        //setProgress(percent);
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
            console.log(fireBaseUrl);
            alert("yyy");
            //setIsUploading(false);
          });
      }
    );
  };
  return (
    <div>
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
              <span>{isDragActive ? "📂" : "📁"}</span>
              <p>Drag'n'drop images, or click to select files</p>
            </div>
          );
        }}
      </Dropzone>
      <div>
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
