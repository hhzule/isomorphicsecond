import React from 'react'
import { firestore } from '../firebase';
import { Rate } from "antd";

import { Divider } from 'antd';
import { useData } from './firebaseDisplayComponent/DataProvider'
import { useAuth } from "../contexts/AuthContext"
import { AiOutlineDelete } from "react-icons/ai"
import { saveAs } from 'file-saver';
import { Link } from "react-router-dom";
const CityDash = () => {

    const { currentUser } = useAuth()
    const { time, cal } = useData()
    const abled = time.length === 0 ? true : false
    console.log(time, "time")
    console.log(cal, "cal")
    const handleDelete = async (place_id) => {
        try {
            await firestore.collection(currentUser.uid).doc(place_id).delete()
        } catch (e) {
            console.log("Failed to add " + e.message);
        }
    }
    console.log(cal, "from dash")
    const addCity = async () => {
        // try {
        //     await firestore.collection(currentUser.uid).doc(place_id).delete()
        // } catch (e) {
        //     console.log("Failed to add " + e.message);
        // }
        // const data =
        // {
        //     text: "nw",
        //     day: "tay",
        //     month: "cent",
        //     date: "some"
        // }
        const sta = [
            { day: "today" },
            { day: "tom" }
        ]

        try {
            await firestore
                .collection(currentUser.uid)
                .doc("cityid").set({ reminder: sta })


        } catch (e) {
            console.log("Failed to add " + e.message);
        }


        // try {
        //     await firestore
        //         .collection(currentUser.uid + "/newyork/cal")
        //         .doc("1")
        //         .set(data);

        // } catch (e) {
        //     console.log("Failed to add " + e.message);
        // }


    }

    const CSV = () => {
        console.log(time, " time")

        // -----------------------
        const convertToCSV = (objArray) => {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line !== '') line += ','
                    line += array[i][index];
                }
                str += line + '\r\n';
            }
            return str;
        }


        var headers = {
            name: "name",
            rating: "rating",
            address: "address",
        };
        var itemsFormatted = [];
        // format the data
        time.forEach((item) => {
            itemsFormatted.push({
                name: item.name,
                rating: item.newrating,
                address: item.address,
            });

        });
        const exportCSVFile = (headers, items) => {
            if (headers) {
                items.unshift(headers);
            }

            // Convert Object to JSON
            var jsonObject = JSON.stringify(items);
            var csv = convertToCSV(jsonObject);
            console.log(csv, "csv")
            var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            console.log(blob, "blob")
            saveAs(blob, 'NomtripsList.csv')

        }
        exportCSVFile(headers, itemsFormatted)
        // ----------------------
    }
    // console.log(time, "datadisplay")
    return (
        <div className="list-containing-items--that-are-saved-by-user" style={{ maxHeight: "80vh", overflowY: "scroll" }}>
            <div className="list-heading">
                <div className="list-icon-div">
                    {/* <img style={{ width: "30px", paddingRight: "10px" }} src={img} alt="list"></img> */}

                </div>
                <div><p>Created list</p></div>


            </div>
            <Divider />
            {time.map((t) => {
                return <div key={t.id} className="data">
                    <p>{t.name}</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Rate style={{ color: "#47BAA2", fontSize: 15 }} value={t.newrating} />
                        <button style={{ border: "none", backgroundColor: "white", padding: "", fontSize: "x-large", alignSelf: "center" }} onClick={() => handleDelete(t.id)}><AiOutlineDelete /> </button>

                    </div>

                    <Divider />
                </div>
            })}
            <div style={{ textAlign: "center" }}>
                <button disabled={abled} style={{ backgroundColor: "#47baa2", color: "white", padding: "5px 10px", border: "none", textAlign: "center", margin: "0 auto" }} onClick={() => CSV()}>Download List</button><br />
                <div className="hidden-data">
                    <Link to="/"><button style={{ width: "110px", backgroundColor: "#47baa2", color: "white", padding: "3px 10px", border: "none", textAlign: "center", margin: "10px auto" }} className="normal-btn" >Home
                                </button>
                    </Link>
                    <button onClick={() => addCity()}>calender</button>
                </div>
            </div>
        </div>
    )
}

export default CityDash
