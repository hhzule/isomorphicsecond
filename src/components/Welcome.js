import React from "react";
import "./Welcome.css";
import logo from "../assets/company-logo.png";
import { Link } from "react-router-dom";
import backone from "../assets/Images-20201231T125621Z-001/Images/Homepage-intro.png"
import backtwo from "../assets/Images-20201231T125621Z-001/Images/single-traveller.png"
import backthree from "../assets/Images-20201231T125621Z-001/Images/family-travelling.png"
import backfour from "../assets/Images-20201231T125621Z-001/Images/Homepage-intro.png"


function Welcome() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "40px",
          height: "10vh",
        }}
      >
        <img style={{ width: "275px", height: "46.875px" }} src={logo} alt="" />
        <div>
          <Link to="#howitworks" className="welcome-link">
            How it works
          </Link>
          <Link className="welcome-link">About us</Link>
          <Link className="welcome-link">Contact us</Link>
          <Link to="/login">
            <button className="welcome-btn">Login</button>
          </Link>
        </div>
      </div>
      <div style={{ height: "90vh", width: "100%", backgroundColor: "white", display: "flex" }}>
        <div>
          <h1
            style={{
              alignSelf: "center",
              margin: " 0 5vw",
              marginTop: "15vh",
              fontSize: "530%",
            }}
          >
            We make it <span style={{ color: "#f3aa0d" }}>easy</span>
            <br /> to plan your trips
        </h1>
          <h2
            style={{
              margin: "03vh 5vw",
            }}
          >
            Create Your Lists and Agenda <br /> in one Dashboard
        </h2>
          <br />
          <Link to="/signup">
            <button
              style={{
                padding: "15px 45px",
                color: "white",
                backgroundColor: "#45baa3",
                fontFamily: "sans-serif",
                fontSize: "130%",
                border: "none",
                borderRadius: "5px",
                margin: "0 5vw",
              }}
            >
              Ready for Take off
        </button></Link>
        </div>

        <div style={{ width: "50vw", height: "90vh" }}>
          <img src={backone} alt="" style={{ width: "60vw" }} />

        </div>
      </div>
      <div
        style={{ height: "70vh", backgroundColor: "#184450", textAlign: "center" }}
        id="howitworks"
      >
        <h1 style={{ textAlign: "center", fontFamily: "sans-serif", padding: "50px 0", fontSize: "400%", color: "white", fontWeight: "500" }}>
          Create An All-In-One Dashboard
        </h1>
        <div style={{ color: "white", display: "flex", justifyContent: "space-around" }}>
          <h3 style={{ color: "white", }}>Name your trip</h3>
          <h3 style={{ color: "white", }}>Create A Master List Of Restaurants, And <br />Activities</h3>
          <h3 style={{ color: "white", }}>Build Your Daily Agenda By Adding <br />Restaurants and Activities</h3>
        </div>
      </div>


      <div style={{ display: "grid", gridTemplateColumns: "8fr 10fr", height: "50vh" }}>
        <div> </div>
        <div style={{ padding: "30vh 90px", }}>       <h1>All-In-One travel Dashboard</h1>
          <h5>Keep all your lists on one place. Plan at home, take it to <br /> go. No more Multiple platforms to create, plan, and <br />download lists. it's all here. We add in useful information <br /> like weather, emergency contacts and more. </h5>
          <button
            style={{
              padding: "15px 45px",
              color: "white",
              backgroundColor: "#45baa3",
              fontFamily: "sans-serif",
              fontSize: "130%",
              border: "none",
              borderRadius: "5px",
              margin: "10px 0"
            }}

          >TRY IT FREE</button>
        </div>


      </div>        <div style={{ width: "100vw", display: "grid", gridTemplateColumns: "2fr 1fr" }}>
        <div>

        </div>
        <div>
          <img src={backtwo} alt="" style={{ width: "20vw" }} />

        </div>

      </div><div style={{ display: "grid", gridTemplateColumns: "8fr 10fr", height: "50vh" }}>

        <div style={{ padding: "30vh 90px", }}>        <h1>Focused search to find what you need</h1>
          <h5>Focus search allows you to find restaurants, and activities <br /> efficiently. We bring together the best data so you can focus <br /> on eating and doing.</h5>
          <button
            style={{
              padding: "15px 45px",
              color: "white",
              backgroundColor: "#45baa3",
              fontFamily: "sans-serif",
              fontSize: "130%",
              border: "none",
              borderRadius: "5px",
              margin: "10px 0"
            }}

          >TRY IT FREE</button>
        </div>
        <div></div>
      </div>
      <div style={{ width: "100vw", display: "grid", gridTemplateColumns: "2fr 1fr", marginBottom: "10vh" }}>
        <div>
          <img src={backthree} alt="" style={{ width: "40vw", marginLeft: "30px" }} />

        </div> <div>

        </div>


      </div>
      <div style={{ display: "grid", gridTemplateColumns: "8fr 2fr", height: "30vh", backgroundColor: "#184450" }}>
        <div style={{ padding: "5vh 50px" }}>
          <h5 style={{ color: "white" }}>Your First travel Dashboard is free. Take advantage of all the great features and experienze travel planning in a whole <br /> new way. Start planning today!</h5>
          <button
            style={{
              padding: "15px 45px",
              color: "white",
              backgroundColor: "#45baa3",
              fontFamily: "sans-serif",
              fontSize: "130%",
              border: "none",
              borderRadius: "5px",
              margin: "10px 0"
            }}

          >TRY IT FREE</button>
        </div>
        <div></div>

      </div>
    </div>
  );
}

export default Welcome;
