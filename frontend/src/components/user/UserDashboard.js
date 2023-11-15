// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Navigation = styled.nav`
  background-color: #007bff;
  padding: 15px;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;


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

const App = () => {
    return (
        <>
            {/* <Container>
        <Navigation>
          <NavLink to="/owned-devices">Owned Devices</NavLink>
          <NavLink to="/purchase-devices">Purchase Devices</NavLink>
        </Navigation>

        <hr /> */}

            {/* <Route path="/owned-devices" component={OwnedDevices} />
        <Route path="/purchase-devices" component={PurchaseDevices} /> */}
            {/* </Container> */}

            <LoginPageContainer>
                <StyledLink to={"\OwnedDevices"}>
                    <UploadButton>
                        Owned Devices
                    </UploadButton>
                </StyledLink>

                <StyledLink to={"\PurchaseDevice"}>
                    <LoginButton>Purchase Devices</LoginButton>
                </StyledLink>
            </LoginPageContainer>
        </>
    );
};

export default App;
