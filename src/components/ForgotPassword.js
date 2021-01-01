import React, { useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import "./Passreset.css"
import logo from "../assets/company-logo.png"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function ForgotPassword() {
  // const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(email) {
    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(email)
      setMessage("Check your inbox for further instructions")
    } catch (e) {
      setError("Failed to reset password. " + e.message)
    }

    setLoading(false)
  }

  return (

    <div className="main">
      <div className="main-reset">
        <div className="reset">
          <div className="primary">
            <div className="logo-div">
              <img src={logo} alt="" className="logo" />

              <h2 className="text-center mb-4">Password Reset</h2>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            {/* <form className="form" onSubmit={handleSubmit}>
              <div id="email">
                <input
                  placeholder="Email"
                  type="email"
                  ref={emailRef}
                  required
                />
              </div>
              <div className="reset-btn">
                <button className="normal-btn" disabled={loading} type="submit">
                  Reset Password
            </button>
              </div>

            </form> */}
            <div className="form">
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                  email: Yup.string().email('Invalid email address').required('Required Field'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    handleSubmit(values.email)
                    setSubmitting(false);
                  }, 100);
                }}
              ><Form>
                  {/* <label htmlFor="email">Email Address</label> */}
                  <Field name="email" type="email" placeholder="Email address" />
                  <p className="error">  <ErrorMessage name="email" /></p>
                  {/* <label htmlFor="password">Password</label> */}


                  <div className="login-btn">
                    <button disabled={loading} className="" type="submit">
                      Reset Password
              </button>
                  </div>
                </Form>
              </Formik>
            </div>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}
