import React, { useState } from "react"
// import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import UpdateProfile from './UpdateProfile';
import MapContainer from '../containers/MapContainer';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css';
import DataDisplay from './firebaseDisplayComponent/DataDisplay';
import profile from "../assets/Untitled-1.png.png";
import logo from '../assets/logo.png';

export default function Dashboard() {
  const [error, setError] = useState("")
  // const { currentUser, logout, url } = useAuth()
  const history = useHistory()
  const { logout } = useAuth()

  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
      console.log(error, "error")
    }
  }

  return (
    <div className="mainer">
      <div className="main-dash">
        <div className="side-main">
          <div className="top">
            <div style={{ borderRadius: "50%", backgroundColor: "white", height: "100px" }}>
              <img src={logo} style={{ width: "100px", height: "90px", padding: "10px" }} alt="clogo" />

            </div>
            <br />
            <Link to="" className="link ">
              <p className="active">
                <i className="fas fa-home"></i>Home
              </p>
            </Link><br />


          </div>

          <div className="bottom">
            <Link to="" className="link" onClick={handleLogout}>
              <p>
                <i className="fas fa-sign-out-alt"></i>Log Out
              </p>
            </Link>
          </div>
        </div>
        <div className="primary-main-second">
          <div>

          </div>
          <div className="map__container">
            <MapContainer />
          </div>

          <div className="profile-updater-mian-secondary-primary">

            <Link to="" className="link">

              <div className="dropdown">
                <img src={profile} alt="" style={{ maxHeight: "70px" }} />
                <div className="dropdown-content">
                  <h3 style={{ color: 'black' }}>Profile</h3>
                  <form>
                    {/* <UpdateProfile /> */}

                  </form>
                </div>
              </div>
            </Link>
            <div className="data-list">
              <DataDisplay />

            </div>
          </div>
        </div>
        <div>

        </div>

      </div>

    </div>
  )
}
