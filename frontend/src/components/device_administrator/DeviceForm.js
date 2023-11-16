// DeviceForm.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DropdownComponent from '../Tools/DropDown';
import {
    FormContainer,
    FormLabel,
    FormInput,
    FormButton,
    PolicyContainer,
    OuterPolicyContent,
    AddPolicyPointButton,
    SubmitButton,
    PolicyPointContainer,
    PolicyPointLabel,
    PolicyPointInput,
    OuterPolicyPointButton,
    PolicyPointButton,
    PolicyNumber,
    PolicyContent,
    PolicyHeader,
    PolicyDescription,
    CustomModal,
    ModalButton,
    Overlay
} from './styles'; // Import the styled components

import Modal from 'react-modal';

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

const DeviceForm = () => {
    // State to manage device information
    const [deviceInfo, setDeviceInfo] = useState({
        deviceId: '',
        deviceName: '',
        deviceType: '',
        deviceManufacturer: '',
        manufacturerUrl: '',
        privacyPolicies: [],
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Handler for input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeviceInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    // Handler to add a new policy
    const handleAddPolicy = () => {
        setDeviceInfo((prevInfo) => ({
            ...prevInfo,
            privacyPolicies: [
                ...prevInfo.privacyPolicies,
                {
                    policyName: '',
                    policyDescription: '',
                    policyPoints: [{ header: '', description: '' }],
                },
            ],
        }));
    };

    // Handler for policy changes
    const handlePolicyChange = (index, key, value) => {
        setDeviceInfo((prevInfo) => ({
            ...prevInfo,
            privacyPolicies: prevInfo.privacyPolicies.map((policy, i) =>
                i === index ? { ...policy, [key]: value } : policy
            ),
        }));
    };

    // Handler to add a new policy point
    const handleAddPolicyPoint = (index) => {
        setDeviceInfo((prevInfo) => ({
            ...prevInfo,
            privacyPolicies: prevInfo.privacyPolicies.map((policy, i) =>
                i === index
                    ? {
                        ...policy,
                        policyPoints: [
                            ...policy.policyPoints,
                            { header: '', description: '' },
                        ],
                    }
                    : policy
            ),
        }));
    };

    // Handler for policy point changes
    const handlePolicyPointChange = (policyIndex, pointIndex, key, value) => {
        setDeviceInfo((prevInfo) => ({
            ...prevInfo,
            privacyPolicies: prevInfo.privacyPolicies.map((policy, i) =>
                i === policyIndex
                    ? {
                        ...policy,
                        policyPoints: policy.policyPoints.map((point, j) =>
                            j === pointIndex ? { ...point, [key]: value } : point
                        ),
                    }
                    : policy
            ),
        }));
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send the form data to the backend endpoint using fetch
            const response = await fetch('http://localhost:8000/administrator/savedevice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deviceHash:deviceInfo.deviceId,
                    deviceInfo:deviceInfo
                }),
            });

            // Parse the JSON response from the backend
            const responseData = await response.json();

            let details=JSON.stringify(responseData.details)
            if (responseData.ok) {
                
                setModalMessage(`Device Information has been saved successfully

                `);
            } else {
                // Set modal message for error
                setModalMessage(`Error while adding info to smart contract: ${responseData.message}`);
            }

            // Open the modal
            setModalIsOpen(true);

        } catch (error) {
            // Handle any errors that occurred during the request
            console.error('Error sending data to the backend:', error);
            // Set modal message for a generic error
            setModalMessage('Error while processing the request. Please try again.');

            // Open the modal
            setModalIsOpen(true);
        }
    };

    // Handler to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
        // Clear the modal message
        setModalMessage('');
    };

    return (
        <>
            <Navbar>
                <NavbarLogo>Device List</NavbarLogo>
            <DropdownComponent/>
                {/* <NavbarLinks> */}
                {/* <NavbarLink to="/">Home</NavbarLink> */}
                {/* <NavbarLink to="/about">About</NavbarLink> */}
                {/* Home */}
                {/* Add more links as needed */}
                {/* </NavbarLinks> */}
            </Navbar>
            <FormContainer onSubmit={handleSubmit}>
                <FormLabel>
                    Device ID:
                    <FormInput
                        type="text"
                        name="deviceId"
                        value={deviceInfo.deviceId}
                        onChange={handleInputChange}
                    />
                </FormLabel>
                <FormLabel>
                    Device Name:
                    <FormInput
                        type="text"
                        name="deviceName"
                        value={deviceInfo.deviceName}
                        onChange={handleInputChange}
                    />
                </FormLabel>
                <FormLabel>
                    Device Type:
                    <FormInput
                        type="text"
                        name="deviceType"
                        value={deviceInfo.deviceType}
                        onChange={handleInputChange}
                    />
                </FormLabel>
                <FormLabel>
                    Device Manufacturer:
                    <FormInput
                        type="text"
                        name="deviceManufacturer"
                        value={deviceInfo.deviceManufacturer}
                        onChange={handleInputChange}
                    />
                </FormLabel>
                <FormLabel>
                    Manufacturer URL:
                    <FormInput
                        type="text"
                        name="manufacturerUrl"
                        value={deviceInfo.manufacturerUrl}
                        onChange={handleInputChange}
                    />
                </FormLabel>
                {/* Other device info inputs go here */}
                <FormButton type="button" onClick={handleAddPolicy}>
                    Add Policy
                </FormButton>
                {deviceInfo.privacyPolicies.map((policy, index) => (
                    <PolicyContainer key={index}>
                        {/* <PolicyNumber>{index + 1}.</PolicyNumber> */}
                        <OuterPolicyContent>
                            <PolicyContent>
                                <FormLabel>
                                    Policy Name:
                                    <FormInput
                                        type="text"
                                        value={policy.policyName}
                                        onChange={(e) =>
                                            handlePolicyChange(index, 'policyName', e.target.value)
                                        }
                                    />
                                </FormLabel>
                                <FormLabel>
                                    Policy Description:
                                    <FormInput
                                        type="text"
                                        value={policy.policyDescription}
                                        onChange={(e) =>
                                            handlePolicyChange(index, 'policyDescription', e.target.value)
                                        }
                                    />
                                </FormLabel>
                            </PolicyContent>
                            <OuterPolicyPointButton>
                            <AddPolicyPointButton
                                type="button"
                                onClick={() => handleAddPolicyPoint(index)}
                            >
                                Add Policy Point
                            </AddPolicyPointButton>
                            </OuterPolicyPointButton>
                        </OuterPolicyContent>
                        {policy.policyPoints.map((point, pointIndex) => (
                            <PolicyPointContainer key={pointIndex}>
                                <PolicyPointLabel>
                                    Policy Point Header:
                                    <PolicyPointInput
                                        type="text"
                                        value={point.header}
                                        onChange={(e) =>
                                            handlePolicyPointChange(
                                                index,
                                                pointIndex,
                                                'header',
                                                e.target.value
                                            )
                                        }
                                    />
                                </PolicyPointLabel>
                                {/* <PolicyPointLabel>
                Policy Point Description:
                <PolicyPointInput
                  type="text"
                  value={point.description}
                  onChange={(e) =>
                    handlePolicyPointChange(
                      index,
                      pointIndex,
                      'description',
                      e.target.value
                    )
                  }
                />
              </PolicyPointLabel> */}
                            </PolicyPointContainer>
                        ))}
                    </PolicyContainer>
                ))}

                {/* The Modal */}
                {modalIsOpen && (
                    <Overlay>
                        <CustomModal>
                            {/* Display the modal message */}
                            <p>{modalMessage}</p>
                            <ModalButton onClick={closeModal}>Close</ModalButton>
                        </CustomModal>
                    </Overlay>
                )}
                <SubmitButton type="submit">Submit</SubmitButton>
            </FormContainer>
        </>

    );
};

export default DeviceForm;