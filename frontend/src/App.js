import React from 'react'
import DeviceForm from './components/device_administrator/DeviceForm'
import DeviceList from './components/device_administrator/DeviceList'
import UserDashboard from './components/user/UserDashboard'
import OwnedDevices from './components/user/OwnedDevices'
import PurchaseDevice from './components/user/PurchaseDevice'
import LoginPage from './components/user/LoginPage'
import GeneralDashboard from './components/user/GeneralDashboard'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CheckUserData from './components/device_administrator/CheckUserData'
import DropdownComponent from './components/Tools/DropDown'

const App = () => {
  return (
    
      <Router>

        <Routes>
          
          <Route path='/' element={<GeneralDashboard />} />
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/UserDashboard/OwnedDevices' element={<OwnedDevices />} />
          <Route path='/UserDashboard/PurchaseDevice' element={<PurchaseDevice />} />
          <Route path='/UserDashboard' element={<UserDashboard />} />
          <Route path='/admin/adddevice' element={<DeviceForm/>}/>
          <Route path='/admin/checkuserdata' element={<CheckUserData/>}/>
          
        {/* <DeviceForm /> */}
        {/* <DeviceList /> */}
        {/* <UserDashboard /> */}
        {/* <OwnedDevices /> */}
        {/* <PurchaseDevice /> */}
        {/* <LoginPage /> */}
        {/* <GeneralDashboard /> */}

        </Routes>

      </Router>
    
  )
}

export default App
