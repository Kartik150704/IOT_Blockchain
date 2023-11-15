import React from 'react'
import DeviceForm from './components/device_administrator/DeviceForm'
import DeviceList from './components/device_administrator/DeviceList'
import UserDashboard from './components/user/UserDashboard'
import OwnedDevices from './components/user/OwnedDevices'
import PurchaseDevices from './components/user/PurchaseDevice'


const App = () => {
  return (
    <div>
      {/* <DeviceForm /> */}
      {/* <DeviceList /> */}
      <UserDashboard />
      {/* <OwnedDevices /> */}
      {/* <PurchaseDevices /> */}
    </div>
  )
}

export default App
