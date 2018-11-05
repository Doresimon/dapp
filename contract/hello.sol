pragma solidity ^0.4.23;

contract Hello {
  address public owner;
  uint public n;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function ping(uint num) public {
    n = num;
  }
}

