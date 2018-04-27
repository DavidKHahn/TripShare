import React, { Component } from "react";
import "./DetailsCard.css";
import API from "../../utils/API";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import { Collection, CollectionItem, Button } from 'react-materialize'


const DetailsCard = props => (
    <div className='detailCard'>
        <Collection>
            <CollectionItem >
                <h5>
                    <span id='placeTitle'>
                        Example Place
                        </span>
                    <span className='detailBtns'>
                        <Button floating small className='green detailBtn' waves='light' icon='edit' />
                        <Button floating small className='red detailBtn' waves='light' icon='delete' />
                    </span>
                </h5>

            </CollectionItem>
            <CollectionItem>Details of this example location will go here. The place was ok and the service was ok. I would recommend this place to ok people but not to no ok people. Okay?
        </CollectionItem>
        </Collection>
    </div>

);





export default DetailsCard;
