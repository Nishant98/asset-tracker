const express = require('express');
// const bodyParser = require('body-parser');
// const Web3 = require('web3');
const obj = require('../configuration/blockchain.js');

const orderRouter = express.Router();
// orderRouter.use(bodyParser.json());

var web3 = obj.web3;
var contractInstance = obj.contractInstance;

function getOrderHistory(orderId) {
    return contractInstance.getProvenance(orderId, {
        from: web3.eth.accounts[0],
        gas: 3000000,
    });
}

const getOwnershipDetails = (ownershipId) => {
    const data = contractInstance.getCurrentOrderOwner(ownershipId, {
        from: web3.eth.accounts[0],
        gas: 3000000,
    });
    return data;
};

// const getOrderData = async (ownershipId) => {
//     const data = await contractInstance.getCurrentOrderOwner(ownershipId, {
//         from: web3.eth.accounts[0],
//         gas: 3000000,
//     });
//     return data;
// };

orderRouter.get('/:orderId', (req, res, next) => {
    let orderId = req.params.orderId;
    orderId = orderId % 10 - 1;
    var orderTraceResult = getOrderHistory(orderId);
    var orderTraceArray = [];
    for (var i = 0; i < orderTraceResult.length; i++) {
        orderTraceArray.push(orderTraceResult[i].toString());
    }
    // console.log(orderTraceArray);
    const response = [];
    const map = {
        1: 'userName',
        2: 'userEmail',
        3: 'orderStatus',
        4: 'statusDescription',
        5: 'timeStamp',
    };
    orderTraceArray.forEach((id) => {
        var ownershipResult = getOwnershipDetails(id);
        // var ownershipResultArray = [];
        // for (var i = 0; i < ownershipResult.length; i++) {
        //     ownershipResultArray.push(ownershipResult[i].toString());
        // }
        // console.log(ownershipResult);
        const obj = {};
        for (var i = 0; i < ownershipResult.length; i++) {
            if (i !== 0) {
                obj[map[i]] = ownershipResult[i].toString();
            }
        }
        console.log(obj);
        response.push(obj);
    });
    console.log(response);
    // const data = [
    //     {
    //         userName: 'Nishant Nimbalkar',
    //         userEmail: 'nishant.nimbalkar@gmail.com',
    //         orderStatus: 'ORDER CREATED',
    //         statusDescription: 'An order has been created by a GP',
    //         timeStamp: '1650637499',
    //     },
    //     {
    //         userName: 'Priyam Pandia',
    //         userEmail: 'priyam.pandia@gmail.com',
    //         orderStatus: 'ASSETS VERIFIED',
    //         statusDescription: 'Assets are verified by the RP',
    //         timeStamp: '1650637519',
    //     },
    //     {
    //         userName: 'Amit Sharma',
    //         userEmail: 'amit.sharma@gmail.com',
    //         orderStatus: 'LOGISTICS COMPLETED',
    //         statusDescription: 'Assets have reached the Recycling Facility',
    //         timeStamp: '1650637524',
    //     },
    //     {
    //         userName: 'Kiruthika S',
    //         userEmail: 'kiruthika.s@gmail.com',
    //         orderStatus: 'ASSETS RECYCLED',
    //         statusDescription: 'Assets have been completely recycled',
    //         timeStamp: '1650637530',
    //     },
    // ];
    res.send(response.slice(0, 4));
});

module.exports = orderRouter;
