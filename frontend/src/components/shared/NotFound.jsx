import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="relative h-screen bg-gray-100">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h1 className="text-[#6A38C2] text-6xl font-bold">404</h1>
                <p className="text-gray-600 text-xl mt-2">Oops! The page you are looking for doesn't exist.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 px-6 py-3 bg-[#6A38C2] text-white rounded-lg shadow-md hover:bg-[#502891] transition"
                >
                    Go Back
                </button>
            </div>
        </div>
    )
}

export default NotFound