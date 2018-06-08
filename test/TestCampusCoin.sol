pragma solidity ^0.4.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CampusCoin.sol";

contract TestCampusCoin {
    function testInitialBalance() public {
        CampusCoin testCoin = CampusCoin(DeployedAddresses.CampusCoin());

        uint actual = testCoin.balances(tx.origin);
        uint expected = 1000;

        Assert.equal(actual, expected, "Owner should have 1000 coins initially.");
    }
}
