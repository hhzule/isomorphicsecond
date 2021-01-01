import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapAutoComplete from '../mapcomponents/MapAutoComplete';
import PlaceCard from '../mapcomponents/PlaceCard';
import { Button } from 'antd';
// import DataDisplay from "../components/firebaseDisplayComponent/DataDisplay";
import "../components/Started.css"
import { FaSearch } from "react-icons/fa"
import Marker from "./Marker"
const SG_COOR = { lat: 0, lng: 0 };
// if (navigator.geolocation) {

//   navigator.geolocation.getCurrentPosition((po) => {
//     const position = {
//       lat: po.coords.latitude,
//       lng: po.coords.longitude
//     }
//     SG_COOR.lat = position.lat;
//     SG_COOR.lng = position.lng
//     return SG_COOR
//   })
// }

class MapsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            constraints: [{ name: '', time: 120 }],
            searchResults: [],
            mapsLoaded: false,
            markers: [],
            custom: "",
            select: "all",

            // markers: [{
            //     lat: 0,
            //     lng: 0,
            //     name: ""
            // }],
            map: {},
            mapsApi: {},
            singaporeLatLng: {},
            autoCompleteService: {},
            placesService: {},
            geoCoderService: {},
            hasNextPage: false,
            // api: process.env.REACT_APP_API

        };
    }

    // this.setState({ userImg:  this.context.currentUser.photoURL })
    componentDidMount = (() => {
        const localResults = sessionStorage.getItem(this.props.city)
        if (localResults !== null)
            this.setState({ searchResults: JSON.parse(localResults) });
        this.setState({ lat: Number(this.props.lat) })
        this.setState({ lng: Number(this.props.lng) })

    })

    // Adds a Marker to the GoogleMaps component
    addMarker = ((lat, lng, name) => {
        const prevMarkers = this.state.markers;
        const markers = Object.assign([], prevMarkers);
        // const markers = this.state.markers
        // If name already exists in marker list just replace lat & lng.
        let newMarker = true;
        for (let i = 0; i < markers.length; i++) {
            if (markers[i].name === name) {
                newMarker = false;
                markers[i].lat = lat;
                markers[i].lng = lng;
                // message.success(`Updated "${name}" Marker`);
                break;
            }
        }
        // Name does not exist in marker list. Create new marker
        if (newMarker) {
            markers.push({ lat, lng, name });
            // message.success(`Added new "${name}" Marker`);
        }

        this.setState({ markers });
    });

    //   Runs once when the Google Maps library is ready
    // Initializes all services that we need
    apiHasLoaded = ((map, mapsApi) => {
        this.setState({
            mapsLoaded: true,
            map,
            mapsApi,
            singaporeLatLng: new mapsApi.LatLng(SG_COOR.lat, SG_COOR.lng),
            // autoCompleteService: new mapsApi.places.AutocompleteService(),
            placesService: new mapsApi.places.PlacesService(map),
            // geoCoderService: new mapsApi.Geocoder(),
            // directionService: new mapsApi.DirectionsService(),
        });
    });
    // cusine Search
    handleSearchCusine = (() => {

        const { markers, placesService, mapsApi } = this.state;
        console.log(markers, "markers")
        // if (markers.length < 1) {
        //     return this.setState({ error: "kindly select a city" })
        // }
        this.setState({ error: "" })
        const filteredResults = [];
        const marker = markers[0];
        const lat = this.props.lat;
        const lng = this.props.lng;
        const markerLatLng = new mapsApi.LatLng(lat, lng);

        const placesRequest = {
            location: markerLatLng,
            radius: '28000', // Cannot be used with rankBy. Pick your poison!
            type: ['restaurant'], // List of types: https://developers.google.com/places/supported_types
            query: `${this.state.select} restaurants`,

        };

        // First, search for ice cream shops.
        placesService.textSearch(placesRequest, ((response, status, pagination) => {
            // console.log(response, "res")
            console.log(status, "ststus");
            // console.log(pagination.nextPage, "pagination")
            if (!pagination.hasNextPage) {
                this.setState({ hasNextPage: false });
                console.log(this.state.hasNextPage, "has")


            }
            if (pagination.hasNextPage) {
                console.log(this.state.hasNextPage, "has")
                this.setState({ getNextPage: pagination.nextPage() });
                this.setState({ hasNextPage: true });
            }
            const responseLimit = response.length;
            for (let i = 0; i < responseLimit; i++) {
                const iceCreamPlace = response[i];
                const { rating, name, place_id } = iceCreamPlace;
                const address = iceCreamPlace.formatted_address; // e.g 80 mandai Lake Rd,
                // const priceLevel = iceCreamPlace.price_level; // 1, 2, 3...
                const lat = iceCreamPlace.geometry.location.lat();
                const lng = iceCreamPlace.geometry.location.lng();
                let photoUrl = '';
                console.log(lat, " lat")
                this.addMarker(lat, lng, name)
                if (iceCreamPlace.photos && iceCreamPlace.photos.length > 0) {
                    photoUrl = iceCreamPlace.photos[0].getUrl();
                }

                filteredResults.push({
                    name,
                    rating,
                    address,
                    photoUrl,
                    place_id,
                    lat,
                    lng

                });
                let byStar = filteredResults.slice(0);
                byStar.sort((a, b) => {
                    return b.rating - a.rating;
                })
                // Finally, Add results to state
                this.setState({ searchResults: byStar });
                sessionStorage.setItem(this.props.city, JSON.stringify(byStar))
            }
        }));


    });




    // With the constraints, find some places serving 
    handleSearch = (() => {

        const { markers, placesService, mapsApi } = this.state;
        console.log(markers, "markers")
        // if (markers.length < 1) {
        //     return this.setState({ error: "kindly select a city" })
        // }
        this.setState({ error: "" })
        const filteredResults = [];
        const marker = markers[0];
        const lat = this.props.lat;
        const lng = this.props.lng;
        const markerLatLng = new mapsApi.LatLng(lat, lng);

        const placesRequest = {
            location: markerLatLng,
            radius: '28000', // Cannot be used with rankBy. Pick your poison!
            type: ['restaurant'], // List of types: https://developers.google.com/places/supported_types
            query: `${this.state.custom}`,

        };

        // First, search for ice cream shops.
        placesService.textSearch(placesRequest, ((response, status, pagination) => {
            // console.log(response, "res")
            console.log(status, "ststus");
            // console.log(pagination.nextPage, "pagination")
            if (!pagination.hasNextPage) {
                this.setState({ hasNextPage: false });
                console.log(this.state.hasNextPage, "has")


            }
            if (pagination.hasNextPage) {
                console.log(this.state.hasNextPage, "has")
                this.setState({ getNextPage: pagination.nextPage() });
                this.setState({ hasNextPage: true });
            }
            const responseLimit = response.length;
            for (let i = 0; i < responseLimit; i++) {
                const iceCreamPlace = response[i];
                const { rating, name, place_id } = iceCreamPlace;
                const address = iceCreamPlace.formatted_address; // e.g 80 mandai Lake Rd,
                // const priceLevel = iceCreamPlace.price_level; // 1, 2, 3...
                const lat = iceCreamPlace.geometry.location.lat();
                const lng = iceCreamPlace.geometry.location.lng();
                let photoUrl = '';
                console.log(lat, " lat")
                this.addMarker(lat, lng, name)
                if (iceCreamPlace.photos && iceCreamPlace.photos.length > 0) {
                    photoUrl = iceCreamPlace.photos[0].getUrl();
                }

                filteredResults.push({
                    name,
                    rating,
                    address,
                    photoUrl,
                    place_id,
                    lat,
                    lng

                });
                let byStar = filteredResults.slice(0);
                byStar.sort((a, b) => {
                    return b.rating - a.rating;
                })
                // Finally, Add results to state
                this.setState({ searchResults: byStar });
                sessionStorage.setItem(this.props.city, JSON.stringify(byStar))
            }
        }));


    });



    render() {


        const { constraints, mapsLoaded, singaporeLatLng, searchResults, } = this.state;
        // const { autoCompleteService, geoCoderService } = this.state; // Google Maps Services
        return (
            <div style={{ display: "grid", gridTemplateColumns: "7fr 10fr" }}>
                <div className="main-container">
                    <section className=" header" style={{ display: "flex", marginBottom: "30px", width: "35vw", justifyContent: "space-between" }}>
                        <h1 style={{ fontSize: "40px", margin: "0 10px" }}>{this.props.city}</h1><Button style={{ backgroundColor: "#4494e6", color: "WHITE", alignSelf: "center" }}>VIEW DASHBOARD</Button>
                    </section>
                    <div style={{ display: "flex" }}>
                        {/* Search Button */}
                        <div className="">
                            {mapsLoaded ?
                                <div>
                                    {constraints.map((constraint, key) => {
                                        const { name } = constraint;
                                        return (
                                            <div key={key} className="main-primary-main">
                                                <div className="main-secondary">

                                                    <div className="auto-diver"  >
                                                        {/* <MapAutoComplete

                                                        className="auto-search"
                                                        autoCompleteService={autoCompleteService}
                                                        geoCoderService={geoCoderService}
                                                        singaporeLatLng={singaporeLatLng}
                                                        markerName={name}
                                                        addMarker={this.addMarker}
                                                        markers={this.state.markers}
                                                    /> */}
                                                        <div>
                                                            <div>
                                                                <input placeholder="Search Restaurant, Neighbourhood" style={{ padding: "5px ", width: "30vw" }} value={this.state.custom} onChange={(e) => this.setState({ custom: e.target.value })}></input>
                                                                <Button style={{ backgroundColor: "#47baa2", color: "white" }} type="" size="large" onClick={this.handleSearch}>Search!</Button>

                                                            </div>
                                                            <div style={{ display: "flex", margin: "30px auto" }}>
                                                                <h3 style={{ alignSelf: "center" }}>Select Cuisine</h3>

                                                                <select value={this.state.select} onChange={(e) => this.setState({ select: e.target.value })} style={{ width: "20vw", margin: "0 30px" }}>
                                                                    <option defaultValue>All</option>
                                                                    <option value="Chinese">Chinese</option>
                                                                    <option value="Thai">Thai</option>
                                                                    <option value="Mexican">Mexican</option>
                                                                    <option value="Italian">Italian</option>
                                                                    <option value="Indian">Indian</option>
                                                                    <option value="Japanese">Japanese</option>
                                                                    <option value="American">American</option>
                                                                    <option value="Turkish">Turkish</option>
                                                                    <option value="Spanish">Spanish</option>
                                                                </select>
                                                                <Button style={{ backgroundColor: "#47baa2", color: "white" }} type="" size="large" onClick={this.handleSearchCusine}><FaSearch /></Button>

                                                            </div>


                                                        </div>



                                                        <p>  {this.state.error ? <p>{this.state.error}</p> : null}</p>
                                                    </div>

                                                    <span> </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                : null
                            }

                            {/* Results section */}
                            <section>
                                {searchResults.length > 0 ?
                                    <>
                                        {/* <Divider /> */}
                                        <section className="card-container">
                                            <div className="">

                                                <div className="card-grid" style={{ display: "flex", flexDirection: "column", width: "80%" }}>
                                                    {searchResults.map((result, key) => (
                                                        <PlaceCard info={result} key={key} trip={this.props.trip} city={this.props.city} />
                                                    ))}


                                                </div>
                                            </div>
                                        </section>
                                    </>
                                    : null}
                            </section>

                        </div>

                    </div>





                </div >
                <div className="map-contain" style={{ width: "45vw", height: "800px", marginTop: "60px" }}>

                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: 'AIzaSyBhZT-C7-iCZMEKaBunHAehILIA-C_5BR4',
                            libraries: ['places']
                        }}
                        defaultZoom={13}
                        defaultCenter={{
                            lat: this.state.lat,
                            lng: this.state.lng
                        }}
                        yesIWantToUseGoogleMapApiInternals={true}
                        onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)} // "maps" is the mapApi. Bad naming but that's their library.
                    >
                        {this.state.searchResults[0] && this.state.searchResults.map((ob, i) => {
                            return <Marker
                                key={i}
                                style={{ backgroundColor: "red", width: "10px" }}
                                lat={ob.lat}
                                lng={ob.lng}
                                text={ob.name}
                            />
                        })}

                    </GoogleMapReact>

                </div></div>)

    }
}

export default MapsContainer;