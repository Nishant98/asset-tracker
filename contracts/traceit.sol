pragma solidity >=0.4.21 <0.8.15;

contract traceIt {
    uint32 public order_id = 0;         // Order ID
    uint32 public user_id = 0;          // User ID
    uint32 public owner_id = 0;         // Ownership ID
    uint32 public process_id = 0;       // Process ID

    struct process {
        uint32 processId;
        string status;
        string description;
    }
    mapping(uint32 => process) public processes;

    struct order {
        uint32 orderId;
        string orderNumber;
        uint32 orderOwnerId;
        uint32 createdAt;
        int32 currentProcessId;
    }
    mapping(uint32 => order) public orders;

    struct user {
        uint32 userId;
        string userName;
        string userEmail;
        string userType;                // GP or RP
        string userRole;                // Role of the user (Order Manager etc)
        address userAddress;
        uint32[] involvedOrders;        // Order IDs that the user is involved in
    }
    mapping(uint32 => user) public users;

    struct ownership {
        uint32 orderId;
        uint32 userId;
        uint32 processId;
        uint32 timeStamp;
        // comment
    }
    mapping(uint32 => ownership) public ownerships;   // ownerships by ownership ID (owner_id)
    mapping(uint32 => uint32[]) public orderTrack;    // ownerships by order ID (order_id) / Movement track for an order

    function addProcess(string memory _status, string memory _description) public returns (uint32){
        uint32 processId = process_id++;
        processes[processId].processId = processId;
        processes[processId].status = _status;
        processes[processId].description = _description;
        return processId;
    }

    function getProcess(uint32 _process_id) public view returns (string memory, string memory) {
        return (
            processes[_process_id].status,
            processes[_process_id].description
        );
    }

    function addUser(string memory _name, string memory _email, string memory _type, string memory _role, address _address) public returns (uint32){
        uint32 userId = user_id++;
        users[userId].userId = userId;
        users[userId].userName = _name;
        users[userId].userEmail = _email;
        users[userId].userType = _type;
        users[userId].userRole = _role;
        users[userId].userAddress = _address;
        // users[userId].involvedOrders = [];
        return userId;
    }

    function getUser(uint32 _user_id) public view returns (string memory, string memory, string memory, string memory, address, uint32[] memory) {
        return (
            users[_user_id].userName,
            users[_user_id].userEmail,
            users[_user_id].userType,
            users[_user_id].userRole,
            users[_user_id].userAddress,
            users[_user_id].involvedOrders
        );
    }

    function createOrder(uint32 _orderOwnerId, string memory _orderNumber) public returns (uint32) {
        uint32 orderId = order_id++;
        orders[orderId].orderId = orderId;
        orders[orderId].orderNumber = _orderNumber;
        orders[orderId].orderOwnerId = _orderOwnerId;
        orders[orderId].createdAt = uint32(block.timestamp);
        orders[orderId].currentProcessId = -1;
        updateOrderOwner(_orderOwnerId, orderId);
        return orderId;
    }

    function getOrder(uint32 _orderId) public view returns (string memory, uint32, uint32){
        return (
            orders[_orderId].orderNumber,
            orders[_orderId].orderOwnerId,
            orders[_orderId].createdAt
        );
    }

    // Function to change the order status
    function updateOrderOwner(uint32 _newOwnerId, uint32 _orderId) public returns (bool) {
        // user memory newOwner = users[_newOwnerId];
        int32 newProcessId;
        int32 previousProcessId = orders[_orderId].currentProcessId;
        uint32 ownership_id = owner_id++;
        ownerships[ownership_id].orderId = _orderId;
        ownerships[ownership_id].userId = _newOwnerId;
        newProcessId = previousProcessId + 1;
        ownerships[ownership_id].processId = uint32(newProcessId);
        ownerships[ownership_id].timeStamp = uint32(block.timestamp);
        orders[_orderId].currentProcessId = newProcessId;
        // orders[_orderId].orderOwner = newOwner.participantAddress;
        orderTrack[_orderId].push(ownership_id);
        return (true);
    }

   function getProvenance(uint32 _orderId) external view returns (uint32[] memory) {
        return orderTrack[_orderId];
        // ownership[] memory track;
        // uint32 i;
        // uint32[] memory arr = orderTrack[_orderId];
        // for (i = 0; i < arr.length; i++) {
        //     track.push(ownerships[arr[i]]);
        // }
        // return track;
    }

    function getCurrentOrderOwner(uint32 _regId) public view returns (uint32, string memory, string memory, string memory, string memory, uint32) {
        ownership memory details = ownerships[_regId];
        return (
            details.orderId,
            users[details.userId].userName,
            users[details.userId].userEmail,
            processes[details.processId].status,
            processes[details.processId].description,
            details.timeStamp
        );
    }
}
