import React from 'react';

export default function Body({onExplore}) {

    return (
        <div className="body">
            <h1 onClick={onExplore}>Explore Parks in Seattle</h1>
        </div>
    );
};
