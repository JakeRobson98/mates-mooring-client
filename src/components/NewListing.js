import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../slices/message";
import { newListing } from "../slices/listings"
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import MyMap from "../components/common/Map";
const Home = () => {

  const { listings } = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [longitude, setlongitude] = useState(0)
  const [latitude, setlatitude] = useState(0)
  const [inWater, setInWater] = useState(false)
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    title: "",
    price: "",
  };

  const handleSubmit = (formValue) => {
    const { title, price } = formValue;
    console.log(inWater)
    dispatch(newListing({ title, price, latitude, longitude, inWater}))
      .unwrap()
      .then(() => {
        navigate("/home");
        dispatch(clearMessage());
      })
      .catch((e) => {
        console.log(e)
      });
  };

  function updateLatLong (latitude, longitude, inWater){
    console.log(inWater)
    setlatitude(latitude)
    setlongitude(longitude)
    setInWater(inWater)
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .test(
        "len",
        "The title must be between 3 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    price: Yup.number()
      .required("This field is required!"),
  });


  return (
    <div className="container">
      <header className="jumbotron">
        <h1>New Listing</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
              <div>
              <div className="form-group">
                  <MyMap updateLatLong={(lat, long, inWater) => updateLatLong(lat, long, inWater)} viewMap={false}></MyMap>
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field name="title" type="title" className="form-control" />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <Field
                    name="price"
                    type="number"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Confirm listing</button>
                </div>
              </div>
          </Form>
        </Formik>
      </header>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
