import React from "react";

const Card2 = (props) => {
    return (
        <div>
            <a class="flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg focus:outline-none focus:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 max-w-[700px]" href="#">
                <img class={`w-full h-auto rounded-t-xl ${props.isQuestion == "false" ? 'yRotate' : ''}`} src="https://www.parliament.nsw.gov.au/la/houseprocedures/PublishingImages/Pages/Question-Time/Time%20for%20questions%20clock%20-%20shutterstock%20-%20110884730.jpg" alt="Card Image" />
                <div class="p-4 md:p-5">
                    <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                        {props.title}
                    </h3>
                    <p class="mt-1 text-gray-500 dark:text-neutral-400">
                        {props.text}
                    </p>
                </div>
                <div className="flex flex-row justify-center gap-x-10 bg-slate-400 min-h-10">
                    <svg class="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m3 15 4 6 12-12"></path>
                    </svg>

                    <svg class="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m4 4 12 12 m16 4 12-12"></path>
                    </svg>
                </div>
            </a>
        </div>
    );
};

export default Card2;