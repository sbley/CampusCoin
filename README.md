# CampusCoin


CampusCoin is a minimal token smart contract for the [Ethereum](https://ethereum.org/) platform.

## Requirements

### Truffle

This project uses [Truffle](http://truffleframework.com/) to compile, test and deploy the contracts.

Install Truffle via npm: `npm i -g truffle`

### Ganache

In order to test and deploy the contracts to a dev chain we use ganache-cli.

Install ganache-cli via npm: `npm i -g ganache-cli`

### Geth

Once we tested successfully on Ganache, we want to deploy the contracts to Testnet and Mainnet. 
We use [Geth](https://github.com/ethereum/go-ethereum/wiki/geth) to connect to these chains.

Read the [instructions](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum) on how to install Geth on your
system.

## Contract development

### Compile contracts

Run `truffle compile` to compile CampusCoin and its dependencies. The compiled contracts will be generated into 
build/contracts folder.

### Deploy and test contracts on a dev chain

Run `ganache-cli --port 7545` to launch a dev chain.

Run `truffle migrate` to deploy CampusCoin to the dev chain.

Run `truffle test` to deploy and test CampusCoin on the dev chain. 

## Decentralized web app

The project includes an Angular web app to showcase the communication with the CampusCoin contract.

### Run web app on localhost

Run `npm start` to launch the web app.
