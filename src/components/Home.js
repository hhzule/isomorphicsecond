import React, { useState, useEffect } from "react";
import "./Home.css";
import Hamburger from "./Hamburger";
import { useParams } from "react-router-dom";
import Weather from "./Weather";
import News from "./News";
import Enum from "./Enum";

import DataDisplay from "./firebaseDisplayComponent/DataDisplay";
import logo from "../assets/logo.png";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import "./hamburger.css"
import Fullcalendar from "../Calendar/Fullcalendar"
import PlaceDataDisplay from "./firebaseDisplayComponent/PlaceDataDisplay";
import { AiOutlinePlus } from "react-icons/ai"


export const Home = () => {
  const [listnameerror, setListnameerror] = useState();
  const { country, trip, city, lat, lng } = useParams();
  const { currentUser } = useAuth();
  const [list, setList] = useState();
  const [nav, setNav] = useState(false);
  const [listname, setListname] = useState();
  const handletoggle = () => {
    // console.log(nav);
    setNav(!nav);
  };

  const renderFixed = () => {
    let classe = "none";
    if (nav) {
      classe = " block";
    }
    return classe;
  };


  useEffect(() => {

    const fetchdash = async () => {

      await firestore.collection(currentUser.uid + `/${city}/list`).onSnapshot((snap) => {

        const newdata = snap.docs.map((doc) => (
          {
            id: doc.id,
            dash: doc.data()
          }
        )
        )

        setList(newdata)
        // setLoading(false)
      })
    }


    fetchdash();
  }, [])

  const handleListCreate = async () => {
    if (listname) {
      try {
        await firestore
          .collection(currentUser.uid + `/${city}/list`)
          .add({ mylist: listname });
        handletoggle()
      } catch (e) {
        console.log("Failed to add " + e.message);
      }
    } else {
      setListnameerror("Enter list name")
    }
  }
  const handleCreate = () => {
    // modal toggle

    handletoggle()
  }
  // console.log(list, "list")

  return (
    <>
      <div className={renderFixed()}>
        <div style={{ width: "500px", height: "300px", backgroundColor: "teal" }} >
          <div>
            <h2 style={{ fontSize: "180%", textAlign: "center", color: "white", margin: "30px" }}>Enter List Name</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input value={listname} onChange={(e) => setListname(e.target.value)} type="text" style={{ border: "1px solid #f4f4f4", padding: "5px 10px", borderRadius: "5px" }} />
              {listnameerror && <p>{listnameerror}</p>}
            </div>
            <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
              <button style={{ border: "none", padding: "10px 20px", backgroundColor: "white", color: "black", margin: "5px" }} onClick={handletoggle} >Cancel</button>
              <button style={{ border: "none", padding: "10px 20px", backgroundColor: "white", color: "black", margin: "5px" }} onClick={handleListCreate}  >Create</button>
            </div>

          </div>

        </div>
      </div>
      <div className="home-dash-new">
        <div style={{ backgroundColor: "#2d3446", height: "100vh", position: "fixed", width: "5vw" }}>
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
        <div></div>
        <div style={{
          backgroundColor: "#f4f4f4"
        }}>
          <div
            className="header-main-extra"
            style={{ display: "flex", justifyContent: "space-between", }}>



          </div>
          <div className="home-dash-main">

            <div className="dahs-api-mobile"><Weather city={city} /></div>
            <div className="dahs-api-mobile"><h2 style={{ textAlign: "center" }}>News In {city} </h2>
              <News country={country} /></div>
            <div className="dahs-api-mobile">             <h1 style={{ fontSize: "130%", marginBottom: "30px" }}>Emergency Contacts In {city}</h1>
              <Enum country={country} /></div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", padding: "40px", width: "80vw" }} >
            <div style={{ width: "70vw" }}>

              <Fullcalendar style={{ height: "300px" }} />
            </div>

          </div>
          <div style={{ display: "flex", padding: "30px" }}>
            <h3 style={{ fontSize: "30px" }}>Your Lists</h3>
            <button style={{ backgroundColor: "#4abaa3", color: "white", padding: "10px", borderRadius: "5px", border: "none", margin: "0 30px" }} onClick={() => handleCreate()}><AiOutlinePlus /> ADD NEW LIST</button>

          </div>
          <div style={{ display: "flex", justifyContent: "left", padding: "30px" }}>

            <PlaceDataDisplay city={city} trip={trip} lat={lat} lng={lng} />


            <br />
            {list && list.map((obj, i) => {
              return <div key={i}><DataDisplay name={obj.dash.mylist} city={city} listid={obj.id} /><br /></div>
            })}
          </div>
        </div>

      </div >



      <div className="home-dash-new mobile">
        <Hamburger />
        <div className="home-dash-main">
          <div className="dash-api-div-mobile">

            <div className="dahs-api-mobile" style={{ width: "45vw" }}>
              <Weather city={city} />
            </div>
            <div className="dahs-api-mobile" style={{ width: "45vw" }}>
              <Enum country={country} />
            </div>
          </div>

          <div className="dahs-api-mobile">
            <News country={country} />
          </div>
          <div style={{ textAlign: "left", display: "flex", justifyContent: "left", padding: "40px" }} >
            <div>
              {/* <Calendar style={{ width: "10vw" }} /> */}
              <Fullcalendar />
            </div>
          </div>
          <button onClick={() => handleCreate()}>create list</button>
          <div style={{ display: "flex", justifyContent: "left", padding: "30px" }}>

            <PlaceDataDisplay city={city} trip={trip} lat={lat} lng={lng} />


            <br />
            {list && list.map((obj, i) => {
              return <div key={i}><DataDisplay name={obj.dash.mylist} city={city} listid={obj.id} /><br /></div>
            })}
          </div>
        </div>
      </div>
    </>
  );
};
