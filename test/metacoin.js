const Voting = artifacts.require("Voting");

contract('Voting', (accounts) => {

  it('Should be 4 choices', async () => {
    const instance = await Voting.deployed();
    await instance.populateChoices.call();
    var choicesNumber = await instance.getChoicesCount.call();
    assert.equal(choicesNumber, 4, "Not 4 choices created");
  });

  it('Test Voting For First choice', async () => {
    const instance = await Voting.deployed();
    await instance.vote('One', {from : accounts[0]});
    await instance.vote('One', {from : accounts[1]});
    await instance.vote('One', {from : accounts[2]});
    console.log("Account 0", accounts[0]);
    console.log("Account 1", accounts[1]);
    var votesNumber  = await instance.getVotedAmount('One');
    assert.equal(votesNumber, 3, "Not 3 votes");
  });

  it('Test Voting for Second Choice', async () => {
    const instance = await Voting.deployed();
    var votesNumber  = await instance.getVotedAmount('Two');
    assert.equal(votesNumber, 0, "Not 0 votes");
  });

  it('Test Votes Holding Amount Voted Account', async () => {
    const instance = await Voting.deployed();
    var votesHolding  = await instance.getVotesHolding(accounts[0]);
    assert.equal(votesHolding, 0, "Account holds more votes than expected");
  });

  it('Test Votes Holding Amount Not Voted Account', async () => {
    const instance = await Voting.deployed();
    var votesHolding  = await instance.getVotesHolding(accounts[3]);
    assert.equal(votesHolding, 1, "Account holds not 1 vote");
  });

  it('Test Votes Holding after Delegation', async () => {
    const instance = await Voting.deployed();
    await instance.delegateVote(accounts[4], {from: accounts[3]});
    var votesHolding = await instance.getVotesHolding(accounts[3]);
    assert.equal(votesHolding, 0, "Account holds not 0 vote");
  });


  it('Test Votes Holding after Delegation 1', async () => {
    const instance = await Voting.deployed();
    var votesHolding = await instance.getVotesHolding(accounts[4]);
    assert.equal(votesHolding, 2, "Account holds not 2 vote");
  });

  it('Test Voting After Delegation', async () => {
    const instance = await Voting.deployed();
    var votedAmount = await instance.getVotedAmount('Two');
    console.log("Voted amunt before voting: " , votedAmount);
    await instance.vote('Two', {from : accounts[4]});
    var votedAmount = await instance.getVotedAmount('Two');
    assert.equal(votedAmount, 2, "Voted amount not 2 votes");
  });

  it('Test Votes Holding after voting', async () => {
    const instance = await Voting.deployed();
    var votesHolding = await instance.getVotesHolding(accounts[4]);
    assert.equal(votesHolding, 0, "Account holds not 0 vote");
  });





  // it('should call a function that depends on a linked library', async () => {
  //   const metaCoinInstance = await MetaCoin.deployed();
  //   const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
  //   const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

  //   assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  // });
  // it('should send coin correctly', async () => {
  //   const metaCoinInstance = await MetaCoin.deployed();

  //   // Setup 2 accounts.
  //   const accountOne = accounts[0];
  //   const accountTwo = accounts[1];

  //   // Get initial balances of first and second account.
  //   const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

  //   // Make transaction from first account to second.
  //   const amount = 10;
  //   await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

  //   // Get balances of first and second account after the transactions.
  //   const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();


  //   assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
  //   assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  // });
});
