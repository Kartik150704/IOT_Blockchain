import React, { useState } from 'react';
import { fetchAPI } from '../Tools/FetchAPI';


const PolicyForm = () => {
    const [userIdFile, setUserIdFile] = useState(null);
    const [policiesId, setpoliciesId] = useState(['']); // Initial policyId input
    const [formData, setFormData] = useState({
        userId: '',
        policiesId: [''],
    });

    const handleUserIdChange =async  (event) => {
        const file = event.target.files[0];
        setUserIdFile(file);
        let data=await readFileAsText(file)
        
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
          setFormData({...formData,userId:uploadedKey})
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
        
        console.log(formData);
        let response = await fetchAPI('http://localhost:8000/gateway/checkuserdata', "POST", formData)
        console.log(response)

    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userId">User ID:</label>
                <input type="file" id="userId" onChange={handleFileChange} />
            </div>
            <div>
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
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default PolicyForm;
