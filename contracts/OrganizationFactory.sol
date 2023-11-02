// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract OrganizationFactory is Ownable {
  constructor(address initialOwner) Ownable(initialOwner) {}

  struct Organization {
    address _address;
    bool flag;
  }

  uint256 private _value;

  mapping(address => Organization) public organizations;

  event OrganizationCreated(address indexed _address);
  event OrganizationDeactived(address indexed _address);

  function createOrganization() public payable {
    require(!organizations[msg.sender].flag, 'Already in system');
    Organization memory newOrganization = Organization(msg.sender, true);
    organizations[msg.sender] = newOrganization;
  }

  function deactiveOrganization() public {
    require(organizations[msg.sender].flag, 'Not in system');
    organizations[msg.sender].flag = false;
  }

  function activeOrganization(address _address) public onlyOwner {
    organizations[_address].flag = true;
  }

  function withdraw() public payable onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }
}
