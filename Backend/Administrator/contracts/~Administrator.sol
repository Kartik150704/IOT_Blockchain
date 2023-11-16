// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Administrator {
    mapping(string => string) private data;
    string[] private devices;
    mapping(string => string) private userPrivacyPolicy;

    event ValueStored(string key, string value);
    event DeviceAdded(string device);
    event PolicyAdded(string user, string policy);

    function storeValue(string memory key, string memory value) external {
        data[key] = value;
        emit ValueStored(key, value);
    }

    function retrieveValue(string memory key) external view returns (string memory) {
        return data[key];
    }

    function addDevice(string memory device) external {
        devices.push(device);
        emit DeviceAdded(device);
    }

    function getDevices() external view returns (string[] memory) {
        return devices;
    }

    function storeUserPrivacyPolicy(string memory user, string memory policy) external {
        require(bytes(user).length > 0 && bytes(policy).length > 0, "User and policy must not be empty");
        userPrivacyPolicy[user] = policy;
        emit PolicyAdded(user, policy);
    }

    function getUserPrivacyPolicy(string memory user) external view returns (string memory) {
        require(bytes(user).length > 0, "User must not be empty");
        return userPrivacyPolicy[user];
    }
}
