pragma solidity ^0.4.0;

contract CampusCoin {

    address public owner;

    mapping(address => uint) public balances;

    // constructor
    constructor() public {
        owner = msg.sender;
        balances[owner] = 1000;
    }

    function mint(address receiver, uint amount) public {
        if (msg.sender != owner) return;
        balances[receiver] += amount;
    }

    function sendCoin(address receiver, uint amount) public {
        if (balances[msg.sender] < amount) return;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }
}
