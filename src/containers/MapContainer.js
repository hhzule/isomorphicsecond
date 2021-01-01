import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapAutoComplete from '../mapcomponents/MapAutoComplete';
import PlaceCard from '../mapcomponents/PlaceCard';
import { Button } from 'antd';
import DataDisplay from "../components/firebaseDisplayComponent/DataDisplay";

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
      // markers: [{
      //   lat: 0,
      //   lng: 0,
      //   name: ""
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
    const localResults = sessionStorage.getItem("results")
    if (localResults !== null)
      this.setState({ searchResults: JSON.parse(localResults) });


  })

  // Adds a Marker to the GoogleMaps component
  addMarker = ((lat, lng, name) => {
    // const prevMarkers = this.state.markers;
    // const markers = Object.assign([], prevMarkers);
    const markers = this.state.markers
    // If name already exists in marker list just replace lat & lng.
    let newMarker = true;
    // for (let i = 0; i < markers.length; i++) {
    //   if (markers[i].name === name) {
    //     newMarker = false;
    //     markers[i].lat = lat;
    //     markers[i].lng = lng;
    //     // message.success(`Updated "${name}" Marker`);
    //     break;
    //   }
    // }
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
      autoCompleteService: new mapsApi.places.AutocompleteService(),
      placesService: new mapsApi.places.PlacesService(map),
      geoCoderService: new mapsApi.Geocoder(),
      // directionService: new mapsApi.DirectionsService(),
    });
  });
  // With the constraints, find some places serving 
  handleSearch = (() => {
    const { markers, placesService, mapsApi } = this.state;
    console.log(markers, "markers")
    if (markers.length < 1) {
      return this.setState({ error: "kindly select a city" })
    }
    this.setState({ error: "" })
    const filteredResults = [];
    const marker = markers[0];
    const markerLatLng = new mapsApi.LatLng(marker.lat, marker.lng);

    const placesRequest = {
      location: markerLatLng,
      radius: '32000', // Cannot be used with rankBy. Pick your poison!
      type: ['restaurant'], // List of types: https://developers.google.com/places/supported_types
      query: 'food',

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
        sessionStorage.setItem("results", JSON.stringify(byStar))
      }
    }));


  });


  render() {
    // console.log(this.state, "state");
    // console.log(this.state.userImg)

    const { constraints, mapsLoaded, singaporeLatLng, searchResults, } = this.state;
    const { autoCompleteService, geoCoderService } = this.state; // Google Maps Services
    return (
      <div className="main-container">
        <section className=" header">
          {mapsLoaded ?
            <div>
              {constraints.map((constraint, key) => {
                const { name } = constraint;
                return (
                  <div key={key} className="main-primary-main">
                    <div className="main-secondary">
                      <div className="auto-diver" >
                        <MapAutoComplete

                          className="auto-search"
                          autoCompleteService={autoCompleteService}
                          geoCoderService={geoCoderService}
                          singaporeLatLng={singaporeLatLng}
                          markerName={name}
                          addMarker={this.addMarker}
                          markers={this.state.markers}
                        />
                        <div className="search-btn-div" >

                          <Button style={{ backgroundColor: "#47baa2", color: "white" }} type="" size="large" onClick={this.handleSearch}>Search!</Button>

                        </div><br />
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
        </section>

        {/* Search Button */}
        <div className="bottom-main">
          {/* Results section */}
          <section>
            {searchResults.length > 0 ?
              <>
                {/* <Divider /> */}
                <section className="col-12 card-container">
                  <div className="d-flex flex-column justify-content-center">

                    <div className="card-grid">
                      {searchResults.map((result, key) => (
                        <PlaceCard info={result} key={key} />
                      ))}


                    </div>
                  </div>
                </section>
              </>
              : null}
          </section>
          <div className="section-of-list-grid"></div>
          <section className="saved-list-section">

            <div className="data-list">
              <DataDisplay />
            </div>
          </section>

        </div>
        <div style={{ display: "none" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyBhZT-C7-iCZMEKaBunHAehILIA-C_5BR4',
              libraries: ['places']
            }}
            defaultZoom={15}
            defaultCenter={{ lat: SG_COOR.lat, lng: SG_COOR.lng }}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)} // "maps" is the mapApi. Bad naming but that's their library.
          >
          </GoogleMapReact>
        </div>


      </div >)

  }
}

export default MapsContainer;