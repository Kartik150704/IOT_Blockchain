// CustomModalContent.js
import React, { useState } from 'react';
import styled from 'styled-components';
import ToggleButton from '../Tools/ToggleButton';
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
`;

const AcceptButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const DeclineButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const SaveButton = styled.button`
  background-color: #ddd;
  color: black;
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;

  &:hover {
    background-color: #0b7dda;
  }
`;

const CloseButton = styled.button`
  background-color: #ddd;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
`;

const PolicyList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PolicyListItem = styled.li`
  margin-bottom: 10px;
`;

const CustomModalContent = ({ selectedDevice, closeModal, handleSave, privacyPolicies }) => {
    const [updatedPolicies, setUpdatedPolicies] = useState(privacyPolicies);
  
    if (!selectedDevice) {
      return null;
    }
  
    const handleAcceptPolicy = (policyName) => {
      const updatedPolicy = {
        id: policyName,
        status: true,
        data : {
            location:"checking"
        }
      };

    //   console.log(updatedPolicy)
  
      setUpdatedPolicies((prevPolicies) =>
        prevPolicies.map((policy) =>
          policy.policyName === policyName ? updatedPolicy : policy
        )
      );
    };
  
    const handleDeclinePolicy = (policyName) => {
      const updatedPolicy = {
        id: policyName,
        status: false,
        data:
        {
            location:"checking"
        }
      };
  
        // console.log(updatedPolicy)
      setUpdatedPolicies((prevPolicies) =>
        prevPolicies.map((policy) =>
          policy.policyName === policyName ? updatedPolicy : policy
        )
      );
    };
  
    const handleToggleChange = (policyName, selectedOption) => {
      if (selectedOption === "Option A") {
        handleDeclinePolicy(policyName);
      } else if (selectedOption === "Option B") {
        handleAcceptPolicy(policyName);
      }
    };
  
    const handleSaveChanges = () => {
       
        const data = {
            "userId" : localStorage.getItem('publickey'),
            "policies" : {updatedPolicies}
        }
      console.log(data);
      handleSave(selectedDevice, updatedPolicies);
      // closeModal();
    };
  
    return (
      <ModalOverlay>
        <ModalContent>
          {/* ... (existing content) */}
          <h3><b>Privacy Policies:</b></h3>
          <PolicyList>
            {selectedDevice.privacyPolicies.map((policy, index) => (
              <PolicyListItem key={index}>
                <strong>{policy.policyName}</strong>
                <p>{policy.policyDescription}</p>
                <ToggleButton
                  option1="Option A"
                  option2="Option B"
                  onOptionChange={(selectedOption) => handleToggleChange(policy.policyName, selectedOption)}
                />
              </PolicyListItem>
            ))}
          </PolicyList>
          <SaveButton onClick={handleSaveChanges}>Save</SaveButton>
          <CloseButton onClick={closeModal}>Close</CloseButton>
        </ModalContent>
      </ModalOverlay>
    );
  };
  
  export default CustomModalContent;