// DeviceList.js
import React, { useState } from 'react';
import styled from 'styled-components';
import devicesData from './deviceInfo.json';
// import { Link } from 'react-router-dom'; // Assuming you are using React Router


const DeviceListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: center;
  max-width: 900px; /* Set a maximum width to limit the number of devices per row */
  margin: 50px auto;
`;

const DeviceCard = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CustomModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const CustomModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 70vh; /* Limit the height of the modal content */
  margin: auto;
  overflow-y: auto;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  background-color: #ddd;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
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

const NavbarLinks = styled.div`
  display: flex;
  gap: 20px;
`;

// const NavbarLink = styled(Link)`
//   text-decoration: none;
//   color: white;
//   font-weight: bold;
// `;

const DeviceList = () => {
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeviceClick = (device) => {
        setSelectedDevice(device);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedDevice(null);
        setIsModalOpen(false);
    };

    return (
        <div>

            <Navbar>
                <NavbarLogo>Device List</NavbarLogo>
                {/* <NavbarLinks> */}
                    {/* <NavbarLink to="/">Home</NavbarLink> */}
                    {/* <NavbarLink to="/about">About</NavbarLink> */}
                    {/* Home */}
                    {/* Add more links as needed */}
                {/* </NavbarLinks> */}
            </Navbar>
            <DeviceListContainer>
                {devicesData.map((device) => (
                    <DeviceCard key={device.deviceId} onClick={() => handleDeviceClick(device)}>
                        <h3>{device.deviceName}</h3>
                        <p>Hash: {device.deviceHash}</p>
                    </DeviceCard>
                ))}
            </DeviceListContainer>

            <CustomModalContainer isOpen={isModalOpen} onClick={closeModal}>
                <CustomModalContent onClick={(e) => e.stopPropagation()}>
                    {selectedDevice && (
                        <>
                            <h2>{selectedDevice.deviceName}</h2>
                            <p><b>Device ID:</b> {selectedDevice.deviceId}</p>
                            <p><b>Device Type:</b> {selectedDevice.deviceType}</p>
                            <p><b>Device Manufacturer:</b> {selectedDevice.deviceManufacturer}</p>
                            <p><b>Manufacturer URL:</b> {selectedDevice.manufacturerUrl}</p>
                            <h3><b>Privacy Policies:</b></h3>
                            <ul>
                                {selectedDevice.privacyPolicies.map((policy, index) => (
                                    <li key={index}>
                                        <strong>{policy.policyName}</strong>
                                        <p>{policy.policyDescription}</p>
                                        <ul>
                                            {policy.policyPoints.map((point, pointIndex) => (
                                                <li key={pointIndex}>{point}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                            <CloseButton onClick={closeModal}>Close</CloseButton>
                        </>
                    )}
                </CustomModalContent>
            </CustomModalContainer>
        </div>
    );
};

export default DeviceList;