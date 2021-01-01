import React from 'react'
import logo from "../assets/maps-marker.png";

const Marker = ({ text }) => (
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


export default Marker
