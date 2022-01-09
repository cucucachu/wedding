import React from 'react';

export function Checkbox(props) {
    const { checked } = props;

    return (
        <svg
            className={`checkbox ${checked ? "checkbox--active" : ""}`}
            aria-hidden="true"
            viewBox="0 0 15 11"
            fill="none"
        >
            <path
                d="M1 4.5L5 9L14 1"
                strokeWidth="2"
                stroke={checked ? "#fff" : "none"} 
            />
        </svg>
    )
}