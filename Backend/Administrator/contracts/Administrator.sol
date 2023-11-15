// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Administrator {
    mapping(string => string) data;

    event ValueStored(string key, string value);

    function storeValue(string memory key, string memory value) external {
        data[key] = value;
        emit ValueStored(key, value);
    }

    function retrieveValue(string memory key) external view returns (string memory) {
        return data[key];
    }
}
