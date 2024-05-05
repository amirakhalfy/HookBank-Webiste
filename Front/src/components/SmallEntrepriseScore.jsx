import React, { useState, useEffect } from "react";

const SmallEntrepriseScore = ({ user_id }) => {
    const [score, setScore] = useState(null);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        // Fetch the score for the user from the API
        const fetchScore = async () => {
            try {
                const response = await fetch(`http://localhost:5000/ScoreSmallEntreprise/${user_id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch score");
                }
                const data = await response.json();
                const userScore = data.scores[0].score; // Assuming there's only one score for the user
                setScore(userScore);
            } catch (error) {
                console.error(error);
            }
        };

        fetchScore();
    }, [user_id]);

    const calculateColor = () => {
        if (score === null) {
            return "transparent"; // Default color while loading
        }
        const normalizedScore = (score - 300) / (850 - 300);
        const red = Math.round(255 * normalizedScore);
        const green = Math.round(255 * (1 - normalizedScore));
        return `rgb(${red}, ${green}, 0)`;
    };

    const handleClick = () => {
        setShowScore(true);
    };

    return (
        <div>
            <button
                type="button"
                className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none"
                
                onClick={handleClick}
            >
                Get Your Score
            </button>
            {showScore && (
                <div className="mt-4 text-lg font-medium" style={{ color: calculateColor() }}>
                    {score === null ? "Loading..." : `Your Score: ${score}`}
                </div>
            )}
        </div>
    );
};

export default SmallEntrepriseScore;
