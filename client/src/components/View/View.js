import React, { Component } from "react";
import "./View.css";
import API from "../../utils/API";
import { Modal, Button, Row, Input, Col, CardPanel, Card } from "react-materialize"
import Nav_Bar from "../NavBar"
import { Link } from "react-router-dom";
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import NavBar2 from "../NavBar";

var userToken = window.localStorage.getItem("token")

var cityCoords = []

var map

class View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userCitiesData: [],
            token: '',
            cityCoords: [],
            geojson: {
                type: 'FeatureCollection',
                features: []
            },
            userList: []
        }
    }

    handleInputChange = event => {
        let value = event.target.value;
        let name = event.target.name

        this.setState({
            [name]: value
        });
    };

    handleSubmitSignUp = (e) => {
        e.preventDefault();

    }

    updateCities = (coord) => {
        this.setState({ cityCoords: coord })
        console.log(this.state.cityCoords)
    }

    getUserData() {
        API.getUserData(userToken).then((result) => {
            console.log(result.data)
            this.setState({ userCitiesData: result.data.cities })

            cityCoords = this.state.userCitiesData.map((data) => {
                return (data.coordinates)
            })

            this.updateCities(cityCoords)
        })
    }

    populateUsers() {
        API.getUsers().then( (res) => {
            console.log(res)
        })
    }

    componentDidMount() {

        this.setState({ token: userToken })

        this.getUserData()

        

        console.log('component is mounted')

        mapboxgl.accessToken = 'pk.eyJ1IjoiYXJoZWVlZSIsImEiOiJjamdjeXZsaGswNmk0MzJtYWM5MXJxdWhlIn0.YLMP3IJkPnF-y8Yv0A8Udg';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/arheeee/cjgcyypkq00032sqkj85b2any',
            center: [-79.4512, 43.6568],
            zoom: 2
        });

        var geojson = {
            type: 'FeatureCollection',
            features: []
        };

        this.state.userCitiesData.forEach((dat) => {
            var cityFeature = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: dat.coordinates
                },
                properties: {
                    title: "City",
                    description: dat.location
                }
            }

            geojson.features.push(cityFeature)
        })

        geojson.features.forEach((marker) => {

            console.log("marker", marker)

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';

            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<p>' + marker.properties.description + '</p>'))
                .addTo(map);
        });
    }

    render() {

        this.state.userCitiesData.forEach((dat) => {
            var cityFeature = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: dat.coordinates
                },
                properties: {
                    title: "City",
                    description: dat.location
                }
            }

            this.state.geojson.features.push(cityFeature)
        })

        this.state.geojson.features.forEach((marker) => {

            console.log("marker", marker)

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';

            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<p>' + marker.properties.description + '</p>'))
                .addTo(map);
        });

        console.log(this.state.cityCoords)

        return (

            <div>
                <NavBar2 />
                <div className='mapContainer'>
                    <div id='map'></div>
                </div>
            </div>

        );
    }
}

export default View;