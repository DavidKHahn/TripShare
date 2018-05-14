import React, { Component } from "react";
import "./View.css";
import API from "../../utils/API";
import { Modal, Button, Row, Input, Col, CardPanel, Card, Navbar, NavItem, Dropdown } from "react-materialize"
import Nav_Bar from "../NavBar"
import { Link } from "react-router-dom";
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import DetailsCard2 from "../DetailsCard2";

var userToken = window.localStorage.getItem("token")
var name = window.localStorage.getItem("name")

var cityCoords = []

var map

class View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userCitiesData: [],
            user: "",
            token: '',
            cityCoords: [],
            geojson: {
                type: 'FeatureCollection',
                features: []
            },
            userList: [],
            loggedAs: ""
        }
        this.userSelect = this.userSelect.bind(this);
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

    userSelect = (event) => {
        event.preventDefault();
        console.log("event", event.target)

        window.localStorage.setItem("name", event.target.value)
        // this.setState({ user: event.target.value })
    }

    getUserData() {
        console.log("name", name)
        API.getUserByName(name).then((result) => {
            console.log("result", result)
            this.setState({
                userCitiesData: result.data.cities,
                user: name
            })

            cityCoords = this.state.userCitiesData.map((data) => {
                return (data.coordinates)
            })

            this.updateCities(cityCoords)
        })
    }

    currentUser() {
        API.getCurrentUser(userToken).then((res) => {

            console.log("userNAME", res)
            this.setState({ loggedAs: res.data.username })
        })
    }

    logOut() {
        window.localStorage.clear();
        window.location = "/"
    }

    populateUsers() {
        API.getUsers().then((res) => {

            this.setState({ userList: res.data })
        })
    }

    componentDidMount() {

        this.setState({ token: userToken })

        this.getUserData()

        this.populateUsers()

        this.currentUser()

        name = window.localStorage.getItem('name')
        console.log("current user:", name)

        console.log('component is mounted')

        mapboxgl.accessToken = 'pk.eyJ1IjoiYXJoZWVlZSIsImEiOiJjamdjeXZsaGswNmk0MzJtYWM5MXJxdWhlIn0.YLMP3IJkPnF-y8Yv0A8Udg';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/arheeee/cjgcyypkq00032sqkj85b2any',
            center: [20.107686, 31.863775],
            zoom: 1
        });

        var geojson = {
            type: 'FeatureCollection',
            features: []
        };

        this.state.userCitiesData.forEach((dat) => {
            var cityFeature = {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
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

        var speedFactor = 30; // number of frames per longitude degree
        var animation; // to store and cancel the animation
        var startTime = 0;
        var progress = 0; // progress = timestamp - startTime
        var resetTime = false; // indicator of whether time reset is needed for the animation
        
        map.on('load', () => {
        
            console.log("geojson", this.state.geojson)

            let lineCoords = this.state.geojson.features.map( (place) => (
                place.geometry.coordinates ))
            
            console.log("linecoords", lineCoords)
            // add the line which will be modified in the animation
            map.addLayer({
                "id": "route",
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": lineCoords                            
                        }
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "#96F550",
                    "line-width": 3
                }
            });
        
          
        });



    }

    render() {

        this.state.userCitiesData.forEach((dat) => {
            var cityFeature = {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
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

        return (

            <div>
                <Navbar brand={<img id="logo" src="uploads/logo.png" />} right>
                    <NavItem>
                        <Input s={2} onChange={this.userSelect} type='select' label="Materialize Select" value={name}>
                            {this.state.userList.map(result =>
                                <option onClick={this.userSelect}>{result.name}</option>

                            )}
                        </Input>
                    </NavItem>
                    <NavItem href={"/create"}>Create</NavItem>
                    <NavItem href={"/view"}>View</NavItem>
                    <NavItem onClick={this.logOut} href={"/"}>{this.state.loggedAs}: Log Out</NavItem>
                </Navbar>
                <div className='mapContainer'>
                    <div id='map'></div>
                </div>
                        <DetailsCard2 data={this.state.userCitiesData}/>
            </div>

        );
    }
}

export default View;