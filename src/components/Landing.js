import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "./Landing.css";
// import logo from "../assets/company-logo.png"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import backone from "../assets/Images-20201231T125621Z-001/Images/signup-pic.png"

function Landing() {
  const [t, sT] = useState(false)

  const { signup, loginwithgoogle, loginwithfacebook } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const htoggle = () => {
    sT(!t)
  }

  async function handleSubmit(email, password) {

    if (t) {
      try {
        setError("");
        setLoading(true);
        await signup(email, password);
        // console.log(currentUser?.displayName, " dispaly name")
        // var displayName = firstName + " " + lastName
        // await profile(displayName)

        history.push("/");

      } catch (e) {
        setError("Failed to create an account. " + e.message);
      }

      setLoading(false);
    } else {
      setError("You must accept terms and conditions")
      return null
    }

  }

  async function handleloginwithgoogle(e) {
    e.preventDefault();
    if (t) {
      try {
        setError("");
        setLoading(true);
        await loginwithgoogle();
        history.push("/");
      } catch (e) {
        setError("Failed to create an account. " + e.message);
      }

      setLoading(false);
    } else {
      setError("You must accept terms and conditions")
      return null
    }

  }

  async function handleloginwithfacebook(e) {
    e.preventDefault();
    if (t) {
      try {
        setError("");
        setLoading(true);
        await loginwithfacebook();
        history.push("/");
      } catch (e) {
        setError("Failed to create an account. " + e.message);
      }

      setLoading(false);
    } else {
      setError("You must accept terms and conditions")
      return null
    }

  }



  return (
    <div className="ext-su">
      <div className="ext-su-hu">
        <div><img src={backone} alt="" style={{ width: "35vw" }} /></div>
        <div className="ext-new-su">
          <div>
            <h6 style={{ fontSize: "100%" }}>Start For Free</h6>
            <h3 style={{ fontSize: "200%" }}>Sign Up To Nomtrips</h3>
          </div>
          <div>
            <button disabled={loading} onClick={handleloginwithgoogle}>
              <FaGoogle /> Sign Up With Google

            </button>
            <button disabled={loading} onClick={handleloginwithfacebook} >
              <FaFacebook />
            </button>

          </div>

          <div className="or-section-hr">
            <h5> OR </h5>
          </div>
          <div className="section-inputs-nes-sect">
            {error && <Alert variant="danger">{error}</Alert>}
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required Field'),
                password: Yup.string().oneOf([Yup.ref('password'), null]).min(8, 'Must be 8 characters or more').required("Required Field"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  handleSubmit(values.email, values.password)
                  setSubmitting(false);
                }, 100);
              }}
            ><Form className="form" >
                <div style={{ display: "grid", gridTemplateColumns: "4fr" }}>
                  <Field name="email" type="email" placeholder="Email address" autoComplete="off" />
                  <p className="error"> <ErrorMessage name="email" /></p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "12fr 0fr" }}>
                  {/* <input
                type="text"
                className="middle-special-inp"
                style={{ width: "100%" }}
                /> */}
                  <Field name="password" type="password" placeholder="Password" autoComplete="off" />
                  <p className="error"> <ErrorMessage name="password" /><br></br></p>
                </div>


                <p style={{ marginRight: "80px" }}>          <input type="checkbox" onClick={() => htoggle()} />I accept <a href="https://www.nomtrips.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer">The Terms & Conditions</a> and have read <br /> <a href="https://www.nomtrips.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy  </a> </p>

                <div className="" style={{ width: "92%" }}>
                  <button disabled={loading} className="butn normal-btn" type="submit">
                    Sign Up
                </button>{" "}
                </div>
              </Form>
            </Formik>




          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
