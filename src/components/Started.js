import React, { useState } from "react";
import "./Started.css";
import { firestore } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa";
import Hamburger from "./Hamburger"
import { Link, useHistory } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"
import backone from "../assets/Images-20201231T125621Z-001/Images/family-travelling.png"
import { useData } from "../components/firebaseDisplayComponent/DataProvider";

function Started() {
    const history = useHistory();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [trip, setTrip] = useState();
    const [tripError, setTripError] = useState()
    const [cityError, setCityError] = useState()
    const { currentUser } = useAuth();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const fbdata = useData();
    const handleSelect = async (value) => {
        const res = await geocodeByAddress(value);
        console.log(res, "res")
        setCity(res[0].address_components[0].long_name)
        const val = res[0] && res[0].address_components.length
        const newval = res[0].address_components[val - 1].short_name
        const lat = res[0].geometry.location.lat()
        const lng = res[0].geometry.location.lng()
        setCountry(newval)
        setLat(lat)
        setLng(lng)
        // console.log(lng, "lat")
    }

    const handleList = async () => {
        const check = fbdata && fbdata.time.some((item) => item.dash.trip === trip);
        const checkagain = fbdata && fbdata.time.some((item) => item.dash.city === city);
        console.log(check, "bool")
        if (!city)
            setCityError("Select a city")
        if (check)
            setTripError("The trip name already exists")
        if (checkagain)
            setCityError(`The dashboard of ${city} already exists`)
        if (!trip)
            setTripError("Enter trip name")
        if (!city)
            setCityError("Select a city")
        if (!check & !checkagain)
            try {
                // console.log("fn ran2")
                await firestore
                    .collection(currentUser.uid)
                    .add({
                        city,
                        trip,
                        country,
                        lat,
                        lng
                    });
                history.push(`/select/${country}/${city}/${trip}/${lat}/${lng}`)


            } catch (e) {
                console.log("Failed to add " + e.message);
            }

    }
    const deletedash = async (id) => {

        try {

            await firestore.collection(currentUser.uid).doc(id).delete()
        } catch (e) {
            console.log("Failed to delete " + e.message);
        }


    }
    console.log(city, "city")

    return (
        <>
            <div className="desktop-started" style={{ display: "grid", gridTemplateColumns: "5vw auto" }}>
                <div style={{ backgroundColor: "#2d3446", height: "100vh" }}>
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
                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: "1fr 17fr 1fr",
                        height: "100vh",
                    }}
                >
                    <div
                        style={{ backgroundColor: "white", borderBottom: "1px solid grey" }}
                    ></div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                        <div style={{ padding: "50px" }}>
                            <h2 >Lets's get started</h2>
                            <div style={{ padding: "30px 0" }}>
                                <input placeholder="Trip name" value={trip} onChange={(e) => setTrip(e.target.value)} type="text" style={{ width: "90%", padding: "15px 30px", border: "2px solid lightgray", borderRadius: "10px", margin: "20px 0" }} /><br />
                                {tripError && <p>{tripError}</p>}
                                <PlacesAutocomplete
                                    value={city}
                                    onChange={setCity}
                                    onSelect={handleSelect}
                                >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            style={{ width: "90%", padding: "15px 30px", border: "2px solid lightgray", borderRadius: "10px", margin: "20px 0" }}
                                            {...getInputProps({
                                                placeholder: city ? city : 'Search City'
                                            })} />
                                        <div>
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#45baa3', color: "white", cursor: 'pointer', padding: "10px", transition: "0.3s ease-out" }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer', padding: "10px" };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}</PlacesAutocomplete>
                            </div>
                            {cityError && <p>{cityError}</p>}

                            <Link style={{
                                padding: "10px 25px",
                                color: "white",
                                backgroundColor: "#45baa3",
                                fontFamily: "sans-serif",
                                fontSize: "130%",
                                border: "none",
                                borderRadius: "5px",
                                margin: "10px 0"
                            }}
                                // to={`/select/${country}/${city}/${trip}/${lat}/${lng}`}
                                to=""
                            >
                                <button onClick={() => handleList()} ><FaPlaneDeparture /> READY FOR TAKE OFF</button>
                            </Link>
                        </div>

                        <div><img src={backone} alt="" style={{ width: "50vw" }} /></div>
                        {fbdata && fbdata.time.map((obj, i) => {
                            return <div key={i}>

                                <Link to={`mydashboard/${obj.dash.country}/${obj.dash.city}/${obj.dash.trip}/${obj.dash.lat}/${obj.dash.lng}`}>
                                    {obj.dash.city}
                                </Link>
                                <button onClick={() => deletedash(obj.id)}>
                                    del dashboard
                                </button>
                            </div>
                        })}
                    </div>
                    <div style={{ backgroundColor: "#f3f3f3", padding: "30px" }}>
                        <p>
                            <span role="img" aria-labelledby="copy">©️</span> </p>
                    </div>
                </div>
            </div>

            {/* mobile componenet */}
            <div className="mobile-started" style={{}}>

                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: "1fr 17fr 1fr",
                        height: "100vh",
                    }}
                >
                    <div
                        style={{ backgroundColor: "white", borderBottom: "1px solid grey" }}
                    ><Hamburger /></div>
                    <div style={{ display: "grid", gridTemplateColumns: "auto" }}>
                        <div style={{ padding: "50px" }}>
                            <h2 >Lets's get started</h2>
                            <div style={{ padding: "30px 0" }}>
                                <input placeholder="Trip name" value={trip} onChange={(e) => setTrip(e.target.value)} type="text" style={{ width: "90%", padding: "15px 30px", border: "2px solid lightgray", borderRadius: "10px", margin: "20px 0" }} /><br />
                                {tripError && <p>{tripError}</p>}
                                <PlacesAutocomplete
                                    value={city}
                                    onChange={setCity}
                                    onSelect={handleSelect}
                                >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            style={{ width: "90%", padding: "15px 30px", border: "2px solid lightgray", borderRadius: "10px", margin: "20px 0" }}
                                            {...getInputProps({
                                                placeholder: city ? city : 'Search City'
                                            })} />
                                        <div>
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#45baa3', color: "white", cursor: 'pointer', padding: "10px", transition: "0.3s ease-out" }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer', padding: "10px" };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}</PlacesAutocomplete>
                            </div>
                            {cityError && <p>{cityError}</p>}

                            <Link style={{
                                padding: "10px 25px",
                                color: "white",
                                backgroundColor: "#45baa3",
                                fontFamily: "sans-serif",
                                fontSize: "130%",
                                border: "none",
                                borderRadius: "5px",
                                margin: "10px 0"
                            }}
                                // to={`/select/${country}/${city}/${trip}/${lat}/${lng}`}
                                to=""
                            >
                                <button onClick={() => handleList()} ><FaPlaneDeparture /> READY FOR TAKE OFF</button>


                            </Link>
                        </div>
                        <div></div>
                        {fbdata && fbdata.time.map((obj, i) => {
                            return <div key={i}>
                                <button onClick={() => deletedash(obj.id)}>
                                    del dashboard
                                </button>
                                <Link to={`mydashboard/${obj.dash.country}/${obj.dash.city}/${obj.dash.trip}/${obj.dash.lat}/${obj.dash.lng}`}>
                                    {obj.dash.city}
                                </Link>
                            </div>
                        })}
                    </div>
                    <div style={{ backgroundColor: "#f3f3f3", padding: "30px" }}>
                        <p>
                            <span role="img" aria-labelledby="copy"> ©️</span> NomTrips</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Started;
