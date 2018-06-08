import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../util/web3.service';
import { MatSnackBar } from '@angular/material';

declare let require: any;
const campuscoin_artifacts = require('../../../../build/contracts/CampusCoin.json');

@Component({
  selector: 'app-coin-sender',
  templateUrl: './coin-sender.component.html',
  styleUrls: ['./coin-sender.component.css']
})
export class CoinSenderComponent implements OnInit {
  accounts: string[];
  CampusCoin: any;

  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
    this.web3Service.artifactsToContract(campuscoin_artifacts)
      .then((CampusCoinAbstraction) => this.CampusCoin = CampusCoinAbstraction);
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.refreshBalance();
    });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

  async sendCoin() {
    if (!this.CampusCoin) {
      this.setStatus('CampusCoin is not loaded, unable to send transaction');
      return;
    }

    const amount = this.model.amount;
    const receiver = this.model.receiver;

    console.log('Sending coins' + amount + ' to ' + receiver);

    this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedCampusCoin = await this.CampusCoin.deployed();
      const transaction = await deployedCampusCoin.sendCoin.sendTransaction(receiver, amount, {from: this.model.account});

      if (!transaction) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
        this.refreshBalanceIfNeeded();
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error sending coin; see log.');
    }
  }

  async refreshBalance() {
    console.log('Refreshing balance');

    try {
      const deployedCampusCoin = await this.CampusCoin.deployed();
      console.log(deployedCampusCoin);
      console.log('Account', this.model.account);
      const campusCoinBalance = await deployedCampusCoin.balances.call(this.model.account);
      console.log('Found balance: ' + campusCoinBalance);
      this.model.balance = campusCoinBalance;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }

  private refreshBalanceIfNeeded() {
    const oldBalance = this.model.balance;
    const loadBalance = async () => {
      await this.refreshBalance();
      if (oldBalance !== this.model.balance) {
        clearInterval(intervalId);
      }
    };
    const intervalId = setInterval(loadBalance, 1000);
  }

  setAmount(e) {
    console.log('Setting amount: ' + e.target.value);
    this.model.amount = e.target.value;
  }

  setReceiver(e) {
    console.log('Setting receiver: ' + e.target.value);
    this.model.receiver = e.target.value;
  }

}
