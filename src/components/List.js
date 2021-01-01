import React from "react";
// import { Link } from "react-router-dom";
import logos from "../assets/company-logo.png";
import DataDisplay from "./firebaseDisplayComponent/DataDisplay";
// import markerpng from "../assets/maps-marker.png";
import "./List.css";

function List() {
    return (
        <>
            <div className="details list-info-item">
                <div className="food-info">
                    <div className="navbar" style={{ margin: "0 auto" }}>
                        {" "}
                        <img src={logos} alt="" />
                    </div>
                    <div style={{ margin: "0 20%" }}>
                        <DataDisplay />

                    </div>
                </div>
            </div>
        </>
    );
}

export default List;
