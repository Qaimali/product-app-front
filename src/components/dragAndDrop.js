import React, { useState, useEffect, useRef } from "react";
const DragAndDrop = (props) => {
  const [drag, setDrag] = useState(false);
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const dropRef = useRef(null);
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //dragCounter--;
    // if (this.dragCounter === 0) {
    //   setDrag(false);
    // }
    //setDrag(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      //this.dragCounter = 0;
    }
  };
  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
    return () => {
      let div = dropRef.current;
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  }, []);
  return (
    <div
      style={{ display: "inline-block", position: "relative" }}
      ref={dropRef}
    >
      {drag && (
        <div
          style={{
            border: "dashed grey 4px",
            backgroundColor: "rgba(255,255,255,.8)",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              left: 0,
              textAlign: "center",
              color: "grey",
              fontSize: 36,
            }}
          >
            <div>drop here :)</div>
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
};
export default DragAndDrop;
