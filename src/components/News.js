import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Carousel from 'nuka-carousel';
const News = ({ country }) => {
    // console.log(country, "from news")
    const [da, setDa] = useState();
    useEffect(() => {
        if (country)
            axios.get(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=10b2a6f50add4cf8b24ae020c92d941b`)
                .then(res => {
                    // console.log(res.data.articles)
                    setDa(res.data.articles);

                })

    }, [country]);

    return (
        <div>
            <Carousel>
                {da && da.map((obj, i) => {
                    return <div key={i} style={{ height: "150px", padding: "10px 70px" }}>
                        <p>{obj.title}</p>   <p><strong>Source:</strong>      {obj.source.name}  <a href={obj.url} target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}> click to view</a></p>

                    </div>
                })}
            </Carousel>
        </div>
    )
}

export default News
// 10b2a6f50add4cf8b24ae020c92d941b