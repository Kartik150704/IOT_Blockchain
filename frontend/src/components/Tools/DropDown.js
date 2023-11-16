import React from 'react';
import { useNavigate } from 'react-router';
import './DropDownComponent.css'; // Import CSS file for styling

const DropdownComponent = () => {
  const navigate = useNavigate();

  // Function to handle option selection and call function based on the selected option
  const handleOptionSelection = (event) => {
    const selectedOption = event.target.value;
    navigate(selectedOption);
  };

  return (
    <div className="dropdown-container">
      <h1>Navigate To</h1>
      <select className="dropdown" onChange={handleOptionSelection}>
        <option value="" className="option">Select an option</option>
        <option value="/">General Dashboard</option>
        <option value="/admin/checkuserdata">Admin - Check</option>
        <option value="/admin/adddevice">Admin - Add Device</option>
        <option value="/login">User Login</option>
      </select>
    </div>
  );
};

export default DropdownComponent;
