import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import rev from '../assets/maps-marker.png';
import "./New.css"



const Slideshow = ({ slideImages }) => {
    console.log(slideImages, "prop")

    return (
        <div className="slide-container">
            <Slide>


                {slideImages ? slideImages.map((img, i) => {
                    return <div className="each-slide" key={i} >
                        <div style={{ 'backgroundImage': `url(${img.getUrl()})`, height: "400px", backgroundSize: "cover", objectFit: "contain", backgroundPosition: "center" }}>
                        </div>
                    </div>
                }) : <div className="each-slide" key="1" >
                        <div style={{ 'backgroundImage': `url(${rev})`, height: "400px", backgroundSize: "cover", objectFit: "contain", backgroundPosition: "center" }}>
                        </div>
                    </div>

                }




            </Slide>
        </div >
    )
}
export default Slideshow


// const imageList = [];
// if (detail && detail.photos)
//     detail.photos.map((obj) => {
//         const url = obj.raw_reference.file_url;
//         imageList.push(url)
//     })