import React, { useState, useEffect } from 'react';
import { fetchParks } from './services';
import ParkDetails from './ParkDetails';
import CreatePage from './CreatePage';

export default function ParksList({ onBack, user }) {

    const [parksList, setParksList] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const [clickedParkId, setClickedParkId] = useState("");
    const [create, setCreate] = useState(false);

    useEffect(() => {
        fetchParks()
            .then(parks => {
                setParksList(parks);
            })
    }, []);

    const onShowDetails = (id) => {
        setShowDetails(true);
        setClickedParkId(id);
    };

    const backToParksList = () => {
        setShowDetails(false);
    };

    const showParksList = Object.values(parksList).map((m) => (
        <li className="parks-list" key={m.parkId}>
            <span className="park-name" onClick={() => onShowDetails(m.parkId)}>{m.parkName}</span>
            <br />
            <span className="poster"> Post by {m.author}</span><span className="post-time"> {m.timestamp}</span>
        </li>
    ));

    const changeParksList = (park) => {
        const currentList = { ...parksList };
        currentList[park.parkId] = park;
        setParksList(currentList);
    };

    const onCreate = () => {
        setCreate(true);
    };

    const offCreate = () => {
        setCreate(false);
    };

    return (
        <div className="list-page">
            {user.isLoggedIn && create ?
                <CreatePage offCreate={offCreate}
                    changeParksList={changeParksList} /> : showDetails ?
                    <ParkDetails backToParksList={backToParksList}
                        clickedParkId={clickedParkId}
                        showDetails={showDetails}
                        user={user}
                        changeParksList={changeParksList} /> : user.isLoggedIn ?
                        <div className="parks-panel">
                            <div className="home-button">
                                <span onClick={onBack}>Home</span>
                            </div>
                            <div className="create-button">
                                <span onClick={onCreate}>Create</span>
                            </div>
                            <div className="list-head">
                                <h1>Parks</h1>
                            </div>
                            <div className="list-panel">
                                {showParksList}
                            </div>
                        </div> : <div className="parks-panel">
                            <div className="home-button">
                                <span onClick={onBack}>Home</span>
                            </div>
                            <div className="list-head">
                                <h1>Parks</h1>
                            </div>
                            <div className="list-panel">
                                {showParksList}
                            </div>
                        </div>
            }
        </div>
    );
};