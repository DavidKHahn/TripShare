import React, { Component } from "react";
import "./Create.css";
import "./Map.css"
import API from "../../utils/API";
// import "./CreateFunction.js";
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import DetailsCard from "../DetailsCard"
import Nav_Bar from "../NavBar"


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

let cityId = "";

class Create extends React.Component {

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
            isHidden: false
        }
    }

    componentWillUnmount() {
        console.log('unmount')
    }

    handleFormSubmit = event => {
        console.log(this.state.location, this.state.coordinates);
        this.setState({
            isHidden: true
        })

        let cityData = {
            location: this.state.location,
            coordinates: this.state.coordinates
        }

        API.saveCity({
            location: cityData.location,
            coordinates: cityData.coordinates
        }).then((result) => {
            cityId = result.data._id
        })
    };


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

    handleSubmitForm = (e) => {
        e.preventDefault();
        this.toggle();
        const { name, description, selectedFile } = this.state;
        let formData = new FormData();

        formData.append('name', name)
        formData.append('description', description);
        formData.append('selectedFile', selectedFile);
        formData.append('cityId', cityId )

        API.saveDetails(formData).then((result) => {

        })
    }

    getUserData() {
        API.getUserData("5ae241d573b42f0a8973a28e").then((result) => {
            console.log(result.data.details)

        })
    }

    componentDidMount() {
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

        var marker = document.getElementsByClassName('marker');

        map.on('click', function (e) {
            console.log("hello")
            var features = map.queryRenderedFeatures(e.point, {
                layers: ['background'] // replace this with the name of the layer
            });

            if (!features.length) {
                return;
            }

            var feature = features[0];

            var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
                .setLngLat(feature.geometry.coordinates)
                .addTo(map);
        });
    }

    render() {

        var modal = [];
        modal.push(
            <div className="modal" style={this.state.toggle ? display : hide}>
                <div className="modal-content">
                    <h4>Title of Place</h4>
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
                                    <label for="name">Name</label>
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
                                    <label for="description">Description</label>
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
                                    />
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
                {/* <Nav_Bar /> */}
                <div className='mapContainer'>
                    <div id='map'></div>
                    {modal}
                </div>
                <div>
                    <a className="btn addBtn" onClick={this.handleFormSubmit}>Select City</a><a className="btn addBtn" onClick={this.toggle}>Add Place</a>                   
                </div>
                {!this.state.isHidden ? "" : <h4>{this.state.location}</h4>}
                <DetailsCard />
            </div>
        )
    }
};


export default Create;
