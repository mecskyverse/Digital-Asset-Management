import React from 'react';

const LightButton = ({ text, onClick }) => {
    return (
        <button
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 w-32 hover:from-purple-600 hover:to-pink-500"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default LightButton;
