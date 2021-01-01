import React, { useState } from "react";
import "./hamburger.css";
import logo from "../assets/company-logo.png";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
const Hamburger = () => {
    const [nav, setNav] = useState(false);
    const { logout } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();
    const handletoggle = () => {
        // console.log(nav);
        setNav(!nav);
        // console.log(nav);
    };
    // console.log(nav);
    const renderClass = () => {
        let classes = "navlinks";
        if (nav) {
            classes += " active";
        }
        return classes;
    };
    const renderFixed = () => {
        let classe = "nav-mobile";
        if (nav) {
            classe += " fixed";
        }
        return classe;
    };
    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
            console.log(error, "error");
        }
    }

    return (
        <div>
            <div className={renderFixed()}>
                <div className="toggle-menu" onClick={handletoggle}>
                    <i className="fas fa-bars fa-lg"></i>
                </div>

                <div>
                    <img src={logo} alt="" />
                </div>
            </div>

            <div className={renderClass()}>
                <Link to="" onClick={handletoggle} className="special-link">
                    <p>Close</p></Link>
                <Link to="/" onClick={handletoggle}>
                    <p>Home</p>
                </Link>

                <Link to="/profile">
                    <p>
                        Update
                        Profile
          </p>
                </Link>                <Link to="/list">
                    <p>
                        List
          </p>
                </Link>
                <Link to="" onClick={handleLogout}>
                    <p>
                        <i className="fas fa-sign-out-alt"></i>Log Out
          </p>
                </Link>
            </div>
        </div>
    );
};

export default Hamburger;
