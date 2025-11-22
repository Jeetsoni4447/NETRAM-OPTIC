import React from "react";

const StarRating = ({ rating = 0 }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            // Full Star
            stars.push(
                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.285 3.95a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.285 3.95c.3.92-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.783.57-1.838-.197-1.538-1.118l1.285-3.95a1 1 0 00-.364-1.118L2.173 9.377c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.285-3.95z" />
                </svg>
            );
        } else if (rating >= i - 0.5) {
            // Half Star
            stars.push(
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id={`halfGrad${i}`}>
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.285 3.95a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.285 3.95c.3.92-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.783.57-1.838-.197-1.538-1.118l1.285-3.95a1 1 0 00-.364-1.118L2.173 9.377c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.285-3.95z"
                        fill={`url(#halfGrad${i})`}
                    />
                </svg>
            );
        } else {
            // Empty Star
            stars.push(
                <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.285 3.95a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.285 3.95c.3.92-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.783.57-1.838-.197-1.538-1.118l1.285-3.95a1 1 0 00-.364-1.118L2.173 9.377c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.285-3.95z" />
                </svg>
            );
        }
    }

    return (
        <div className="flex items-center">
            <div className="flex">{stars}</div>
            <span className="ml-2 text-sm text-gray-600 font-medium">({rating.toFixed(1)})</span>
        </div>
    );
};

export default StarRating;
