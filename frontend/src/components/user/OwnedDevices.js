// OwnedDevices.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import devicedata from './deviceInfo.json'
import CustomModalContent from './CustomModalContent';
import { fetchAPI } from '../Tools/FetchAPI';
const DeviceListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  margin: 50px auto;
`;

const DeviceCard = styled.div`
  position: relative;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const UpdatePolicyButton = styled.button`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Navbar = styled.nav`
  background-color: #333;
  padding: 15px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
`;

const NavbarLogo = styled.h1`
  margin: 0;
`;

const OwnedDevices = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [publicKey, setPublicKey] = useState('')
  const [devicesData, setDevicesData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        let options = {
          user: localStorage.getItem('publickey')
        };
        
        let x = await fetchAPI('http://localhost:8000/gateway/user/getdevices', 'POST', options);
        console.log(x)
        setDevicesData(x);
      } catch (error) {
        // Handle any errors if the fetchAPI or setting state fails
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function immediately

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDeviceClick = (device) => {
    // Only set the selected device without opening the modal
    setSelectedDevice(device);
  };

  // Separate function to handle "Update Policies" button click
  const handleUpdatePoliciesClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = (device, updatedPolicies) => {
    // Retrieve existing policies from localStorage
    // console.log(updatedPolicies)
    const existingPoliciesString = localStorage.getItem('updatedPolicies');
    const existingPolicies = existingPoliciesString ? JSON.parse(existingPoliciesString) : {};

    // Assume device.deviceId is unique
    existingPolicies[device.deviceId] = updatedPolicies;

    // Save updated policies back to localStorage
    localStorage.setItem('updatedPolicies', JSON.stringify(existingPolicies));
  };


  const closeModal = () => {
    setSelectedDevice(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar>
        <NavbarLogo>Owned Devices</NavbarLogo>
      </Navbar>
      <DeviceListContainer>
        {devicesData.map((device) => (
          <DeviceCard key={device.deviceId} onClick={() => handleDeviceClick(device)}>
            <h3>{device.deviceName}</h3>
            <p>Hash: {device.deviceHash}</p>
            <UpdatePolicyButton onClick={handleUpdatePoliciesClick}>Update Policy</UpdatePolicyButton>
          </DeviceCard>
        ))}
      </DeviceListContainer>

      {isModalOpen && <CustomModalContent selectedDevice={selectedDevice} closeModal={closeModal} handleSave={handleSave} privacyPolicies={selectedDevice.privacyPolicies} />}
    </div>
  );
};

export default OwnedDevices;
