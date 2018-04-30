import React, { Component } from "react";
import "./DetailsCard2.css";
// import { Collection, CollectionItem, Button } from 'react-materialize'
import { Row, Col, Card, CardTitle, Button } from 'react-materialize'


class DetailsCard2 extends Component {

    delPlace = (citiesId, detailsId) => {
        this.props.onClick(citiesId, detailsId)
    }

    render() {
        return (
            <div>
                {this.props.data.map(result => (
                <Row>
                    <Col s={12} key={result._id}>
                        <Card className='viewCard'>
                            <div>
                                <h5>
                                    <span id='placeTitle'>
                                        {result.location}
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

export default DetailsCard2;
