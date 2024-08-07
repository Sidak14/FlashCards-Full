import React, { useContext, useEffect, useState } from "react";
import QuestionCard from "../components/Cards/QuestionCards";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { sendDelete, sendGet, sendPost, sendPut } from "../context/backendCommunication";
import AddQuestionCard from "../components/Cards/addQuestionCard";

const allQuestions = [
    {
        question: "This is question 1",
        answer: "This is answer 1",
        id: 1,
    },
    {
        question: "This is question 2",
        answer: "This is question 2",
        id: 2,
    },
    {
        question: "This is question 3",
        answer: "This is question 3",
        id: 3,
    },
    {
        question: "This is question 4",
        answer: "This is question 4",
        id: 4,
    },
    {
        question: "This is question 5",
        answer: "This is question 5",
        id: 5,
    },
    {
        question: "This is question 6",
        answer: "This is question 6",
        id: 6,
    },
    {
        question: "This is question 7",
        answer: "This is question 7",
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


const Questions = () => {
    const { currentUser } = useContext(AuthContext);
    let navigate = useNavigate();
    if (!currentUser) {
        console.log("cant be here");
        navigate('/');
    }

    const [allQuestions, setAllQuestions] = useState([]);
    const [updateQuestions, setUpdateQuestions] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await sendGet(`/questions/getquestions/${currentUser.id}`);
                const resJson = await res.json();
                console.log(resJson);
                setAllQuestions(resJson);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [updateQuestions]);

    const deleteQuestion = async (id) => {
        const res = await sendDelete(`/questions/deletequestion/${currentUser.id}/${id}`);
        console.log(await res.json());
        setUpdateQuestions(updateQuestions+1);
    }

    const updateQuestion = async (id, inputs) => {
        console.log(inputs);
        const res = await sendPut(`/questions/updatequestion/${currentUser.id}/${id}`, inputs);
        console.log(await res.json());
        setUpdateQuestions(updateQuestion+1);
    }

    const addQuestion = async (inputs) => {
        const res = await sendPost(`/questions/addquestion/${currentUser.id}`, inputs);
        setUpdateQuestions(updateQuestions+1);
    }
    

    return (
        <div className="w-screen">
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        
                <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Your Flashcards</h2>
                    <p className="mt-1 text-gray-600 dark:text-neutral-400">Add, remove or edit questions</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allQuestions.map((item) => (
                        <QuestionCard question={item.question} answer={item.answer} key={item.id} id={item.id} updateFunction={updateQuestion} deleteFunction={deleteQuestion} minWidth="96" />
                    ))}

                    <AddQuestionCard question="Want to add more Questions?" answer="Click below" addFunction={addQuestion} minWidth="96" />
                </div>
            </div>
        </div>
        
        
    );
};

export default Questions;