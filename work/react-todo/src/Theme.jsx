import React from 'react';

export default function Theme({updateTheme}) {
    return (
        <div className="theme-bar">
            <label>Theme: </label>
            <select onChange={(e) => updateTheme(e.target.value)}>
                <option value="Default">Default</option>
                <option value="Dark">Dark</option>
                <option value="Light">Light</option>
                <option value="Colorful">Colorful</option>
            </select>
        </div>
    );
};
