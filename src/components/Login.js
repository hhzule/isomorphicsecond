import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import logo from "../assets/company-logo.png"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  // const emailRef = useRef();
  // const passwordRef = useRef();
  const { login, loginwithfacebook, loginwithgoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleloginwithgoogle(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await loginwithgoogle();
      history.push("/");
    } catch (e) {
      setError("Failed to create an account. " + e.message);
    }

    setLoading(false);
  }

  async function handleloginwithfacebook(e) {
    e.preventDefault();
    // alert("Accept terms and conditions ")
    try {
      setError("");
      setLoading(true);
      await loginwithfacebook();
      history.push("/");
    } catch (e) {
      setError("Failed to create an account. " + e.message);
    }

    setLoading(false);
  }

  async function handleSubmit(email, password) {

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      setTimeout(() => {
        history.push("/");
      }, 1000);

    } catch (e) {
      setError("Failed to log in. " + e.message.slice(0, 24));
    }

    setLoading(false);
  }

  return (
    <div className="main">
      <div className="main-login">
        <div className="login">
          <div className="primary">
            <div className="logo-div">
              <img src={logo} alt="" className="logo" />
              <h2>Sign In</h2>
            </div>
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
              <div className="login-btn">
                <button disabled={loading} className="" type="submit">
                  Log In
              </button>
              </div>

            </form> */}
            <div className="form">
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                  email: Yup.string().email('Invalid email address').required('Required Field'),
                  password: Yup.string().oneOf([Yup.ref('password'), null]).required("Required Field"),

                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    handleSubmit(values.email, values.password)
                    setSubmitting(false);
                  }, 100);
                }}
              ><Form>
                  {/* <label htmlFor="email">Email Address</label> */}

                  <Field name="email" type="email" placeholder="Email address" />
                  <p className="error">  <ErrorMessage name="email" /></p>
                  {/* <label htmlFor="password">Password</label> */}
                  <Field name="password" type="password" placeholder="Password" />
                  <p className="error">  <ErrorMessage name="password" /></p>
                  <div className="w-100 text-center mt-2">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                  <div className="login-btn">
                    <button disabled={loading} className="" type="submit">
                      Sign In
              </button>
                    <div className="signup-btn">
                      <button disabled={loading} className="butn facebook-btn" onClick={handleloginwithfacebook}>
                        <i className="fab fa-facebook"></i> <p>Sign In With Facebook</p>
                      </button>{" "}
                      <button disabled={loading} className="butn twitter-btn" onClick={handleloginwithgoogle}>
                        <i className="fab fa-google"></i> <p>Sign In With Google</p>
                      </button></div>
                  </div>
                </Form>
              </Formik>
            </div>

          </div>
        </div>
        <div className="w-100 text-center mt-2">
          New to Nomtrips? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
