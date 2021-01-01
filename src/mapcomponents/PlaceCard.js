import React, { useState } from "react";
import { Rate } from "antd";
import dummy from '../assets/dummy.jpg';
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { firestore } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../components/firebaseDisplayComponent/DataProvider";

const PlaceCard = ({ info, city, trip }) => {
  const { name, rating, address, photoUrl, place_id, lat, lng } = info;
  const { currentUser } = useAuth();
  // const [loading, setLoading] = useState(true)
  const fbdata = useData();
  const [error, setError] = useState("");
  const [text, setText] = useState(false)
  const handleAddToList = async (address, name, rating, place_id) => {
    const check = fbdata
    console.log(fbdata, "akif")
    // && fbdata.some((item) => item.id === place_id);
    let newrating = rating ? rating : "n/a";
    // console.log(newrating)
    // console.log(rating)
    const data = {
      name,
      address,
      newrating,
      place_id,
    };

    if (check) {
      try {
        await firestore
          .collection(currentUser.uid + `/${city}/${trip}`)
          // .doc(city)
          .add(data);
        setText(true)
      } catch (e) {
        console.log("Failed to add " + e.message);
      }
    } else {
      setError("Place alreary in the list");
      setTimeout(() => setError(""), 2000)
    }
  };
  const latstate = lat;
  const lngstate = lng;

  return (
    <div key={place_id} className="plce-car">
      <div className="card" >

        <div>
          <img src={photoUrl ? photoUrl : dummy} className="card-img" alt="nomtrips" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div className="card-body">
            <h5 style={{ fontSize: "20px" }} className="card-title">{name}</h5>
            {rating} <Rate value={rating} />

            <span className="d-block mb-1">{address}</span>
          </div>

          <p className="list-group-item">
            <div className="div-btn-list-add">
              <button
                style={{ backgroundColor: "", margin: "5px", borderRadius: "5px" }}
                onClick={() => handleAddToList(address, name, rating, place_id)}
              >
                {" "}
                {text ? "Added" : "Add to List"}
              </button>
              <button
                style={{ backgroundColor: "#4494e6", margin: "5px", borderRadius: "5px" }}
              >
                {" "}
                <Link
                  to={`/place/${place_id}/${latstate}/${lngstate}/${address}`}
                >
                  More Info
              </Link>
              </button>
            </div>
          </p>

        </div>

        {error && (
          <p className="error-that" style={{ textAlign: "center" }}>
            <span role="img" aria-label="alert">
              🔴
            </span>{" "}
            {error}
          </p>
        )}
      </div>
    </div>

  );
};

export default PlaceCard;
