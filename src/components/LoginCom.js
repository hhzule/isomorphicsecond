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


function LoginCom() {
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
        <div className="ext-su">
            <div className="ext-su-hu">
                <div><img src={backone} alt="" style={{ width: "35vw" }} /></div>
                <div className="ext-new-su">
                    <div>
                        {/* <h6 style={{ fontSize: "100%" }}>Start For Free</h6> */}
                        <h3 style={{ fontSize: "200%" }}>Sign In To Nomtrips</h3>
                    </div>
                    <div>
                        <button disabled={loading} onClick={handleloginwithgoogle}>
                            <FaGoogle /> Sign In With Google

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



                                <div className="">
                                    <button disabled={loading} className="butn normal-btn" type="submit" style={{ width: "82%" }}>
                                        Sign In
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

export default LoginCom;
