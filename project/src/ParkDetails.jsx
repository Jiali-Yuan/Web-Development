import React, { useState, useEffect } from 'react';
import { fetchOnePark, fetchAddComment } from './services';
import ParkPhoto from './ParkPhoto';

export default function ParkDetails({ backToParksList, clickedParkId, user }) {

    const [parkDetails, setParkDetails] = useState({});
    const [reviewList, setReviewList] = useState({});
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOnePark(clickedParkId)
            .then(park => {
                setParkDetails(park);
                setReviewList(park.comments);
            })
    }, []);

    const commentList = Object.values(reviewList).slice().reverse().map((m) => (
        <li className="review-list" key={m.commentId}>
            <span className="review-text">{m.text}</span>
            <br />
            <span className="reviewer">{m.reviewer}</span><span className="review-time">{m.timestamp}</span>
        </li>
    ));

    const postComments = () => {
        fetchAddComment(comment, clickedParkId)
            .then((newComment) => {
                const currentComments = { ...reviewList };
                currentComments[newComment.commentId] = newComment;
                setReviewList(currentComments);
                setComment("");
                setError("");
            })
            .catch((err) => {
                setError("Can't send empty comment.");
            });
    };

    return (
        <div>
            {user.isLoggedIn ?
                <div>
                    <div className="details-panel">
                        <div className="detail-back">
                            <span onClick={backToParksList}>Back</span>
                        </div>
                        <h2>{parkDetails.parkName}</h2>
                        <div className="park-info">
                            <div className="photo">
                                <ParkPhoto clickedParkId={clickedParkId} />
                            </div>
                            <div className="park-words">
                                <p className="park-introduction">{parkDetails.introduction}</p>
                                <label className="location-title">Location: </label><span className="park-location">{parkDetails.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="review-title">
                        <span>Reviews</span>
                    </div>
                    <div className="reviews">
                        {commentList}
                    </div>
                    <div>
                        <div className="review-panel">
                            <textarea className="input-review" value={comment} placeholder="Share your experience to help others."
                                onChange={(e) => setComment(e.target.value)}></textarea>
                            <span>{error}</span>
                            <br />
                            <button onClick={postComments}>Comment</button>
                        </div>
                    </div>
                </div> :
                <div>
                    <div className="details-panel">
                        <div className="detail-back">
                            <span onClick={backToParksList}>Back</span>
                        </div>
                        <h2>{parkDetails.parkName}</h2>
                        <div className="park-info">
                            <div className="photo">
                                <ParkPhoto clickedParkId={clickedParkId} />
                            </div>
                            <div className="park-words">
                                <p className="park-introduction">{parkDetails.introduction}</p>
                                <label className="location-title">Location: </label><span className="park-location">{parkDetails.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="review-title">
                        <span>Reviews</span>
                    </div>
                    <div className="reviews">
                        {commentList}
                    </div>
                </div>}
        </div >
    );
};

