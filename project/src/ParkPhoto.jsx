import React, { useState, useEffect } from 'react';

export default function ParkPhoto({ clickedParkId }) {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    useEffect(() => {
        const imageUrl = "/photo/" + clickedParkId;
        setImagePreviewUrl(imageUrl);
    }, []);

    return (
        <div>
            <img width="500" height="300" src={imagePreviewUrl} />
        </div>
    );
};
