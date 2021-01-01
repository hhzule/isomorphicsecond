import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Weather = ({ city }) => {
    // console.log(city, "from weather")
    const [da, setDa] = useState();

    useEffect(() => {
        if (city)
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=1b12d74f08218fde74f01925927e7585`)
                .then(res => {
                    let valuesArr = res.data.list;
                    var removeValFrom = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 32, 33, 34, 35, 36, 37, 38, 39];
                    valuesArr = valuesArr && valuesArr.filter(function (value, index) {
                        return removeValFrom.indexOf(index) === -1;
                    })
                    setDa(valuesArr);

                })

    }, [city]);


    // console.log(da, "result")


    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
                <div>
                    <h1 style={{ fontSize: "170%" }}>Weather</h1>
                    <p>{da && da[0].weather[0].main}</p><br />

                </div>

                <div style={{ margin: "0 25%", display: "flex", fontSize: "200%" }}>
                    {da && da[0].weather[0].main === "Clouds" ?
                        <h1><span role="img" aria-labelledby="icon">☁️ </span></h1> : da && da[0].weather[0].main === "Thunderstorm" ?
                            <h1><span role="img" aria-labelledby="icon">⛈ </span></h1> : da && da[0].weather[0].main === "Smoke" ?
                                <h1><span role="img" aria-labelledby="icon">🌫 </span></h1> : da && da[0].weather[0].main === "Haze" ?
                                    <h1><span role="img" aria-labelledby="icon">🌧</span> </h1> : da && da[0].weather[0].main === "Rain" ?
                                        <h1><span role="img" aria-labelledby="icon">💨</span> </h1> : da && da[0].weather[0].main === "Mist" ?
                                            <h1><span role="img" aria-labelledby="icon">🌦</span> </h1> : da && da[0].weather[0].main === "Drizzle" ?
                                                <h1><span role="img" aria-labelledby="icon">❄️ </span></h1> : da && da[0].weather[0].main === "Snow" ?
                                                    <h1><span role="img" aria-labelledby="icon">☀️ </span></h1> : da && da[0].weather[0].main === "Clear" ?
                                                        <h1><span role="img" aria-labelledby="icon">☀️ </span></h1> : <p></p>


                    }
                    <p style={{ fontSize: "90%" }}>{da && da[0].main.temp}<sup>°F</sup></p>
                </div>

            </div>
            <div style={{ display: "flex" }}>
                {da && da.slice(1).map((obj, i) => {
                    let cls;
                    if (obj.weather[0].main === "Clouds") {
                        cls = "☁️"
                    } else if (obj.weather[0].main === "Thunderstorm") {
                        cls = "⛈"
                    } else if (obj.weather[0].main === "Smoke") {
                        cls = "🌫"
                    } else if (obj.weather[0].main === "Haze") {
                        cls = ""
                    } else if (obj.weather[0].main === "Rain") {
                        cls = "🌧"
                    } else if (obj.weather[0].main === "Mist") {
                        cls = "💨"
                    } else if (obj.weather[0].main === "Drizzle") {
                        cls = "🌦"
                    } else if (obj.weather[0].main === "Snow") {
                        cls = "❄️"
                    } else if (obj.weather[0].main === "Clear") {
                        cls = "☀️"
                    }
                    let dat = obj.dt_txt;
                    let newdat = dat.slice(8, 10)

                    return <div key={i} style={{ margin: "15px " }}>
                        <p>{newdat}</p>
                        <h3>{cls}</h3>
                        <p>{obj.main.temp}</p>


                    </div>
                })

                }
            </div>


        </div>
    )
}

export default Weather
// key: 1b12d74f08218fde74f01925927e7585
// nomtrips: 68a9b2df3f06f64c2795f6c9ac4e5068