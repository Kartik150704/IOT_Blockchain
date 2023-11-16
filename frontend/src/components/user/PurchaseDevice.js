// DeviceList.js
import React, { useState ,useEffect } from 'react';
import styled from 'styled-components';
import { fetchAPI } from '../Tools/FetchAPI';
import LoadingScreen from '../Screens/LoadingScreen';
// import { Link } from 'react-router-dom'; // Assuming you are using React Router


const DeviceListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: center;
  max-width: 900px; /* Set a maximum width to limit the number of devices per row */
  margin: 50px auto;
`;

const DeviceCard = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CustomModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const CustomModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 70vh; /* Limit the height of the modal content */
  margin: auto;
  overflow-y: auto;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  background-color: #ddd;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
`;

const PurchaseButton = styled.button`
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

// const NavbarLink = styled(Link)`
//   text-decoration: none;
//   color: white;
//   font-weight: bold;
// `;

const PurchaseDevice = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devicesData, setDevicesData] = useState([])
  const [loading,setloading]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let options = {
          user: localStorage.getItem('publickey')
        };

        let x = await fetchAPI('http://localhost:8000/administrator/getalldevicesinfo', 'GET', options);
        console.log(x)
        setDevicesData(x);
      } catch (error) {
        // Handle any errors if the fetchAPI or setting state fails
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function immediately

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDevice(null);
    setIsModalOpen(false);
  };


  const purchaseDevice=async ()=>
  {
      let options=
      {
          user:localStorage.getItem('publickey'),
          device:selectedDevice.deviceId,

      }
      setloading(true)
      let response=await fetchAPI('http://localhost:8000/gateway/savedevice',"POST",options);
      console.log(response);
      setloading(false)
  }
  return (
    <div>
      {loading && <LoadingScreen message="Purchasing Device....."/>}
      <Navbar>
        <NavbarLogo>Purchase Devices</NavbarLogo>
        {/* <NavbarLinks> */}
        {/* <NavbarLink to="/">Home</NavbarLink> */}
        {/* <NavbarLink to="/about">About</NavbarLink> */}
        {/* Home */}
        {/* Add more links as needed */}
        {/* </NavbarLinks> */}
      </Navbar>
      <DeviceListContainer>
        {devicesData.map((device) => (
          <DeviceCard key={device.deviceId} onClick={() => handleDeviceClick(device)}>
            <h3>{device.deviceName}</h3>
            <p>Hash: {device.deviceHash}</p>
          </DeviceCard>
        ))}
      </DeviceListContainer>

      <CustomModalContainer isOpen={isModalOpen} onClick={closeModal}>
        <CustomModalContent onClick={(e) => e.stopPropagation()}>
          {selectedDevice && (
            <>
              {console.log(selectedDevice)}
              <h2>{selectedDevice.deviceName}</h2>
              <p><b>Device ID:</b> {selectedDevice.deviceId}</p>
              <p><b>Device Type:</b> {selectedDevice.deviceType}</p>
              <p><b>Device Manufacturer:</b> {selectedDevice.deviceManufacturer}</p>
              <p><b>Manufacturer URL:</b> {selectedDevice.manufacturerUrl}</p>
              <h3><b>Privacy Policies:</b></h3>
              {/* {console.log("selected ", selectedDevice.privacyPolicies[0].policyName)} */}
                
              <ul>
                {selectedDevice.privacyPolicies.map((policy, index) => (
                  <li key={index}>
                    <strong >{policy.policyName}</strong>
                    <p>{policy.policyDescription}</p>
                    <ul>
                      {policy.policyPoints.map((point, pointIndex) => (
                        <li key={pointIndex}>{point.header}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <PurchaseButton onClick={purchaseDevice}>Purchase</PurchaseButton>
              <CloseButton onClick={closeModal}>Close</CloseButton>
            </>
          )}
        </CustomModalContent>
      </CustomModalContainer>
    </div>
  );
};

export default PurchaseDevice;