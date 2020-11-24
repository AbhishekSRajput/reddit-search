import React from 'react';
import Card from './Card';

export const CardList = (props) => {
    return (
        <div>
            {props.redditData.map((data) => {
                <Card key={data.id} redditData={data} />
            })}
        </div>);
};