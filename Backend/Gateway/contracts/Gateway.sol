// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Gateway {
    mapping(string => string) private userToDevice;
    mapping(string => string) private deviceToUser;

    // Function to insert user-to-device mapping
    function insertUserToDevice(string memory user, string memory device) external {
        require(bytes(user).length > 0 && bytes(device).length > 0, "User and device must not be empty");
        userToDevice[user] = device;
    }

    // Function to retrieve device associated with a user
    function getDeviceByUser(string memory user) external view returns (string memory) {
        require(bytes(user).length > 0, "User must not be empty");
        return userToDevice[user];
    }

    // Function to insert device-to-user mapping
    function insertDeviceToUser(string memory device, string memory user) external {
        require(bytes(device).length > 0 && bytes(user).length > 0, "Device and user must not be empty");
        deviceToUser[device] = user;
    }

    // Function to retrieve user associated with a device
    function getUserByDevice(string memory device) external view returns (string memory) {
        require(bytes(device).length > 0, "Device must not be empty");
        return deviceToUser[device];
    }
}
