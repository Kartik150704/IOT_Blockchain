import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchAPI } from '../Tools/FetchAPI';
import DropdownComponent from '../Tools/DropDown';
const FormContainer = styled.form`
    max-width: 400px;
    margin: 0 auto;
    padding: 50px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 100px;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        background-color: #4caf50;
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 20px;
    }
`;

const SubmitButton = styled.button`
    background-color: #3498db;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2980b9;
    }
`;



const PolicyForm = () => {
    const [userIdFile, setUserIdFile] = useState(null);
    const [policiesId, setpoliciesId] = useState(['']); // Initial policyId input
    const [formData, setFormData] = useState({
        userId: '',
        policiesId: [''],
    });
    const [userData, setUserData] = useState([])

    const handleUserIdChange = async (event) => {
        const file = event.target.files[0];
        setUserIdFile(file);
        let data = await readFileAsText(file)

        // setFormData({...formData,userId:data})
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            readPublicKey(file);
        }
    };

    const readPublicKey = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const uploadedKey = e.target.result;
            setFormData({ ...formData, userId: uploadedKey })
        };

        reader.readAsText(file);
    };



    const handlePolicyIdChange = (index, event) => {
        const newpoliciesId = [...policiesId];
        newpoliciesId[index] = event.target.value;
        setpoliciesId(newpoliciesId);

        // Update formData
        setFormData({
            ...formData,
            policiesId: newpoliciesId,
        });
    };

    const addPolicyIdInput = () => {
        setpoliciesId([...policiesId, '']); // Add an empty input for a new policyId
    };

    function readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const text = event.target.result;
                resolve(text);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            if (file) {
                reader.readAsText(file);
            } else {
                reject(new Error('Invalid file'));
            }
        });
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        
        let response = await fetchAPI('http://localhost:8000/gateway/checkuserdata', "POST", formData)
        
        setUserData(response.data)

    };

    return (
        <>
        <DropdownComponent/>
        <FormContainer onSubmit={handleSubmit}>
            <FormGroup>
                <label htmlFor="userId">User ID:</label>
                <input type="file" id="userId" onChange={handleFileChange} />
            </FormGroup>
            <FormGroup>
                <label>Policy IDs:</label>
                {policiesId.map((policyId, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={policyId}
                            onChange={(event) => handlePolicyIdChange(index, event)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addPolicyIdInput}>
                    Add Policy
                </button>
            </FormGroup>

            <SubmitButton type="submit">Submit</SubmitButton>

            <div>
                {userData && userData.length > 0 ? (
                    <ul>
                        {userData.map((user, index) => (
                            <li key={index}>
                                {user && user.VALUE && <span>{user.VALUE}</span>}
                                {!user && <span>User don't want to show his data</span>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No user data available</p>
                )}
            </div>
        </FormContainer>
        </>
    );
};

export default PolicyForm;
