import React from 'react';
import './switchComponent.css';
const Switch = ({ isItOn, handleToggle }) => {
  return (
    <>
      <input
        checked={isItOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isItOn && '#06D6A0' }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
        >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;