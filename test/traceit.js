const traceit = artifacts.require('traceit');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('traceit', async function (/* accounts */) {
    it('should assert true when deployed', async function () {
        await traceit.deployed();
        return assert.isTrue(true);
    });

    it('should create a Process', async () => {
        let instance = await traceit.deployed();
        await instance.addProcess(
            'ORDER_CREATED',
            'An order has been created by a GP'
        );
        let process = await instance.processes(0);
        assert.equal(process[1], 'ORDER_CREATED');
        assert.equal(process[2], 'An order has been created by a GP');
    });

    // it('should return Participant details', async () => {
    //     let instance = await traceit.deployed();
    //     let participantDetails = await instance.getParticipant(0);
    //     assert.equal(participantDetails[0], 'A');

    //     instance = await traceit.deployed();
    //     participantDetails = await instance.getParticipant(1);
    //     assert.equal(participantDetails[0], 'B');

    //     instance = await traceit.deployed();
    //     participantDetails = await instance.getParticipant(2);
    //     assert.equal(participantDetails[0], 'C');
    // });
});
