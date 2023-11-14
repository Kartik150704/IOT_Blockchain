// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Administrator {
    struct PrivacyPolicy {
        uint256 policyId;
        string[] collectedData;
    }

    struct Device {
        string deviceId;
        string deviceName;
        string deviceType;
        string deviceManufacturer;
        string manufacturerURL;
        uint256[] privacyPolicyIds; // Store the PrivacyPolicy IDs associated with the device
    }

    mapping(uint256 => PrivacyPolicy) public privacyPolicies;
    mapping(string => Device) public devices;

    uint256 private policyIdCounter;

    function addPrivacyPolicy(string[] memory _collectedData) public {
        uint256 newPolicyId = policyIdCounter++;
        privacyPolicies[newPolicyId] = PrivacyPolicy(newPolicyId, _collectedData);
    }

    function addDevice(
        string memory _deviceId,
        string memory _deviceName,
        string memory _deviceType,
        string memory _deviceManufacturer,
        string memory _manufacturerURL,
        uint256[] memory _privacyPolicyIds
    ) public {
        devices[_deviceId] = Device({
            deviceId: _deviceId,
            deviceName: _deviceName,
            deviceType: _deviceType,
            deviceManufacturer: _deviceManufacturer,
            manufacturerURL: _manufacturerURL,
            privacyPolicyIds: _privacyPolicyIds
        });
    }

    function getDevicePrivacyPolicies(string memory _deviceId) public view returns (PrivacyPolicy[] memory) {
        uint256[] memory policyIds = devices[_deviceId].privacyPolicyIds;
        PrivacyPolicy[] memory policies = new PrivacyPolicy[](policyIds.length);

        for (uint256 i = 0; i < policyIds.length; i++) {
            policies[i] = privacyPolicies[policyIds[i]];
        }

        return policies;
    }
}
