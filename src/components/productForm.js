import React, { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../sass/main.scss";
import { fetchTasks, addtasks } from "../store/actions/product";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../firebase/firebase";
const ProductForm = () => {
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
          console.log(fields);
          alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields));
          console.log(fields);
          dispatch(addtasks(fields.prod_name, fields.quantity, fields.image));
          dispatch(fetchTasks());
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
                onChange={(event) =>
                  setFieldValue(
                    "image",
                    URL.createObjectURL(event.target.files[0])
                  )
                }
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
            </div>
          </Form>
        )}
      />
    </Fragment>
  );
};
export default ProductForm;
