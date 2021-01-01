import React, { useState, useEffect } from 'react'
import axios from "axios";

const Enum = ({ country }) => {
    const iso = country.toLowerCase()
    // console.log(iso, "iso")
    const [da, setDa] = useState();

    useEffect(() => {
        if (country)
            axios.get(`/country/${iso}`)
                .then(res => {
                    // console.log(res.data)
                    setDa(res.data);

                })

    }, [country, iso]);
    // console.log(code, "sixth")
    return (
        <div>

            <h5 >Fire: {da && da.fire}</h5><br />
            <h5>Medical: {da && da.medical}</h5><br />
            <h5>Police:  {da && da.police}</h5><br />
        </div>
    )
}

export default Enum