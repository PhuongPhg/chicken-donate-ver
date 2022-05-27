// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Organization is Ownable {
  string public name;
  address public id;
  uint public totalDonations;

  struct Donation {
    address donorId;
    uint amount;
    uint time;
  }

  struct WithdrawHistory {
    uint amount;
    uint time;
  }

  Donation[] donations;
  WithdrawHistory[] histories;

  constructor ( string memory _name, address _id ) {
    name = _name;
    id = _id;
    totalDonations = 0;
  }

  event donationCreated (address _from, uint _amount, uint _time);
  event withDrawSuccess (WithdrawHistory _history);

  function donate (uint _amount) external payable{
    Donation memory donation = Donation(msg.sender, _amount, block.timestamp);
    donations.push(donation);
    totalDonations++;
    emit donationCreated(msg.sender, _amount, block.timestamp);
  }

  function withdraw () public payable onlyOwner {
    require(address(this) == msg.sender, "Only owner can withdraw");
    WithdrawHistory memory history = WithdrawHistory(address(this).balance, block.timestamp);
    histories.push(history);
    payable(id).transfer(address(this).balance);
    emit withDrawSuccess(history);
  }

  function getDonations () public view returns (Donation[] memory) {
    return donations;
  }

  function getTotalDonations() public view returns (uint) {
    return totalDonations;
  }
  function getBalance() public view returns (uint){
    return address(this).balance;
  }
  
  function getWithdrawTransaction () public view returns (WithdrawHistory[] memory) {
    return histories;
  }
  function isOwner() public view returns (bool) {
    return address(this) == msg.sender;
  }
}