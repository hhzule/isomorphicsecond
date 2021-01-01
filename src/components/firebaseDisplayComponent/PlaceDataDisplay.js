import React, { useState, useEffect } from 'react'
import { firestore } from '../../firebase';
import { Rate } from "antd";
import img from '../../assets/list.jpg';
import { Divider } from 'antd';
import { useAuth } from "../../contexts/AuthContext"
import { FaTrash, FaRegCalendar } from "react-icons/fa"
import { AiOutlinePlus } from "react-icons/ai"
import { saveAs } from 'file-saver';
import { Link } from "react-router-dom";
const PlaceDataDisplay = ({ trip, city, lat, lng }) => {

    const { currentUser } = useAuth();
    const [data, setData] = useState();


    useEffect(() => {

        const fetchdash = async () => {

            await firestore.collection(currentUser.uid + `/${city}/${trip}`).onSnapshot((snap) => {

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
    const abled = data && data.length === 0 ? true : false
    // console.log(data, "frpmdatadisplay")
    // console.log(city, "city")


    const handleDelete = async (id) => {
        try {
            await firestore.collection(currentUser.uid + `/${city}/${trip}`).doc(id).delete()
        } catch (e) {
            console.log("Failed to add " + e.message);
        }



    }

    const CSV = () => {

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
        data.forEach((item) => {
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

    return (
        <div className="" style={{ width: "500px", minHeight: "800px", border: "1px solid grey", backgroundColor: "white", borderRadius: "10px" }}>
            <div style={{ width: "100%", padding: "30px", paddingBottom: "0px", display: "flex", justifyContent: "space-between" }} >

                <h3 style={{ fontSize: "25px" }}>Restaurants</h3>
                <Link to={`/dashboard/${city}/${trip}/${lat}/${lng}`}> <button style={{ backgroundColor: "#4abaa3", width: "40px", height: "40px", border: "none", color: "white", borderRadius: "100px" }}><AiOutlinePlus /></button></Link>

            </div>

            <Divider />
            <div style={{ width: "100%", overflowY: "scroll", maxHeight: "80vh" }}>
                {data && data.map((obj, i) => {
                    return <div key={i} style={{ padding: "10px", borderBottom: "2px dashed lightgray" }} >
                        <div style={{ display: "flex", margin: "0px auto", justifyContent: "space-between", width: "100%" }}>
                            <div style={{ textAlign: "left" }}>
                                <h3 style={{ fontSize: "17px" }}>{obj.dash.name}</h3><br /> <p style={{ fontSize: "13px", color: "grey" }}>{obj.dash.address}</p>
                            </div>

                            <div style={{ display: "flex" }}>
                                <button style={{ fontSize: "15px", borderRadius: "5px", backgroundColor: "lightgray", color: "white", border: "none", margin: "0 10px", width: "40px", height: "40px" }} onClick={() => handleDelete(obj.id)}><FaTrash /> </button>
                                <button style={{ fontSize: "15px", borderRadius: "5px", backgroundColor: "#4494e6", color: "white", border: "none", margin: "0 10px", width: "40px", height: "40px" }} onClick={() => handleDelete(obj.id)}><FaRegCalendar /> </button>

                            </div>

                        </div>


                    </div>
                })}
            </div>

            <div style={{ textAlign: "center" }}>
                <button disabled={abled} style={{ backgroundColor: "#47baa2", color: "white", padding: "5px 10px", border: "none", textAlign: "center", margin: "0 auto" }} onClick={() => CSV()}>Download List</button><br />
            </div>
        </div>
    )
}

export default PlaceDataDisplay
