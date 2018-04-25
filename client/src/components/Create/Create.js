import React, { Component } from "react";
import "./Create.css";
import "./Map.css"
import API from "../../utils/API";
// import "./CreateFunction.js";
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'




class Create extends React.Component {

    componentWillUnmount() {
        console.log('unmount')
    }

    componentDidMount() {

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
            geocoder.on('result', function (ev) {

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

                var cityData = {
                    location: ev.result.place_name,
                    coordinates: ev.result.geometry.coordinates
                }

                API.saveCity({
                    cityData
                  })

                geojson.features.forEach(function (marker) {

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
        return (
            <div>
                <div id='map'></div>
                <script>

                </script>
            </div>
        )
    }
};



export default Create;
