// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;

import './Organization.sol';
// import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OrganizationFactory is Ownable{

  Organization[] public _organizations;
  // uint totalOrganization;

  struct OrganizationFlag {
    address _address;
    address contractAddress;
    bool flag;
  }
  mapping(address => OrganizationFlag) _organizationContracts;

  event OrganizationCreated(Organization newOrganization);

  function createOrganization (string memory _name) public payable {
    require(!_organizationContracts[msg.sender].flag, "Already in system" );
    Organization newOrganization = new Organization(_name, msg.sender);
    newOrganization.transferOwnership(msg.sender);
    _organizations.push(newOrganization);
    // totalOrganization++;
    _organizationContracts[msg.sender] = OrganizationFlag(msg.sender, address(newOrganization), true);
    emit OrganizationCreated(newOrganization);
  }

  function allOrganizations () public view returns (Organization[] memory ){
    return _organizations;
  }
  function getContractOfOrganization(address _address) public view returns (address){
    return _organizationContracts[_address].contractAddress;
  }
  function withdraw () public payable onlyOwner{
    payable(msg.sender).transfer(address(this).balance);
  }
}