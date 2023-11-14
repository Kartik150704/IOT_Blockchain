// DeviceForm.js

import React, { useState } from 'react';
import {
  FormContainer,
  FormLabel,
  FormInput,
  FormButton,
  PolicyContainer,
  AddPolicyPointButton,
  SubmitButton,
  PolicyPointContainer,
  PolicyPointLabel,
  PolicyPointInput,
  PolicyPointButton,
  PolicyNumber,
  PolicyContent,
  PolicyHeader,
  PolicyDescription,
} from './styles'; // Import the styled components

const DeviceForm = () => {
    // State to manage device information
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: '',
    deviceName: '',
    deviceType: '',
    deviceManufacturer: '',
    manufacturerUrl: '',
    policies: [],
  });

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // Handler to add a new policy
  const handleAddPolicy = () => {
    setDeviceInfo((prevInfo) => ({
      ...prevInfo,
      policies: [
        ...prevInfo.policies,
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
      policies: prevInfo.policies.map((policy, i) =>
        i === index ? { ...policy, [key]: value } : policy
      ),
    }));
  };

  // Handler to add a new policy point
  const handleAddPolicyPoint = (index) => {
    setDeviceInfo((prevInfo) => ({
      ...prevInfo,
      policies: prevInfo.policies.map((policy, i) =>
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
      policies: prevInfo.policies.map((policy, i) =>
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission of the form data
    console.log(deviceInfo);
  };

  return (
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
      {/* Other device info inputs go here */}
      <FormButton type="button" onClick={handleAddPolicy}>
        Add Policy
      </FormButton>
      {deviceInfo.policies.map((policy, index) => (
        <PolicyContainer key={index}>
          <PolicyNumber>{index + 1}.</PolicyNumber>
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
          <AddPolicyPointButton
            type="button"
            onClick={() => handleAddPolicyPoint(index)}
          >
            Add Policy Point
          </AddPolicyPointButton>
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
      <SubmitButton type="submit">Submit</SubmitButton>
    </FormContainer>
  );
};

export default DeviceForm;
