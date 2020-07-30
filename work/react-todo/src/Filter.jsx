import React from 'react';

export default function Filter({ onFilter}) {
    return (
        <div className="filter-bar">
            <label>Filter: </label>
            <select onChange={(e) => onFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="undo">Todo</option>
            </select>
        </div>
    );
};
