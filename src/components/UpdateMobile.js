import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
// import logo from "../assets/company-logo.png"


export default function UpdateMobile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const displayNameRef = useRef()
    const { currentUser, updatePassword, updateEmail, profile, setUrl, picstorage, url } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [imageAsFile, setImageAsFile] = useState();

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(image)
        // console.log(image)
    }


    function handleSubmit(e) {
        e.preventDefault()
        const promises = []
        setLoading(true)
        setError("")
        // console.log(emailRef, "email")
        // console.log(passwordRef, "pass")
        // console.log(displayNameRef, "disname")
        // console.log(imageAsFile, "image")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        if (displayNameRef.current.value) {
            promises.push(profile(displayNameRef.current.value))
        }
        if (imageAsFile !== "") {
            promises.push(picstorage(imageAsFile))
        }

        Promise.all(promises)
            .then(() => {

                history.push("/")
            })
            .catch((e) => {
                setError("Failed to update account. " + e.message)
            })
            .finally(() => {
                setLoading(false)
                setUrl(url)
            })
    }

    // console.log("url", url)
    return (

        <div className="main" style={{ width: "300px", height: "500px" }}>

            <div className="main-update">
                <div className="update">
                    <div className="primary">

                        {error && <Alert variant="danger">{error}</Alert>}
                        <form className="form" onSubmit={handleSubmit}>
                            <div id="firstName">
                                <input
                                    placeholder="Display Name"
                                    type="text"
                                    ref={displayNameRef}
                                    required
                                    defaultValue={currentUser.displayName}
                                />
                            </div>

                            <div id="email">
                                <input
                                    placeholder="Email"
                                    type="email"
                                    ref={emailRef}
                                    required
                                    defaultValue={currentUser.email}
                                />
                            </div>
                            <div id="password">
                                <input
                                    type="password"
                                    ref={passwordRef}
                                    placeholder="Leave blank to keep password the same"
                                />
                            </div>
                            <div id="URL">
                                <input
                                    type="file"
                                    placeholder="Upload your profile pic"
                                    onChange={handleImageAsFile}
                                />
                            </div>
                            <div className="update-btn">
                                <button disabled={loading} className="normal-btn" style={{ width: "200px" }} type="submit">
                                    {loading ? "Loading" : "Update"}
                                </button>

                                <Link to="/"><button className="normal-btn" style={{ width: "200px" }} >Home
                                </button>
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </div>


    )
}