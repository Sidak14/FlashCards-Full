import React from "react";

const TestQuestion = (props) => {
    return (
        <div className="relative">
            <a class="divide-y divide-gray-200 dark:divide-neutral-700 flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg focus:outline-none focus:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 max-w-[700px]" href="#" onClick={props.clickFunction}>
                <div>
                    <img class={`w-full h-auto rounded-t-xl ${props.isQuestion == "false" ? 'yRotate' : ''}`} src="https://www.parliament.nsw.gov.au/la/houseprocedures/PublishingImages/Pages/Question-Time/Time%20for%20questions%20clock%20-%20shutterstock%20-%20110884730.jpg" alt="Card Image" />
                    <div class="p-4 md:p-5">
                        <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                            {props.title}
                        </h3>
                        <p class="mt-1 text-gray-500 dark:text-neutral-400">
                            {props.text}
                        </p>
                    </div>
                </div>
                
                <div className="min-h-[70px]"></div>
            </a>
            <div className="flex flex-row justify-center gap-x-52 min-h-[38px] absolute bottom-2 left-[80px]">
                <button type="button" class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Correct" disabled="true">
                    <svg class="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m3 10 4 6 12-12"></path>
                    </svg>
                    <span class="sr-only">Previous</span>
                </button>

                <button type="button" class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Wrong" disabled="true">
                    <svg class="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m4 4 12 12 -6-6 -6 6 12-12"></path>
                    </svg>
                    <span class="sr-only">Previous</span>
                </button>
            </div>
        </div>
    );
};

export default TestQuestion;