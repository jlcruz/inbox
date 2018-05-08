const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });

  // ADD THIS ONE LINE RIGHT HERE!!!!! <---------------------
  inbox.setProvider(provider);
});

/*beforeEach(()=> {
    //get a list of all accounts
    web3.eth.getAccounts()
      .then(fetchedAccounts => {
        console.log(fetchedAccounts);
      }
      )
    //Use one of those accounts to deploy a contract

}
);
*/

describe('Inbox',() => {
  it ('deploy a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has a default message', async ()=> {
    const message = await inbox.methods.message().call();
    assert.equal(message,'Hi there!');
  });
});