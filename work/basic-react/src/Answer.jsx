
import React from 'react';
import './answer.css';

const Answer = (props) => {
    let answers = Object.keys(props.answer)
        .map((index) => (
            <li
                className=
                {
                    props.correctAnswer === props.answer[index] ?
                        'correct' :
                        props.clickedAnswer === props.answer[index] ?
                            'incorrect' : ''
                }
                onClick={() => props.checkAnswer(index)}
                key={index}>
                {props.answer[index]}
            </li>
        ));

    return (
        <div>
            <ul disabled={props.clickedAnswer ? true : false} className="answers-panel">
                {answers}
            </ul>
            <div>
                {
                    props.correctAnswer ?
                        'Correct Answer!' :
                        props.clickedAnswer ? 'Incorrect Answer!' : ''
                }
            </div>
        </div>
    );
};

export default Answer;


