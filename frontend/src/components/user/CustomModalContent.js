// CustomModalContent.js
import React, { useState , useEffect} from 'react';
import styled from 'styled-components';
import ToggleButton from '../Tools/ToggleButton';
import { fetchAPI } from '../Tools/FetchAPI';
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


const CustomInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const CustomModalContent = ({ selectedDevice, closeModal, handleSave, privacyPolicies }) => {
    const [updatedPolicies, setUpdatedPolicies] = useState(privacyPolicies);
    const [inputDataByPolicy, setInputDataByPolicy] = useState([]);
    const [acceptedPolicies, setAcceptedPolicies] = useState([]);

    const [userData, setuserData] = useState({
        userId: localStorage.getItem('publickey'),
        policies: [

        ]
    })

    useEffect(() => {
        let data = inputDataByPolicy
        privacyPolicies.map((policy) => {
            data = [...data, {"policyName" : policy.policyName, value : ""}]
        })
        setInputDataByPolicy(data)
        
    }, [])


    if (!selectedDevice) {
        return null;
    }

    

    const handleAcceptPolicy = (policyName) => {

        setAcceptedPolicies([...acceptedPolicies, policyName]);

        // const updatedPolicy = {
        //     id: policyName,
        //     status: true,
        //     data: {
        //         location: "checking"
        //     }
        // };
        // const updatedUserData = { ...userData };
        // const policyIndex = updatedUserData.policies.findIndex(
        //     (policy) => policy.id === updatedPolicy.id
        // );
        // if (policyIndex !== -1) {

        //     updatedUserData.policies[policyIndex] = updatedPolicy;
        // } else {

        //     updatedUserData.policies.push(updatedPolicy);
        // }


    };

    const handleDeclinePolicy = (policyName) => {

        setAcceptedPolicies(acceptedPolicies.filter((policy) => policy !== policyName));
        // const updatedPolicy = {
        //     id: policyName,
        //     status: false,
        //     data:
        //     {
        //         location: "checking"
        //     }
        // };

        // // console.log(updatedPolicy)
        // const updatedUserData = { ...userData };
        // const policyIndex = updatedUserData.policies.findIndex(
        //     (policy) => policy.id === updatedPolicy.id
        // );
        // if (policyIndex !== -1) {

        //     updatedUserData.policies[policyIndex] = updatedPolicy;
        // } else {

        //     updatedUserData.policies.push(updatedPolicy);
        // }
    };

    const handleToggleChange = (policyName, selectedOption) => {

        console.log(userData)
        if (selectedOption === "Declined") {
            handleDeclinePolicy(policyName);
        } else if (selectedOption === "Accepted") {
            handleAcceptPolicy(policyName);
        }
    };

    const handleSaveChanges = async () => {

        console.log("INPUT DATA : ",inputDataByPolicy)
        console.log("ACCEPTED : ", acceptedPolicies)
        // console.log("ACCEPTED : ". acceptedPolicies.includes("Policy 1"))
        // console.log("LENGTH ", inputDataByPolicy.length)
        const updatedUserData = {
            userId: localStorage.getItem('publickey'),
            policies: [
    
            ]
        }

        
        inputDataByPolicy.map((policy) => {
            const updatedPolicy = {
                id: policy.policyName,
                status: acceptedPolicies.length !== 0 && acceptedPolicies.includes(policy.policyName) === true ? true : false,
                data:
                {
                    VALUE : policy.value 
                }
            };

            // console.log(updatedPolicy)
            updatedUserData.policies.push(updatedPolicy)
        })
        
        console.log("USER DATA : ", updatedUserData)

        // handleSave(selectedDevice, );
        let response = await fetchAPI('http://localhost:8000/gateway/saveuserdata', "POST", updatedUserData)
        console.log(response)
    };

    return (
        <ModalOverlay>
            <ModalContent>
                {/* ... (existing content) */}
                <h3><b>Privacy Policies:</b></h3>
                <PolicyList>
                    {selectedDevice.privacyPolicies.map((policy, index) => (
                        <PolicyListItem key={index}>
                            <li key={index}>
                                <strong>{policy.policyName}</strong>
                                <p>{policy.policyDescription}</p>
                                <ul>
                                    {policy.policyPoints.map((point, pointIndex) => (
                                        <li key={pointIndex}>{point.header}</li>
                                    ))}
                                </ul>
                            </li>

                            <ToggleButton
                                option1="Declined"
                                option2="Accepted"
                                onOptionChange={(selectedOption) => handleToggleChange(policy.policyName, selectedOption)}
                            />

                            <div>
                                <label htmlFor={`userDataInput_${policy.policyName}`}>Enter Data:</label>
                                <CustomInput
                                    type="text"
                                    id={`userDataInput_${policy.policyName}`}
                                    value={
                                        inputDataByPolicy.find((data) => data.policyName === policy.policyName)?.value || ''
                                    }
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setInputDataByPolicy((prevInputData) => {
                                            const existingDataIndex = prevInputData.findIndex((data) => data.policyName === policy.policyName);
                                            if (existingDataIndex !== -1) {
                                                // Update existing data
                                                const updatedData = [...prevInputData];
                                                updatedData[existingDataIndex] = { policyName: policy.policyName, value: newValue };
                                                return updatedData;
                                            } else {
                                                // Add new data
                                                return [...prevInputData, { policyName: policy.policyName, value: newValue }];
                                            }
                                        });
                                        console.log(inputDataByPolicy.length)
                                    }}
                                />
                            </div>
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