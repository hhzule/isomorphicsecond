import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";
import logo from "../assets/company-logo.png"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Signup() {
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

  // const MyCheckbox = ({ children, ...props }) => {
  //   const [field, meta] = useField({ ...props, type: 'checkbox' });
  //   return (
  //     <div>
  //       <label className="checkbox">
  //         <input type="checkbox" {...field} {...props} />
  //         {children}
  //       </label>
  //       {meta && meta.error ? (
  //         <div className="error">{meta.error}</div>
  //       ) : null}
  //     </div>
  //   );
  // };
  return (
    <div className="main">
      <div className="main-signup">
        <div className="signup">
          <div className="primary"><div className="logo-div">
            <img src={logo} alt="" className="logo" />
            <h2>Welcome to Nomtrips Planner <br /><br />Don't have an account? Register below.</h2></div>
            {error && <Alert variant="danger">{error}</Alert>}
            {/* <form className="form" onSubmit={handleSubmit}>
              <div id="email">
                <input
                  placeholder="Email"
                  type="email"
                  ref={emailRef}
                  required
                />
              </div>
              <div id="password">
                <input
                  placeholder="Password"
                  type="password"
                  ref={passwordRef}
                  required
                />
              </div>
              <div className="signup-btn">
                <button disabled={loading} className="normal-btn" type="submit">
                  Sign Up
                </button>{" "}
              </div>
            </form> */}
            <div className="form">
              <Formik

                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({

                  email: Yup.string().email('Invalid email address').required('Required Field'),
                  password: Yup.string().oneOf([Yup.ref('password'), null]).min(8, 'Must be 8 characters or more').required("Required Field"),
                  // acceptedTerms: Yup.boolean()
                  //   .required('Required')
                  //   .oneOf([true], 'You must accept the terms and conditions.'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    handleSubmit(values.email, values.password)
                    setSubmitting(false);
                  }, 100);
                }}
              ><Form className="form" >
                  {/* <label htmlFor="email">Email Address</label> */}

                  <Field name="email" type="email" placeholder="Email address" autoComplete="off" />
                  <p className="error"> <ErrorMessage name="email" /></p>
                  {/* <label htmlFor="password">Password</label> */}
                  <Field name="password" type="password" placeholder="Password" autoComplete="off" />
                  <p className="error"> <ErrorMessage name="password" /><br></br></p>
                  {/* <MyCheckbox  name="acceptedTerms" style={{ transform: "translateX(-100%)" }}> */}

                  <p >          <input type="checkbox" onClick={() => htoggle()} />I accept <a href="https://www.nomtrips.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer">The Terms & Conditions</a> and have read <a href="https://www.nomtrips.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy  </a> </p>

                  {/* </MyCheckbox> */}
                  <div className="signup-btn">
                    <button disabled={loading} className="butn normal-btn" type="submit">
                      Sign Up
                </button>{" "}
                  </div>

                  {/* <button type="submit">Submit</button> */}

                </Form>
              </Formik>
            </div>
            <div className="signup-btn">
              <button disabled={loading} className="butn facebook-btn" onClick={handleloginwithfacebook}>
                <i className="fab fa-facebook"></i> <p>Sign Up With Facebook</p>
              </button>{" "}
              <button disabled={loading} className="butn twitter-btn" onClick={handleloginwithgoogle}>
                <i className="fab fa-google"></i> <p>Sign Up With Google</p>
              </button></div>
          </div>
        </div>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
// https://isomorphic-dadb8.firebaseapp.com/__/auth/handler