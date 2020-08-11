import React, { useState } from 'react';
import { fetchAddPark, fetchAddPhoto } from './services';

export default function CreatePage({ changeParksList, offCreate }) {

    const [parkName, setParkName] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
    const [url, setUrl] = useState("");

    const postPark = () => {
        if (!parkName || !introduction || !location || !url) {
            setError("All fields are required, including park photo.");
            return;
        }
        fetchAddPark(parkName, introduction, location)
            .then((park) => {
                fetchAddPhoto(park.parkId, url)
                    .then(() => {
                        changeParksList(park);
                        offCreate();
                    })
                    .catch(() => {
                        setError("Failed to upload park photo.");
                    })
            })
            .catch((err) => {
                setError("Failed to create park.");
            });
    };

    return (
        <div className="create-page">
            <input className="input-name" value={parkName} placeholder="Input park name."
                onChange={(e) => setParkName(e.target.value)} />
            <br />
            <textarea className="input-park" value={introduction} placeholder="Input detailed information to introduce this park."
                onChange={(e) => setIntroduction(e.target.value)} />
            <br />
            <textarea className="input-park" value={location} placeholder="Input the park location"
                onChange={(e) => setLocation(e.target.value)} />
            <br />
            <input className="input-file" type="file" name="name" onChange={(e) => setUrl(e.target.files[0])} />
            <span className="create-action" onClick={postPark}>Post now</span><span className="create-action" onClick={offCreate}>Back</span>
            <p>{error}</p>
        </div>
    );
};