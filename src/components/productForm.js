import React, { Fragment, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "../sass/main.scss";
import { storage } from "../firebase/firebase";
import { TextField, Button } from "@material-ui/core";
import CircularProgressWithLabel from "./progressBar";
import { ProductContext } from "../context/productContext";

const ProductForm = () => {
  //state
  const [imageAsFile, setImageAsFile] = useState("");

  const [isUploading, setIsUploading] = useState(false); //besides of using states of form , better approach is to use formik ,formik manages forms without pain
  const [progress, setProgress] = useState(0);

  //context methods
  const { addTasks } = React.useContext(ProductContext);

  //methods
  const handleImageAsFile = (e, setFieldValue) => {
    const image = e.target.files[0];
    setImageAsFile(image);
    setFieldValue("image", URL.createObjectURL(e.target.files[0]));
  };

  const submitImage = (fields, resetForm) => {
    if (imageAsFile === "") {
      setIsUploading(false);
    } else {
      const uploadTask = storage
        .ref(`/images/${imageAsFile.name}`)
        .put(imageAsFile);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
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
              addTasks(fields.prod_name, fields.quantity, fireBaseUrl);
              //fetchTasks();
              resetForm();
            });
        }
      );
    }
  };

  //view

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
        onSubmit={(fields, { resetForm }) => {
          setIsUploading(true);
          submitImage(fields, resetForm);
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
              <div className="input-group">
                <TextField
                  error={errors.prod_name && touched.prod_name ? 1 : 0}
                  value={values.prod_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="prod_name"
                  label="Name"
                  size="small"
                  helperText={
                    errors.prod_name && touched.prod_name
                      ? errors.prod_name
                      : null
                  }
                  className="input-field"
                />

                <TextField
                  error={errors.quantity && touched.quantity ? 1 : 0}
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Quantity"
                  size="small"
                  type="number"
                  helperText={
                    errors.quantity && touched.quantity ? errors.quantity : null
                  }
                  className="input-field"
                />

                <div className="upload-btn-wrapper input-field">
                  <Button
                    variant="contained"
                    size="small"
                    className={
                      errors.image && touched.image ? "button-error" : ""
                    }
                  >
                    Upload Image
                  </Button>
                  <input
                    id="file"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleImageAsFile(event, setFieldValue)
                    }
                    //style={{display:'none'}}
                  />
                </div>
              </div>

              {values.image !== "" && (
                <div className="image-group">
                  <img src={values.image} alt="product " />
                </div>
              )}
            </div>
            <div className="submit-div">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="small"
                disabled={isUploading ? true : false}
              >
                Add
              </Button>
              {isUploading && <CircularProgressWithLabel value={50} />}
            </div>
          </Form>
        )}
      />
    </Fragment>
  );
};
export default ProductForm;
