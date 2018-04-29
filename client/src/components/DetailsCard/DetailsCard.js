import React from "react";
import "./DetailsCard.css";
// import { Collection, CollectionItem, Button } from 'react-materialize'
import { Row, Col, Card, CardTitle, Button } from 'react-materialize'


const DetailsCard = props => {

    return (
    <div>
        {props.data.map(result => (
        <Row>
            <Col s={12} key={result._id}>
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
                                <p>Description: {details.description}</p>
                                <span className='detailBtns'>
                                    <Button floating className='green detailBtn' waves='light' icon='edit' />
                                    <Button floating className='red detailBtn' waves='light' icon='delete' />
                                </span>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
        ))}
    </div>
    );
}

export default DetailsCard;
