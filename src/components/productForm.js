import React, { Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage, isPromise } from "formik";
import * as Yup from "yup";
import "../sass/main.scss";
import { fetchTasks, addtasks } from "../store/actions/product";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../firebase/firebase";
import CircularProgressWithLabel from "./progressBar";
const ProductForm = () => {
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  console.log(imageAsFile);
  const handleImageAsFile = (e, setFieldValue) => {
    console.log(e.target.files[0]);
    const image = e.target.files[0];
    setImageAsFile(image);
    setFieldValue("image", URL.createObjectURL(e.target.files[0]));
  };
  const dispatch = useDispatch();
  return (
    <Fragment>
      <h3>Create Product</h3>
      <Formik
        initialValues={{
          prod_name: "",
          quantity: 0,
          image: "",
        }}
        validationSchema={Yup.object().shape({
          prod_name: Yup.string().required("Product Name is required"),
          quantity: Yup.number()
            .min(1)
            .required("Product Quantity is required"),
          image: Yup.string().required("Product Image is required"),
        })}
        onSubmit={(fields) => {
          setIsUploading(true);
          console.log(fields);
          alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields));
          console.log(fields);
          // dispatch(addtasks(fields.prod_name, fields.quantity, fields.image));
          // dispatch(fetchTasks());
          if (imageAsFile === "") {
            console.error(
              `not an image, the image file is a ${typeof imageAsFile}`
            );
          }
          const uploadTask = storage
            .ref(`/images/${imageAsFile.name}`)
            .put(imageAsFile);
          uploadTask.on(
            "state_changed",
            (snapShot) => {
              //takes a snap shot of the process as it is happening
              console.log(snapShot);
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
                  setImageAsUrl((prevObject) => ({
                    ...prevObject,
                    imgUrl: fireBaseUrl,
                  }));
                  setIsUploading(false);
                  dispatch(
                    addtasks(fields.prod_name, fields.quantity, fireBaseUrl)
                  );
                  dispatch(fetchTasks());
                });
            }
          );
        }}
        render={({
          errors,
          status,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
        }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                name="prod_name"
                type="text"
                className={
                  "form-control" +
                  (errors.prod_name && touched.prod_name ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="prod_name"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Qunatity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              <ErrorMessage
                name="qunatity"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Image</label>

              <input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                onChange={(event) => handleImageAsFile(event, setFieldValue)}
                className={
                  "form-control" +
                  (errors.confirmPassword && touched.confirmPassword
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="image"
                component="div"
                className="invalid-feedback"
              />
              <div>
                <img src={values.image} width="30px" height="30px" />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-2">
                Register
              </button>
              {isUploading && <CircularProgressWithLabel value={progress} />}
            </div>
          </Form>
        )}
      />
    </Fragment>
  );
};
export default ProductForm;
