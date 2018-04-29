import React from "react";
import "./DetailsCard.css";
import { Collection, CollectionItem, Button } from 'react-materialize'


const DetailsCard = props => {

    return (
    <div className='detailCard'>
        {props.data.map(result => (
        <Collection>
            <CollectionItem>
                <h5>
                    <span id='placeTitle'>
                        {result.location}
                    </span>
                </h5>
            </CollectionItem>
            {result.details.map(details => (
            <CollectionItem>
                <p>Name: {details.name}</p>
                <p>Description: {details.description}</p>
                <span className='detailBtns'>
                    <Button floating small className='green detailBtn' waves='light' icon='edit' />
                    <Button floating small className='red detailBtn' waves='light' icon='delete' />
                </span>
            </CollectionItem>
            ))}
        </Collection>
        ))}
    </div>
    );
}

export default DetailsCard;
