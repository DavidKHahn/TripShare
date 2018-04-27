import React, { Component } from "react";
import "./View.css";
import API from "../../utils/API";
import { Modal, Button, Row, Input, Col, CardPanel, Card } from "react-materialize"
import Nav_Bar from "../NavBar"
import { Link } from "react-router-dom";
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'


class View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            places: []
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


    handleSubmitLogin = (e) => {
        e.preventDefault();
        const { name, email, username, password } = this.state;
        let loginData = new FormData();

        loginData.append('username', username);
        loginData.append('password', password);

        console.log("logindata", loginData)

        console.log("username:", this.state.username)
    }

    getUserData() {
        API.getUserData("5ae241d573b42f0a8973a28e").then((result) => {
            // console.log(result.data.details)

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

        var geojson = {
            type: 'FeatureCollection',
            features: []
        };
    }

    render() {

        return (

            <div>
                <div className='mapContainer'>
                    <div id='map'></div>
                </div>
            </div>

        );
    }
}

export default View;