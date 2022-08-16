const Web3 = require('web3');

// Web Connection
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
console.log(`Talking with a geth server ${web3.version.api} \n`);

const abiArray = [
    {
        constant: false,
        inputs: [
            {
                internalType: 'string',
                name: '_status',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '_description',
                type: 'string',
            },
        ],
        name: 'addProcess',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                internalType: 'string',
                name: '_name',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '_email',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '_type',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '_role',
                type: 'string',
            },
            {
                internalType: 'address',
                name: '_address',
                type: 'address',
            },
        ],
        name: 'addUser',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                internalType: 'uint32',
                name: '_orderOwnerId',
                type: 'uint32',
            },
            {
                internalType: 'string',
                name: '_orderNumber',
                type: 'string',
            },
        ],
        name: 'createOrder',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                internalType: 'uint32',
                name: '_newOwnerId',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: '_orderId',
                type: 'uint32',
            },
        ],
        name: 'updateOrderOwner',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'uint32',
                name: '_regId',
                type: 'uint32',
            },
        ],
        name: 'getCurrentOrderOwner',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'uint32',
                name: '_orderId',
                type: 'uint32',
            },
        ],
        name: 'getOrder',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'uint32',
                name: '_process_id',
                type: 'uint32',
            },
        ],
        name: 'getProcess',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'uint32',
                name: '_orderId',
                type: 'uint32',
            },
        ],
        name: 'getProvenance',
        outputs: [
            {
                internalType: 'uint32[]',
                name: '',
                type: 'uint32[]',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'uint32',
                name: '_user_id',
                type: 'uint32',
            },
        ],
        name: 'getUser',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint32[]',
                name: '',
                type: 'uint32[]',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'order_id',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        name: 'orders',
        outputs: [
            {
                internalType: 'uint32',
                name: 'orderId',
                type: 'uint32',
            },
            {
                internalType: 'string',
                name: 'orderNumber',
                type: 'string',
            },
            {
                internalType: 'uint32',
                name: 'orderOwnerId',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: 'createdAt',
                type: 'uint32',
            },
            {
                internalType: 'int32',
                name: 'currentProcessId',
                type: 'int32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'orderTrack',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'owner_id',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        name: 'ownerships',
        outputs: [
            {
                internalType: 'uint32',
                name: 'orderId',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: 'userId',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: 'processId',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: 'timeStamp',
                type: 'uint32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'process_id',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        name: 'processes',
        outputs: [
            {
                internalType: 'uint32',
                name: 'processId',
                type: 'uint32',
            },
            {
                internalType: 'string',
                name: 'status',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'description',
                type: 'string',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'user_id',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        name: 'users',
        outputs: [
            {
                internalType: 'uint32',
                name: 'userId',
                type: 'uint32',
            },
            {
                internalType: 'string',
                name: 'userName',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'userEmail',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'userType',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'userRole',
                type: 'string',
            },
            {
                internalType: 'address',
                name: 'userAddress',
                type: 'address',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];

const address = '0x3991B86D26BAfD2e3C4c5C1761AC64d4cEf5A50b';
const contract = web3.eth.contract(abiArray);
const contractInstance = contract.at(address);
web3.eth.defaultAccount = web3.eth.coinbase;
web3.eth.defaultAccount = '0xb8A2d4D2Cca69FF852cE54631ed5c1123b314f37';

module.exports.web3 = web3;
module.exports.contractInstance = contractInstance;
