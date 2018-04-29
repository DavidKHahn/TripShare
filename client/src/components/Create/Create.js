import React, { Component } from "react";
import "./Create.css";
import "./Map.css"
import API from "../../utils/API";
// import mapboxgl, { GeoJSONSource } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import DetailsCard from "../DetailsCard"


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

var userToken = window.localStorage.getItem("token")

class Create extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            toggle: false,
            location: "",
            coordinates: [],
            name: "",
            description: "",
            saved: [],
            selectedFile: "",
            isHidden: false,
            token: "",
            username: "",
            userCitiesData: []
        }
    }

    componentWillUnmount() {
        console.log('unmount')
    }

    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    handleInputChange = event => {
        let value = event.target.value;
        let name = event.target.name

        this.setState({
            [name]: value
        });
    };

    onChange = (e) => {
        const state = this.state;

        switch (e.target.name) {
            case 'selectedFile':
                state.selectedFile = e.target.files[0];
                break;
            default:
                state[e.target.name] = e.target.value;
        }

        this.setState(state);
    }

    // Select Place Button
    handleFormSubmit = event => {
        console.log(this.state.location, this.state.coordinates);
        //changes
        let searchBar = document.getElementsByClassName("mapboxgl-ctrl-geocoder mapboxgl-ctrl");
        searchBar[0].style.display="none";

        this.setState({
            isHidden: true
        })

        let cityData = {
            location: this.state.location,
            coordinates: this.state.coordinates,
            token: this.state.token
        }

        let cities = this.state.userCitiesData

        if (cities.length < 1) {
            API.saveCity({
                cityData
            }).then((result) => {

            })
        } else {
            for (let i=0; i < cities.length; i++ ) {
                if (cities[i].location === cityData.location) {
                    console.log("match")
                    break;
                } else {
                    return(
                        API.saveCity({
                            cityData
                        }).then((result) => {
                
                        })
                    )
                }
            }
        }
    };

    // Add Details Button
    handleSubmitForm = (e) => {
        e.preventDefault();
        //changes
        let searchBar = document.getElementsByClassName("mapboxgl-ctrl-geocoder mapboxgl-ctrl");
        searchBar[0].style.display = "inline";

        this.toggle();
        const { name, description, selectedFile, location, token } = this.state;
        let formData = new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append('selectedFile', selectedFile);
        formData.append('location', location );
        formData.append('token',  token);

        API.saveDetails(formData).then((result) => {

            console.log("save details result:", result)
            this.getUserData();

        })
    }

    getUserData() {
        API.getUserData(userToken).then((result) => {
            this.setState({userCitiesData: result.data.cities})
        })
    }

    componentDidMount() {

        // var userToken = window.localStorage.getItem("token") 

        this.setState({ token: userToken })
        
        this.getUserData()

        console.log('component is mounted')

        mapboxgl.accessToken = 'pk.eyJ1IjoiYXJoZWVlZSIsImEiOiJjamdjeXZsaGswNmk0MzJtYWM5MXJxdWhlIn0.YLMP3IJkPnF-y8Yv0A8Udg';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/arheeee/cjgcyypkq00032sqkj85b2any',
            center: [-79.4512, 43.6568],
            zoom: 2
        });

        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken
        });

        var geojson = {
            type: 'FeatureCollection',
            features: []
        };

        // add markers to map
        // geojson.features.forEach(function (marker) {

        //     // create a HTML element for each feature
        //     var el = document.createElement('div');
        //     el.className = 'marker';

        //     // make a marker for each feature and add to the map
        //     new mapboxgl.Marker(el)
        //         .setLngLat(marker.geometry.coordinates)
        //         .addTo(map);
        // });


        map.addControl(geocoder);

        // After the map style has loaded on the page, add a source layer and default
        // styling for a single point.
        // map.addSource('single-point', {
        //     "type": "geojson",
        //     "data": {
        //         "type": "FeatureCollection",
        //         "features": []
        //     }
        // });

        // map.addLayer({
        //     "id": "point",
        //     "source": "single-point",
        //     "type": "circle",
        //     "paint": {
        //         "circle-radius": 10,
        //         "circle-color": "#007cbf"
        //     }
        // });

        // Listen for the `geocoder.input` event that is triggered when a user
        // makes a selection and add a symbol that matches the result.
        geocoder.on('result', (ev) => {

            console.log("ev result", ev.result);

            geojson.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: ev.result.geometry.coordinates
                },
                properties: {
                    title: 'Mapbox',
                    description: ev.result.place_name
                }
            })

            this.setState({
                location: ev.result.place_name,
                coordinates: ev.result.geometry.coordinates
            })

            geojson.features.forEach((marker) => {

                // create a HTML element for each feature
                var el = document.createElement('div');
                el.className = 'marker';



                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map);
            });
        });

        // var marker = document.getElementsByClassName('marker');

        map.on('click', function (e) {
            console.log("hello")
            var features = map.queryRenderedFeatures(e.point, {
                layers: ['background'] // replace this with the name of the layer
            });

            if (!features.length) {
                return;
            }

            // var feature = features[0];

            // var popup = new mapboxgl.Popup({ offset: [0, -15] })
            //     .setLngLat(feature.geometry.coordinates)
            //     .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
            //     .setLngLat(feature.geometry.coordinates)
            //     .addTo(map);
        });
    }

    render() {

        var modal = [];
        modal.push(
            <div className="modal" style={this.state.toggle ? display : hide} key="modal">
                <div className="modal-content">
                    <h4>{this.state.location}</h4>
                    <p>Enter Details</p>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.handleInputChange}
                                        name="name"
                                        id="name"
                                        type="text"
                                        className="validate"
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.handleInputChange}
                                        name="description"
                                        id="=description"
                                        type="text"
                                        className="validate"
                                    />
                                    <label htmlFor="description">Description</label>
                                </div>
                            </div>
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>File</span>
                                    <input
                                        type="file"
                                        onChange={this.onChange}
                                        name="selectedFile"
                                    />
                                </div>
                                <div className="file-path-wrapper">
                                    <input
                                        type="text"
                                        className="file-path validate"
                                        id="file"
                                    />
                                    <label htmlFor="file">Upload Image</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <a className="btn" onClick={this.handleSubmitForm}>Save</a>
                </div>
            </div>
        );

        return (
            <div>
                <div className='mapContainer'>
                    <div id='map'></div>
                    {modal}
                </div>
                <div className="buttons">
                    
                    {(this.state.location === "") ? null : <a className="btn addBtn" onClick={this.handleFormSubmit}>Select City</a>}
                    {!this.state.isHidden ? "" : <a className="btn addBtn" onClick={this.toggle}>Add Place</a>  }
                </div>
                {!this.state.isHidden ? "" : <h4>Selected City: {this.state.location}</h4>}
                <DetailsCard data={this.state.userCitiesData}/>
            </div>
        )
    }
};


export default Create;
