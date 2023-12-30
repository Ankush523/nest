// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    event UserAdded(string email, string phone, string name);

    struct User {
        string email;
        string phone;
        string name;
    }

    mapping(string => mapping(string => bool)) private userExists;

    mapping(address => User) private users;

    function addUser(string memory email, string memory phone, string memory name) public {
        require(!userExists[email][phone], "User already exists");

        // Create a new user
        User memory newUser = User({
            email: email,
            phone: phone,
            name: name
        });

        users[msg.sender] = newUser;

        userExists[email][phone] = true;

        emit UserAdded(email, phone, name);
    }

    function getUser(address userAddress) public view returns (User memory) {
        return users[userAddress];
    }
}
