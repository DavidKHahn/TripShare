import React from "react";
import "./DetailsCard.css";
import { Collection, CollectionItem, Button } from 'react-materialize'


const DetailsCard = props => {

    return (
    <div className='detailCard'>
        {props.data.map(result => (
        <Collection key={result._id}>
            <CollectionItem>
                <h5>
                    <span id='placeTitle'>
                        {result.location}
                    </span>
                </h5>
            </CollectionItem>
            {result.details.map(details => (
            <CollectionItem key={details._id}>
                <p>Name: {details.name}</p>
                <p>Description: {details.description}</p>
                <span className='detailBtns'>
                    <Button floating className='green detailBtn' waves='light' icon='edit' />
                    <Button floating className='red detailBtn' waves='light' icon='delete' />
                </span>
            </CollectionItem>
            ))}
        </Collection>
        ))}
    </div>
    );
}

export default DetailsCard;
