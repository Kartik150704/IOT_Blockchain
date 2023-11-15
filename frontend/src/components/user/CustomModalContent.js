// CustomModalContent.js
import React from 'react';
import styled from 'styled-components';

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

const CustomModalContent = ({ selectedDevice, closeModal, handleSave }) => {
  if (!selectedDevice) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{selectedDevice.deviceName}</h2>
        <p><b>Device ID:</b> {selectedDevice.deviceId}</p>
        <p><b>Device Type:</b> {selectedDevice.deviceType}</p>
        <p><b>Device Manufacturer:</b> {selectedDevice.deviceManufacturer}</p>
        <p><b>Manufacturer URL:</b> {selectedDevice.manufacturerUrl}</p>
        <h3><b>Privacy Policies:</b></h3>
        <PolicyList>
          {selectedDevice.privacyPolicies.map((policy, index) => (
            <PolicyListItem key={index}>
              <strong>{policy.policyName}</strong>
              <p>{policy.policyDescription}</p>
              <AcceptButton>Accept</AcceptButton>
              <DeclineButton>Decline</DeclineButton>
            </PolicyListItem>
          ))}
        </PolicyList>
        <SaveButton onClick={() => handleSave(selectedDevice)}>Save</SaveButton>
        <CloseButton onClick={closeModal}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CustomModalContent;
