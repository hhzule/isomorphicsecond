import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import NewContainer from "../containers/NewContainer";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import profile from "../assets/Untitled-1.png.png";
import "./New.css";
import { useParams } from "react-router-dom";
// import markerpng from "../assets/maps-marker.png";
// import UpdateProfile from "../components/UpdateProfile"
import UpdateMobile from "./UpdateMobile";
import Hamburger from "./Hamburger";
import "./Home.css";
import { useData } from './firebaseDisplayComponent/DataProvider'
import logo from "../assets/logo.png";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa";

export default function Dashboard() {
    // const [error, setError] = useState("");
    const { url } = useAuth();
    const { trip, city, lat, lng } = useParams();
    const { data, time } = useData()
    console.log(time, "time");
    console.log(data, "data")
    // const history = useHistory();

    // async function handleLogout() {
    //     setError("");
    //     try {
    //         await logout();
    //         history.push("/login");
    //     } catch {
    //         setError("Failed to log out");
    //         console.log(error, "error");
    //     }
    // }

    return (
        <>
            <div style={{ display: "grid", gridTemplateColumns: "5vw auto" }}>
                <div style={{ backgroundColor: "#2d3446", height: "" }}>
                    <div style={{ padding: "30px 0", textAlign: "center" }}>
                        <img src={logo} alt="logo" style={{ width: "3vw" }} />
                    </div>
                    <div
                        style={{
                            color: "white",
                            fontSize: "250%",
                            textAlign: "center",
                            padding: "30px 0",
                        }}
                    >
                        <Link style={{ color: "white" }} to="get-started">
                            <AiFillHome />
                        </Link>
                    </div>{" "}
                    <div
                        style={{
                            color: "white",
                            fontSize: "250%",
                            textAlign: "center",
                            padding: "30px 0",
                        }}
                    >
                        <Link style={{ color: "white" }} to="get-started">
                            <FaPlaneDeparture />
                        </Link>
                    </div>
                    <div
                        style={{
                            color: "white",
                            fontSize: "250%",
                            textAlign: "center",
                            padding: "30px 0",
                            marginTop: "50vh",
                        }}
                    >
                        <Link style={{ color: "white" }} to="get-started">
                            <FiLogOut />
                        </Link>
                    </div>
                </div>
                <div className="dash">
                    <div className="primary">
                        <div className="map__container">
                            <div
                                style={{
                                    width: "93vw",
                                    backgroundColor: "#f3f3f3",
                                    padding: "-20px",
                                    display: "flex",
                                    textAlign: "right",
                                }}
                            >
                                <div
                                    className="dropdown"
                                    style={{ marginLeft: "80vw", height: "60px" }}
                                >
                                    <img src={url ? url : profile} alt="" />

                                    <div className="dropdown-content">
                                        <h3 style={{ textAlign: "center" }}>Profile</h3>
                                        <form>
                                            <UpdateMobile />
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <NewContainer city={city} trip={trip} lat={lat} lng={lng} />
                        </div>
                    </div>
                </div>
            </div>


            <div className="mobile-view">
                <Hamburger />

                <div className="primary">
                    <div className="map__container">
                        <NewContainer city={city} trip={trip} lat={lat} lng={lng} />
                    </div>
                </div>
            </div>

        </>
    );
}
