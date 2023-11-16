import React, { useState } from 'react';
import './ToggleButton.css'; // Import CSS for styling (can be customized)

const ToggleButton = ({ option1, option2, onOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState(option1);

  const toggleOption = () => {
    const newOption = selectedOption === option1 ? option2 : option1;
    setSelectedOption(newOption);
    onOptionChange(newOption);
  };

  return (
    <div className="toggle-container">
      <div className="cylinder" onClick={toggleOption}>
        <div className={`ball ${selectedOption === option2 ? 'right' : 'left'}`}></div>
      </div>
      <div className="options">
        <span className={`option ${selectedOption === option1 ? 'active' : ''}`}>{option1}</span>
        <span className={`option ${selectedOption === option2 ? 'active' : ''}`}>{option2}</span>
      </div>
    </div>
  );
};

export default ToggleButton;
