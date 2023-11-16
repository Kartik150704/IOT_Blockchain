// UserDashboard.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchAPI } from '../Tools/FetchAPI';
import DropdownComponent from '../Tools/DropDown';
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

const GeneralDashboard = () => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const handleDownload = (inputdata, type) => {
    const blob = new Blob([inputdata], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}.txt`; // Set the desired file name
    a.style.display = 'none';
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateKeys = async () => {
    let response = await fetchAPI('http://localhost:8000/gateway/generatekeys', "GET", "");
    await handleDownload(response.publicKey,"PublicKey")
    await handleDownload(response.privateKey,"PrivateKey")
    setPrivateKey(response.privateKey);
    setPublicKey(response.publicKey);


  };
  const downloadKeysManually=()=>
  {
      handleDownload(publicKey,"PublicKey")
      handleDownload(privateKey,"PrivateKey")
  }
  return (
    <>
      <DropdownComponent/>
      <DashboardContainer>
        <Heading>User Dashboard</Heading>

        <Button onClick={generateKeys}>Generate Keys</Button>
        <KeysContainer>
          <h4>If keys are not downloaded automatically , click here to download</h4>
          <Button onClick={downloadKeysManually}>Download</Button>
        </KeysContainer>

        <NavigationButtons>
          <StyledLink to={"/Login"}>
            <Button>Go to Login page</Button>
          </StyledLink>
          {/* <StyledLink to={"/purchase-devices"}>
            <Button>Purchase Devices</Button>
          </StyledLink> */}
        </NavigationButtons>
      </DashboardContainer>
    </>
  );
};

export default GeneralDashboard;
