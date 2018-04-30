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
        return (
            <div>
                {this.props.data.map(result => (
                <Row>
                    <Col s={12} key={result._id}>
                        <Card>
                            <div>
                                <h5>
                                    <span id='placeTitle'>
                                        {result.location}
                                    </span>
                                    <span className='cityBtns'>
                                                <Button onClick={() => this.delCity(this.props.token, result._id)} floating className='red detailBtn' waves='light' icon='delete' />
                                            </span>
                                </h5>
                            </div>
                            <Row>
                                {result.details.map(details => (
                                    <Col s={4}>
                                        <Card
                                            className='small'
                                            key={details._id}
                                            header={<CardTitle image={details.image}>{details.name}</CardTitle>}
                                        >
                                            <p className="description">Description: {details.description}</p>
                                            <span className='detailBtns'>
                                                <Button onClick={() => this.delPlace(result._id, details._id)} floating className='red detailBtn' waves='light' icon='delete' />
                                            </span>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </Col>
                </Row>
                ))}
            </div>
        );
    }
}

export default DetailsCard;
