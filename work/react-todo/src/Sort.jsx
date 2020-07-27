import React from 'react';

export default function Sort({onSort}) {
    return (
        <div className="sort-bar">
            <label>Sort: </label>
            <select onChange={(e) => onSort(e.target.value)}>
                <option value="default">Default</option>
                <option value="up">By name ascending</option>
                <option value="down">By name descending</option>
                <option value="byUndo">By todo</option>
                <option value="byDone">By completed</option>
            </select>
        </div>
    );
};
