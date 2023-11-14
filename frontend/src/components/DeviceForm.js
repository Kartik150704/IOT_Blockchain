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
} from './styles'; // Import the styled components


// Functional component DeviceForm
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

    // Return the JSX structure
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
            <FormLabel>
                Device Name:
                <FormInput
                    type="text"
                    name="Device Name"
                    value={deviceInfo.deviceName}
                    onChange={handleInputChange}
                />
            </FormLabel>
            <FormLabel>
                Device Type:
                <FormInput
                    type="text"
                    name="device Type"
                    value={deviceInfo.deviceType}
                    onChange={handleInputChange}
                />
            </FormLabel>
            <FormLabel>
                Device ID:
                <FormInput
                    type="text"
                    name="Device Manufacturer"
                    value={deviceInfo.deviceManufacturer}
                    onChange={handleInputChange}
                />
            </FormLabel>
            <FormLabel>
                Device ID:
                <FormInput
                    type="text"
                    name="Manufacturer URL"
                    value={deviceInfo.manufacturerUrl}
                    onChange={handleInputChange}
                />
            </FormLabel>
            {/* Other device info inputs go here */}
            <FormButton type="button" onClick={handleAddPolicy}>
                Add Policy
            </FormButton>
            {deviceInfo.policies.map((policy, index) => (
                <PolicyContainer key={index}>
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
                    <AddPolicyPointButton
                        type="button"
                        onClick={() => handleAddPolicyPoint(index)}
                    >
                        Add Policy Point
                    </AddPolicyPointButton>
                    {policy.policyPoints.map((point, pointIndex) => (
                        <PolicyPointContainer key={pointIndex}>
                            <FormLabel>
                                Policy Point Header:
                                <FormInput
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
                            </FormLabel>
                            <FormLabel>
                                Policy Point Description:
                                <FormInput
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
                            </FormLabel>
                        </PolicyPointContainer>
                    ))}
                </PolicyContainer>
            ))}
            <SubmitButton type="submit">Submit</SubmitButton>
        </FormContainer>
    );
};

// Export the component
export default DeviceForm;
