import React, { useState } from "react";

const AddQuestionCard = (props) => {
    const [editting, setEditting] = useState(false);
    const [info, setInfo] = useState({
        question: props.question,
        answer: props.answer
    })

    const getQuestionAnswer = async () => {
        let question = await document.getElementById("question").textContent;
        let answer = await document.getElementById("answer").textContent;
    
        question = question.replace(/^(Question\:)/, "").replace(/^(\s)/, "");
        answer = answer.replace(/^(Answer\:)/, "").replace(/^(\s)/, "");
    
        return {
            question: question,
            answer: answer
        }
    }

    const handleChange = async (e) => {
        const input = await getQuestionAnswer();
        console.log(input);
        setEditting(false);
        props.addFunction(input);
        setInfo(input);
    }

    return (
        <div class={`max-w-xs flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:border-t-blue-500 dark:shadow-neutral-700/70 min-w-${props.minWidth}`}>
            <div class="p-4 md:p-5">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                Question
                </h3>
                {
                    editting ? (
                        <div>
                            <p id="question" class="mt-2 text-gray-500 dark:text-neutral-400" contentEditable='true'>
                                Question: Type your question here.
                            </p>
                            <p id="answer" class="mt-2 text-gray-500 dark:text-neutral-400" contentEditable='true'>
                                Answer: Type your answer here.
                            </p>
                            <a class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600" href="#" onClick={handleChange}>
                            Add
                                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </a>
                        </div>
                    ) : (
                        <div>
                            <p class="mt-2 text-gray-500 dark:text-neutral-400">
                                {`Question: ${props.question}`}
                            </p>
                            <p class="mt-2 text-gray-500 dark:text-neutral-400">
                                {`Answer: ${props.answer}`}
                            </p>
                            <a class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600" href="#" onClick={() => {setEditting(true);}}>
                            Add Question
                                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </a>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AddQuestionCard;