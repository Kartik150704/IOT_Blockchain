import React, { useState  } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import DropdownComponent from '../Tools/DropDown';
const LoginPageContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
`;

const UploadButton = styled.label`
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin-bottom: 20px;
  text-align: center;

  &:hover {
    background-color: #2980b9;
  }

  input {
    display: none;
  }
`;

const LoginButton = styled.button`
  background-color: #2ecc71;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  width: 100%;

  &:hover {
    background-color: #27ae60;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const LoginPage = () => {
  const navigate=useNavigate()
  const [publicKey, setPublicKey] = useState('');
  
  
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
      setPublicKey(uploadedKey);
    };

    reader.readAsText(file);
  };

  const handleLogin = () => {
    if (publicKey) {
      localStorage.setItem('publickey',publicKey);
      navigate('/UserDashboard');
    } else {
      alert('Please upload a public key.');
    }
  };

  return (
    <>
    <DropdownComponent/>
    <LoginPageContainer>
      <UploadButton>
        Upload Public Key
        <input type="file" accept=".txt" onChange={handleFileChange} />
      </UploadButton>
      {/* <StyledLink to={"/UserDashboard"}> */}
      <LoginButton onClick={handleLogin}>Login</LoginButton>
      {/* </StyledLink> */}
    </LoginPageContainer>
    </>
  );
};

export default LoginPage;
