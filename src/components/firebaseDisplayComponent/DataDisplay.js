import React, { useState, useEffect } from 'react'
import { firestore } from '../../firebase';
import { Rate } from "antd";
import img from '../../assets/list.jpg';
import { Divider } from 'antd';
import { useData } from './DataProvider'
import { useAuth } from "../../contexts/AuthContext"
import { AiOutlineDelete } from "react-icons/ai"
import { saveAs } from 'file-saver';
import { Link } from "react-router-dom";
const DataDisplay = ({ name, city, listid }) => {
    console.log(listid, "ididididi")
    const { currentUser } = useAuth();
    const [data, setData] = useState();
    const [listvalue, setListvalue] = useState();
    const [error, setError] = useState();
    useEffect(() => {

        const fetchdash = async () => {

            await firestore.collection(currentUser.uid + `/${city}/${name}`).onSnapshot((snap) => {

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
    const deletelist = async () => {
        try {

            await firestore.collection(currentUser.uid + `/${city}/list`).doc(listid).delete()
        } catch (e) {
            console.log("Failed to delete " + e.message);
        }


    }
    const handleadd = async () => {
        if (listvalue) {

            try {
                await firestore
                    .collection(currentUser.uid + `/${city}/${name}`)
                    .add({ value: listvalue });
                setListvalue("")

            } catch (e) {
                console.log("Failed to add " + e.message);
            }
        } else {
            setError("Enter an item to list")
        }
    }
    const handleDelete = async (id) => {
        try {
            await firestore.collection(currentUser.uid + `/${city}/${name}`).doc(id).delete()
        } catch (e) {
            console.log("Failed to add " + e.message);
        }
    }
    console.log(name, "name")
    console.log(listid, "ididididi")
    return (
        <div className="">
            <div className="">
                <div className="">
                    <img src={img} alt="list"></img>

                </div>
                <div><p>{name} list</p></div>
                <button onClick={() => deletelist()}>del list</button>

            </div>
            <input value={listvalue} onChange={(e) => setListvalue(e.target.value)}></input>
            {error && <p>{error}</p>}
            <button onClick={() => handleadd()}>add to list</button>
            <Divider />
            {data && data.map((obj, i) => {
                return <div key={i} className="data">
                    <p>{obj.dash.value}</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>

                        <button style={{ border: "none", backgroundColor: "white", padding: "", fontSize: "x-large", alignSelf: "center" }} onClick={() => handleDelete(obj.id)}><AiOutlineDelete /> </button>

                    </div>

                    <Divider />
                </div>
            })}
            <div style={{ textAlign: "center" }}>
                {/* <button disabled={abled} style={{ backgroundColor: "#47baa2", color: "white", padding: "5px 10px", border: "none", textAlign: "center", margin: "0 auto" }} onClick={() => CSV()}>Download List</button><br /> */}
                <div className="hidden-data">

                </div>
            </div>
        </div>
    )
}

export default DataDisplay
