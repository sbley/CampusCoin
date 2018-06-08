const CampusCoin = artifacts.require("CampusCoin");

contract('TestCoin', async (accounts) => {

    it("should put 1000 coins in the first account", async () => {
        const instance = await CampusCoin.deployed();
        const balance = await instance.balances.call(accounts[0]);
        assert.equal(balance.valueOf(), 1000);
    });

    it("should mint correctly", async () => {
        // prepare
        const owner = accounts[0];
        const receiver = accounts[1];
        const instance = await CampusCoin.deployed();

        // test
        const amount = 10;
        await instance.mint(receiver, amount);

        // assert
        const receiverBalance = (await instance.balances.call(receiver)).toNumber();
        assert.equal(receiverBalance, 10, "Amount not correctly assigned to the receiver");
    });
});

contract('TestCoin', async (accounts) => {
    it("should send coin correctly", async () => {
        // prepare
        const sender = accounts[0];
        const receiver = accounts[1];
        const instance = await CampusCoin.deployed();

        // test
        const amount = 100;
        await instance.sendCoin(receiver, amount, {from: sender});

        const senderBalance = (await instance.balances.call(sender)).toNumber();
        const receiverBalance = (await instance.balances.call(receiver)).toNumber();

        assert.equal(senderBalance, 900, "Amount not correctly taken from the sender");
        assert.equal(receiverBalance, 100, "Amount not correctly sent to the receiver");
    });
});
