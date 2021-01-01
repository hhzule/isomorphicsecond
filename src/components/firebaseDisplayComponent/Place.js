import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import logo from "../../assets/maps-marker.png";
import "./Place.css";
import { FaInfo } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { MdRateReview } from "react-icons/md";
// import logos from "../../assets/company-logo.png";
import "react-slideshow-image/dist/styles.css";
import Slideshow from "../Slider";
// import markerpng from "../../assets/maps-marker.png";
// import DataDisplay from "../firebaseDisplayComponent/DataDisplay";
import { firestore } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../components/firebaseDisplayComponent/DataProvider";
import Hamburger from "../Hamburger";
import { Divider } from "antd";
import logoer from "../../assets/logo.png";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa";

const AnyReactComponent = ({ text }) => (
    <div>
        <img
            style={{
                width: "50px",
                position: "absolute",
                transform: "translate(-50%, -50%)",
            }}
            src={logo}
            alt="marker"
        />
        {text}
    </div>
);

const Place = () => {
    const { currentUser } = useAuth();
    const { id, lat, lng, address } = useParams();
    const [type, setType] = useState(true);
    const [detail, setDetail] = useState({});
    const fbdata = useData();
    const [error, setError] = useState("");

    const handleAddToList = async (address, name, rating, place_id) => {
        const check = fbdata && fbdata.some((item) => item.id === place_id);
        let newrating = rating ? rating : "n/a";
        console.log(rating);
        console.log(newrating);
        const data = {
            name,
            address,
            newrating,
            place_id,
        };
        console.log(data, "data");

        if (!check) {
            try {
                await firestore.collection(currentUser.uid).doc(place_id).set(data);
            } catch (e) {
                console.log("Failed to add " + e.message);
            }
        } else {
            setError("Place alreary in the list");
        }
    };
    console.log(address, "address");
    const center = {
        address: address,
        lat: Number(lat),
        lng: Number(lng),
    };
    let places = {};
    // let inlatlng = {};
    const handleApiLoaded = (map, maps) => {
        // let inlatlng = new maps.LatLng(lat, lng),
        places = new maps.places.PlacesService(map);
        var request = {
            placeId: id,
            fields: [
                "name",
                "rating",
                "formatted_phone_number",
                "website",
                "review",
                "photo",
            ],
        };
        places.getDetails(request, callback);
        function callback(place, status) {
            if (status === "OK") {
                setDetail(place);
            }
        }
    };

    console.log(detail.website, "webpage");

    return (
        <>
            <div className="details" style={{ display: "flex", width: "100vw" }}>
                <div style={{ backgroundColor: "#2d3446", height: "", width: "5vw" }}>
                    <div style={{ padding: "30px 0", textAlign: "center" }}>
                        <img src={logoer} alt="logo" style={{ width: "3vw" }} />
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
                <div
                    className=""
                    style={{ display: "flex", flexWrap: "wrap", width: "95vw" }}
                >
                    <div
                        className="detail-info"
                        style={{ width: "45vw", textAlign: "start" }}
                    >
                        {" "}
                        {error}
                        {detail && detail.photos && (
                            <div
                                style={{
                                    width: "40vw",
                                    margin: "0 auto",
                                }}
                            >
                                <Slideshow slideImages={detail.photos} className="" />
                            </div>
                        )}
                        <h2 style={{ fontSize: "190%", margin: "30px 10px" }}>{detail && detail.name && detail.name}</h2>{" "}
                        <div className="" style={{ color: "white" }}>
                            <button
                                onClick={() =>
                                    handleAddToList(address, detail.name, detail.rating, id)
                                }
                                style={{
                                    borderRadius: "10px",
                                    border: "none",
                                    padding: "7px 15px",
                                    margin: "30px 10px"
                                }}
                            >
                                Add To List
              </button>
                            <a href={detail.website ? detail.website : ""}>
                                <button
                                    disabled={detail.website === undefined ? true : false}
                                    style={{
                                        backgroundColor: "#0093e6",
                                        borderRadius: "10px",
                                        color: "white",
                                        border: "none",
                                        padding: "7px 15px",
                                        margin: "30px 10px"
                                    }}
                                >
                                    {detail.website === undefined
                                        ? "Website N/A"
                                        : " Visit Website"}
                                </button>
                            </a>
                        </div>
                        <h4 style={{ margin: "30px 10px" }}>
                            <p>{address}</p>
                        </h4>
                        <h4 style={{ margin: "30px 10px" }}>
                            {detail &&
                                detail.formatted_phone_number &&
                                detail.formatted_phone_number}
                        </h4>
                        <br />
                        <br />
                        <div className="reviews">
                            <h5>Reviews</h5>
                            <br />{" "}
                            {detail &&
                                detail.reviews?.map((r, k) => {
                                    return (
                                        <div key={k}>
                                            <p>
                                                <BiUserCircle className="review-icon user-icon" />
                                                {r.author_name}
                                                <span />
                                                <br />
                                                {r.relative_time_description}
                                                <br />
                                                <MdRateReview className="review-icon" />
                                                {r.text}
                                            </p>
                                            <p>Rating:{r.rating}</p> <Divider />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="" style={{ width: "50vw" }}>
                        <div
                            style={{ height: "100vh", textAlign: "center", width: "100%" }}
                        >
                            {
                                <GoogleMapReact
                                    bootstrapURLKeys={{
                                        key: "AIzaSyCLIQ_mX7arUJFeItzaQJxc-b0NgmVkAo8",
                                        libraries: ["places", "geometry"],
                                    }}
                                    options={(map) => ({
                                        mapTypeId: type
                                            ? map.MapTypeId.SATELLITE
                                            : map.MapTypeId.ROADMAP,
                                    })}
                                    defaultCenter={center}
                                    defaultZoom={18}
                                    layerTypes={[
                                        "TrafficLayer",
                                        "TransitLayer",
                                        "BicyclingLayer",
                                    ]}
                                    yesIWantToUseGoogleMapApiInternals
                                    onGoogleApiLoaded={({ map, maps }) =>
                                        handleApiLoaded(map, maps)
                                    }
                                >
                                    <AnyReactComponent
                                        style={{ backgroundColor: "red", width: "10px" }}
                                        lat={center.lat}
                                        lng={center.lng}
                                        text={detail.name}
                                    />
                                </GoogleMapReact>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="details-mobile"
                style={{ display: "flex", width: "100vw" }}
            >
                <div className="" style={{ width: "95vw" }}>
                    {" "}
                    <Hamburger />
                    <br />
                    <div className="detail-info">
                        <h4>
                            <FaInfo className="icon" />
                            {detail && detail.name && detail.name}
                        </h4>
                        <h4>
                            <FaMapMarkedAlt className="icon" />
                            <p>{address}</p>
                        </h4>
                        <h4>
                            <FaPhoneAlt className="icon" />
                            {detail &&
                                detail.formatted_phone_number &&
                                detail.formatted_phone_number}
                        </h4>
                        <div className="magical-div-of-btns">
                            <button
                                onClick={() =>
                                    handleAddToList(address, detail.name, detail.rating, id)
                                }
                            >
                                Add To List
              </button>
                            <a href={detail.website ? detail.website : ""}>
                                <button disabled={detail.website === undefined ? true : false}>
                                    {detail.website === undefined
                                        ? "Website N/A"
                                        : " Visit Website"}
                                </button>
                            </a>
                        </div>
                        {error}
                        {detail && detail.photos && (
                            <div
                                style={{
                                    width: "400px",
                                    height: "200px",
                                    margin: "0 auto",
                                }}
                            >
                                <Slideshow slideImages={detail.photos} className="slider" />
                            </div>
                        )}
                        <br />
                        <br />
                        <div className="reviews">
                            <h5>Reviews</h5>
                            <br />{" "}
                            {detail &&
                                detail.reviews?.map((r, k) => {
                                    return (
                                        <div key={k}>
                                            <p>
                                                <BiUserCircle className="review-icon user-icon" />
                                                {r.author_name}
                                                <span />
                                                <br />
                                                {r.relative_time_description}
                                                <br />
                                                <MdRateReview className="review-icon" />
                                                {r.text}
                                            </p>
                                            <p>Rating:{r.rating}</p>
                                            <Divider />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="" style={{ width: "50%" }}>
                        <div style={{ height: "85vh", textAlign: "center", width: "100%" }}>
                            <button
                                style={{
                                    alignSelf: "center",
                                    border: "none",
                                    backgroundColor: "#47baa2",
                                    padding: "5px 10px",
                                    color: "white",
                                }}
                                onClick={() => setType(!type)}
                            >
                                {type ? "Satellite" : "Roadmap"}
                            </button>

                            {
                                <GoogleMapReact
                                    bootstrapURLKeys={{
                                        key: "AIzaSyCLIQ_mX7arUJFeItzaQJxc-b0NgmVkAo8",
                                        libraries: ["places", "geometry"],
                                    }}
                                    options={(map) => ({
                                        mapTypeId: type
                                            ? map.MapTypeId.SATELLITE
                                            : map.MapTypeId.ROADMAP,
                                    })}
                                    defaultCenter={center}
                                    defaultZoom={18}
                                    layerTypes={[
                                        "TrafficLayer",
                                        "TransitLayer",
                                        "BicyclingLayer",
                                    ]}
                                    yesIWantToUseGoogleMapApiInternals
                                    onGoogleApiLoaded={({ map, maps }) =>
                                        handleApiLoaded(map, maps)
                                    }
                                >
                                    <AnyReactComponent
                                        style={{ backgroundColor: "red", width: "10px" }}
                                        lat={center.lat}
                                        lng={center.lng}
                                        text={detail.name}
                                    />
                                </GoogleMapReact>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Place;
// <button onClick={navigator && navigator.clipboard.writeText(detail && detail.website && detail.website)}>Call</button>
