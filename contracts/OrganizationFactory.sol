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
  Organization[] public _organizations;

  mapping(address => Organization) _organizationAddress;

  event OrganizationCreated(address indexed _address);
  event OrganizationDeactived(address indexed _address);

  function createOrganization() public payable {
    require(!_organizationAddress[msg.sender].flag, 'Already in system');
    Organization memory newOrganization = Organization(msg.sender, true);
    _organizations.push(newOrganization);
  }

  function getOrganizations() public view returns (Organization[] memory) {
    return _organizations;
  }

  function getOrganization() public view returns (Organization memory) {
    return _organizationAddress[msg.sender];
  }

  function deactiveOrganization() public {
    require(_organizationAddress[msg.sender].flag, 'Not in system');
    _organizationAddress[msg.sender].flag = false;
  }

  function withdraw() public payable onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }
}
