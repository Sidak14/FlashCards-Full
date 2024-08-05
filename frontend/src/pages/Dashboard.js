import React from "react";
import Card1 from "../components/Cards/Card1";

const Dashboard = () => {
    return (
        <div className="h-screen max-h-[1000px] flex flex-col justify-center">
            <div className="min-h-60 w-screen flex flex-row justify-center gap-64">
                <Card1 title="Jump straight in" text="Test your knowledge with your flashcards" link="Click Here" location="/test" />
                <Card1 title="Edit your Questions" text="Make your own flashcards and test your knowledge" link="Click Here" location="/questions" />
            </div>
        </div>
    )
}

export default Dashboard;