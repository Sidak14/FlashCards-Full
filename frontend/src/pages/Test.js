import React, {act, useState} from "react";
import TestQuestion from "../components/Cards/TestQuestion";
import TestAnswer from "../components/Cards/TestAnswer";

const allQuestions = [
    {
        question: "This is question 1",
        answer: "This is answer 1",
        id: 1,
    },
    {
        question: "This is question 2",
        answer: "This is answer 2",
        id: 2,
    },
    {
        question: "This is question 3",
        answer: "This is answer 3",
        id: 3,
    },
    {
        question: "This is question 4",
        answer: "This is answer 4",
        id: 4,
    },
    {
        question: "This is question 5",
        answer: "This is answer 5",
        id: 5,
    },
    {
        question: "This is question 6",
        answer: "This is answer 6",
        id: 6,
    },
    {
        question: "This is question 7",
        answer: "This is answer 7",
        id: 7,
    },
    {
        question: "This is question 1",
        answer: "This is answer 1",
        id: 8,
    },
    {
        question: "This is question 2",
        answer: "This is question 2",
        id: 9,
    },
    {
        question: "This is question 3",
        answer: "This is question 3",
        id: 10,
    },
    {
        question: "This is question 3",
        answer: "This is question 3",
        id: 11,
    },
    {
        question: "This is question 3",
        answer: "This is question 3",
        id: 12,
    },
    {
        question: "This is question 3",
        answer: "This is question 3",
        id: 13,
    },
    {
        question: "This is question 3",
        answer: "This is question 3",
        id: 14,
    },
    {
        question: "This is question 3",
        answer: "This is question 3",
        id: 15,
    },
    {
        question: "This is question 3",
        answer: "This is question 3",
        id: 16,
    }
]

const Test = () => {
    const [activeCard, setActiveCard] = useState(false);
    const [currentQuestion, setcurrentQuestion] = useState(allQuestions.length > 0 ? 0 : -1);

    const handleClick = () => {
        setActiveCard(!activeCard);
    }

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const getNextQuestion = async () => {
        setActiveCard(!activeCard);
        await sleep(300);
        if (currentQuestion >= (allQuestions.length - 1)) {
            setcurrentQuestion(-1);
        } else {
            setcurrentQuestion(currentQuestion + 1);
        }
        
    }

    return (
        <div>
            <div className="h-screen w-screen flex justify-center items-center max-h-[1000px]">
                {
                    currentQuestion != -1 ? (
                        <div className={`relative card ${activeCard ? 'cardFlip' : ''}`}>
                            {/* front */}
                            <div className="front">
                                <TestQuestion text={allQuestions[currentQuestion].question} title="Question" isQuestion="true" clickFunction={handleClick} />
                            </div>

                            {/* back */}
                            <div className="absolute top-0 back">
                                <TestAnswer text={allQuestions[currentQuestion].answer} title="Answer" isQuestion="false" clickFunction={handleClick} incrementQuestionFunction={getNextQuestion} />
                            </div>
                            
                        </div>
                    ) : (
                        <div className={`relative card ${activeCard ? 'cardFlip' : ''}`}>
                            {/* front */}
                            <div className="front">
                                <TestQuestion text="Well done! You're done with all the questions" title="End" isQuestion="true" clickFunction={handleClick} />
                            </div>

                            {/* back */}
                            <div className="absolute top-0 back">
                                <TestAnswer text="Well done! You're done with all the questions" title="End" isQuestion="true" clickFunction={handleClick} incrementQuetionFunction={handleClick} />
                            </div>
                            
                        </div>
                    )
                }
                
            </div>
        </div>
        
    );
};

export default Test;