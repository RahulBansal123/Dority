const { assert } = require('chai');

const Dority = artifacts.require('Dority');

require('chai').use(require('chai-as-promised')).should();

contract('Dority', ([deployer, orgOwner, donor]) => {
  let dority;
  before(async () => {
    dority = await Dority.deployed();
  });

  describe('deployment', () => {
    it('should be an instance of Dority', async () => {
      const address = await dority.address;
      assert.notEqual(address, null);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, undefined);
    });
  });

  describe('Dority', () => {
    let result;
    let dorityCount;
    const ipfsHash = 'randomhash';
    const updatedHash = 'newhash';
    const needed = web3.utils.toWei('10', 'ether');
    before(async () => {
      result = await dority.createOrganisation(ipfsHash, needed, {
        from: orgOwner,
      });
      dorityCount = await dority.totalOrganisations();
    });

    it('Adding Organisation', async () => {
      assert.equal(dorityCount, 1);
      const event = result.logs[0].args;
      assert.equal(event.id, 1);
      assert.equal(event.owner, orgOwner);
    });

    it('Retrieving Organisation', async () => {
      let _dority = await dority.organisations(1);
      assert.equal(dorityCount, 1);
      assert.equal(_dority.ipfsHash, ipfsHash);
      assert.equal(_dority.raised, 0);
      assert.equal(_dority.needed, needed);
      assert.equal(_dority.isFullfilled, false);
    });

    it('Donating to organisation', async () => {
      let oldDonorBalance;
      oldDonorBalance = await web3.eth.getBalance(donor);
      oldDonorBalance = new web3.utils.BN(oldDonorBalance);

      result = await dority.donate(1, {
        from: donor,
        value: web3.utils.toWei('1', 'Ether'),
      });

      const gasUsed = new web3.utils.BN(result.receipt.gasUsed);
      const tx = await web3.eth.getTransaction(result.tx);
      const gasPrice = new web3.utils.BN(tx.gasPrice);

      let newDonorBalance;
      newDonorBalance = await web3.eth.getBalance(donor);
      newDonorBalance = new web3.utils.BN(newDonorBalance);

      let donatedAmount;
      donatedAmount = web3.utils.toWei('1', 'Ether');
      donatedAmount = new web3.utils.BN(donatedAmount);

      const balanceWithGasFees = oldDonorBalance.sub(gasPrice.mul(gasUsed));
      const expectedBalance = balanceWithGasFees.sub(donatedAmount);

      assert.equal(newDonorBalance.toString(), expectedBalance.toString());
    });

    it('Updating Organisation', async () => {
      result = await dority.updateOrganisation(1, updatedHash, needed, true, {
        from: orgOwner,
      });
      const event = result.logs[0].args;
      assert.equal(event.id, 1);
      assert.equal(event.owner, orgOwner);

      let _dority = await dority.organisations(1);
      assert.equal(dorityCount, 1);
      assert.equal(_dority.ipfsHash, updatedHash);
      assert.equal(_dority.needed, needed);
      assert.equal(_dority.isFullfilled, true);
    });
  });
});
