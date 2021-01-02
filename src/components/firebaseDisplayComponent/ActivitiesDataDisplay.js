import React, { useState, useEffect } from 'react'
import { firestore } from '../../firebase';
import { Rate } from "antd";
import img from '../../assets/list.jpg';
import { Divider } from 'antd';
import { useData } from './DataProvider'
import { useAuth } from "../../contexts/AuthContext"
import { FaTrash, FaRegCalendar } from "react-icons/fa"
import { RiDeleteBack2Fill } from "react-icons/ri"
import { AiOutlinePlus } from "react-icons/ai"

import "./DataDisplay.css"

import { AiOutlineDelete } from "react-icons/ai"
import { saveAs } from 'file-saver';
import { Link } from "react-router-dom";
const ActivitiesDataDisplay = ({ city, listid }) => {

    const { currentUser } = useAuth();
    const [data, setData] = useState();
    const [listvalue, setListvalue] = useState();
    const [listTitle, setListTitle] = useState();
    const [error, setError] = useState();
    const [nav, setNav] = useState(false);
    const handletoggle = () => {
        // console.log(nav);
        setNav(!nav);
        // console.log(nav);
    };
    // console.log(nav);

    const renderFixed = () => {
        let classe = "modal-none";
        if (nav) {
            classe += "modal-toggled";
        }
        return classe;
    };
    useEffect(() => {

        const fetchdash = async () => {

            await firestore.collection(currentUser.uid + `/${city}/activity`).onSnapshot((snap) => {

                const newdata = snap.docs.map((doc) => (
                    {
                        id: doc.id,
                        dash: doc.data()
                    }
                )
                )

                setData(newdata)
                // setLoading(false)
            })
        }


        fetchdash();
    }, [])
    const abled = listvalue && listvalue.length === 0 ? true : false

    const handleadd = async () => {
        if (!listTitle)
            setError("Enter Title")
        if (listvalue) {

            try {
                await firestore
                    .collection(currentUser.uid + `/${city}/activity`)
                    .add({
                        value: listvalue,
                        title: listTitle
                    });
                setListvalue("")

            } catch (e) {
                console.log("Failed to add " + e.message);
            }
        } else {
            setError("Enter an item to list")
        }
        handletoggle()
    }
    const handleDelete = async (id) => {
        try {
            await firestore.collection(currentUser.uid + `/${city}/activity`).doc(id).delete()
        } catch (e) {
            console.log("Failed to add " + e.message);
        }
    }

    return (
        <>
            <div style={{ padding: "10vw", textAlign: "center" }} className={renderFixed()}>
                <div >
                    <h2>Title</h2>
                    <input style={{ margin: "0 10px", padding: "5px", border: "2px solid lightgray", borderRadius: "5px" }} value={listTitle} onChange={(e) => setListTitle(e.target.value)}></input><br />

                </div>
                <div >
                    <h2>Value:</h2>
                    <input style={{ margin: "0 10px", padding: "5px", border: "2px solid lightgray", borderRadius: "5px" }} value={listvalue} onChange={(e) => setListvalue(e.target.value)}></input>

                </div>
                <button style={{ border: "1px solid grey", backgroundColor: "teal", color: "white", paddig: "5px", borderRadius: "3px" }} onClick={() => handleadd()}>add to list</button>


            </div>
            <div className="">

                <div className="" style={{ width: "450px", height: "600px", border: "1px solid grey", backgroundColor: "white", borderRadius: "10px" }}>
                    <div style={{ width: "100%", padding: "30px", paddingBottom: "0px", display: "flex", justifyContent: "space-between" }} >

                        <h3 style={{ fontSize: "25px" }}>Activities list</h3>
                        <button style={{ backgroundColor: "#4abaa3", width: "40px", height: "40px", border: "none", color: "white", borderRadius: "100px" }} onClick={() => handletoggle()}><AiOutlinePlus /></button>

                        {/* <button style={{ backgroundColor: "#4abaa3", width: "40px", height: "40px", border: "none", color: "white", borderRadius: "100px" }} onClick={() => deletelist()}><RiDeleteBack2Fill /></button> */}
                        {/* <Link to={`/dashboard/${city}/${trip}/${lat}/${lng}`}> <button style={{ backgroundColor: "#4abaa3", width: "40px", height: "40px", border: "none", color: "white", borderRadius: "100px" }}><AiOutlinePlus /></button></Link> */}

                    </div>

                    <Divider />


                    {error && <p style={{ textAlign: "center" }}>{error}</p>}
                    <div style={{ display: "flex", justifyContent: "center" }}>

                    </div>
                    <br />
                    <div style={{ width: "100%", overflowY: "scroll", height: "400px" }}>
                        {data && data.map((obj, i) => {
                            return <div key={i} style={{ padding: "10px", borderBottom: "2px dashed lightgray" }} >
                                <div style={{ display: "flex", margin: "0px auto", justifyContent: "space-between", width: "100%" }}>
                                    <div style={{ textAlign: "left" }}>
                                        <h3 style={{ fontSize: "17px" }}>{obj.dash.title}</h3><br /> <p style={{ fontSize: "13px", color: "grey" }}>{obj.dash.value}</p>
                                    </div>

                                    <div style={{ display: "flex" }}>
                                        <button style={{ fontSize: "15px", borderRadius: "5px", backgroundColor: "lightgray", color: "white", border: "none", margin: "0 10px", width: "40px", height: "40px" }} onClick={() => handleDelete(obj.id)}><FaTrash /> </button>
                                        <button style={{ fontSize: "15px", borderRadius: "5px", backgroundColor: "#4494e6", color: "white", border: "none", margin: "0 10px", width: "40px", height: "40px" }} ><FaRegCalendar /> </button>

                                    </div>

                                </div>


                            </div>
                        })}
                    </div>

                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                        {/* <button disabled={abled} style={{ backgroundColor: "#47baa2", color: "white", padding: "5px 10px", border: "none", textAlign: "center", margin: "0 auto" }} onClick={() => CSV()}>Download List</button><br /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivitiesDataDisplay