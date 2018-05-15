import React, { Component } from "react";
import "./DetailsCard.css";
// import { Collection, CollectionItem, Button } from 'react-materialize'
import { Row, Col, Card, CardTitle, Button } from 'react-materialize'


class DetailsCard extends Component {

    delPlace = (citiesId, detailsId) => {
        this.props.onClick(citiesId, detailsId)
    }

    delCity = (userToken, citiesId) => {
        this.props.deleteCity(userToken, citiesId)
    }

    render() {
        console.log(this.props)
        return (
            <div id="outer-container">
                <Card id="place-container">
                    {this.props.data < 1 ? null : <h4 id="card-header">{this.props.username}'s Travel Log</h4>}
                    {this.props.data.map(result => (
                    <Row>
                        <Col s={12} key={result._id}>
                            <Card>
                                <h5>
                                    <span id='placeTitle'>
                                        {result.location}
                                    </span>
                                    {result.details.length < 1 ? (<span className='cityBtns'><Button onClick={() => this.delCity(this.props.token, result._id)} floating className='red detailBtn deleteBtn' waves='light' icon='delete' /></span>) : ""}                               
                                </h5>
                                <Row>
                                    {result.details.map(details => (
                                        <Col s={4}>
                                            <Card
                                                className='small'
                                                key={details._id}
                                                header={<CardTitle image={details.image}>{details.name}</CardTitle>}
                                            >
                                                <p className="description">{details.description}</p>
                                                <div className='detailBtns'>
                                                    <Button onClick={() => this.delPlace(result._id, details._id)} floating className='red detailBtn' waves='light' icon='delete' />
                                                </div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    ))}
                </Card>
            </div>
        );
    }
}

export default DetailsCard;
