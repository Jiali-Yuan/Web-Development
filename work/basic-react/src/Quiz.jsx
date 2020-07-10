import React, { useState } from 'react';
import Question from './Question';
import Answer from './Answer';
import './quiz.css';
import { quizs, shuffle } from './quizs';

export default function Quiz() {

    const [score, setScore] = useState(0);
    const [step, setStep] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [clickedAnswer, setClickedAnswer] = useState(0);

    const checkAnswer = (index) => {
        if (quizs[step].options[index] === quizs[step].answer) {
            setScore(score + 1);
            setCorrectAnswer(quizs[step].answer);
            setClickedAnswer(quizs[step].options[index]);
        } else {
            setCorrectAnswer(0);
            setClickedAnswer(quizs[step].options[index]);
        }
    };

    const nextStep = (step) => {
        setStep(step + 1);
        setCorrectAnswer(0);
        setClickedAnswer(0);
    };

    const resetPlay = () => {
        setScore(0);
        setStep(0);
        setCorrectAnswer(0);
        setClickedAnswer(0);
        shuffle(quizs);
    };

    return (
        <div className="quiz-panel">
            {step + 1 <= quizs.length ?
                (<div>
                    <span className="turns-bar">Turns count: {step + 1}</span>
                    <span className="scores-bar">Scores count: {score}</span>
                    <Question
                        question={quizs[step].question}
                    />
                    <Answer
                        answer={quizs[step].options}
                        step={step}
                        checkAnswer={checkAnswer}
                        correctAnswer={correctAnswer}
                        clickedAnswer={clickedAnswer}
                    />
                    <button
                        className="next-step"
                        disabled={
                            clickedAnswer && quizs.length >= step + 1
                                ? false : true
                        }
                        onClick={() => nextStep(step)}>NEXT</button>
                </div>) : (
                    <div className="final-page">
                        <h1>You are done!</h1>
                        <p>Your score is: {score} of {quizs.length}</p>
                        <button
                            className="play-again"
                            onClick={() => resetPlay()}>PLAY AGAIN</button>
                    </div>
                )
            }
        </div>
    );
};





