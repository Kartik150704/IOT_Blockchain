// UserDashboard.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  text-align: center;
  color: #333;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: #45a049;
  }
`;

const KeysContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  word-break: break-all; /* Wrap the content to the next line when it overflows */
`;

const KeyLabel = styled.strong`
  display: block;
  margin-top: 10px;
`;

const NavigationButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const UserDashboard = () => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const generateKeys = () => {
    // Implement key generation logic (you may use a library like 'crypto' or 'ethereumjs-wallet')
    // Set the generated keys using setPublicKey and setPrivateKey
    // For demonstration purposes, let's assume the keys are generated successfully
    setPublicKey('fdgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
    setPrivateKey('GeneratedPrivateKey');
  };

  return (
    <Router>
      <DashboardContainer>
        <Heading>User Dashboard</Heading>

        <Button onClick={generateKeys}>Generate Keys</Button>
        <KeysContainer>
          <KeyLabel>Public Key:</KeyLabel>
          <p>{publicKey}</p>
          <KeyLabel>Private Key: {privateKey}</KeyLabel>
        </KeysContainer>

        <NavigationButtons>
          <StyledLink to={"/owned-devices"}>
            <Button>Owned Devices</Button>
          </StyledLink>
          <StyledLink to={"/purchase-devices"}>
            <Button>Purchase Devices</Button>
          </StyledLink>
        </NavigationButtons>
      </DashboardContainer>
    </Router>
  );
};

export default UserDashboard;
