// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;

import './Organization.sol';
// import "@openzeppelin/contracts/proxy/Clones.sol";

contract OrganizationFactory {

  Organization[] public _organizations;

  event OrganizationCreated(Organization newOrganization);

  function createOrganization (string memory _name) public {
    Organization newOrganization = new Organization(_name, msg.sender);
    _organizations.push(newOrganization);
    emit OrganizationCreated(newOrganization);
  }

  function allOrganizations () public view returns (Organization[] memory ){
    return _organizations;
  }
}