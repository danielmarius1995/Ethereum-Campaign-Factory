pragma solidity >=0.5.0 <0.7.0;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    uint minimumContribution;
    uint approversCount; // how many people have joined to the campagin
    address manager; // the person who asked for the new instance of campaign to created
    Request[] public requests;
    mapping(address => bool) public approvers; // mark true the address of the people that have contributed to the campaign

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function getMinimumContribution() public view returns (uint) {
        return minimumContribution;
    }

    function getApproversCount() public view returns (uint) {
        return approversCount;
    }
    
    function getAdmin() public view returns (address) {
        return manager;
    }
    
    function getRequestsCount() public view returns (uint) {
      return requests.length;
    }

    function getContractBalance() public view returns (uint) {
        address self = address(this);
        uint contractBalance = self.balance;
        return contractBalance;
    }

    function getSummary() public view returns(uint, uint, uint, uint, address) {
        // Get the balance of the current contract
        // First get the address of the current contract, and then get the balance
        address contractAddress = address(this);
        uint contractBalance = contractAddress.balance;
        return (
          minimumContribution,
          contractBalance,
          requests.length,
          approversCount,
          manager
        );
    }

    function contribute() public payable {
        // msg.value is the amount of ETH sent to a payable public method in a contract.
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount += 1;
    }

    function createRequest(string memory _description, uint _value, address payable _recipient) public restricted {
        // The mapping structure is not added, since it's just a reference
        Request memory newRequest = Request({
           description: _description,
           value: _value,
           recipient: _recipient,
           complete: false,
           approvalCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        // Manipulate the copy the of the struct that exists inside the storage
        // O(1) complexity to access the element in the array
        Request storage request = requests[index];

        // Make sure person calling this function has donated
        require(approvers[msg.sender]);
        // Make sure person calling this function hasn't voted before
        require(!request.approvals[msg.sender]);

        // Mark as true the address who approve the request
        request.approvals[msg.sender] = true;
        request.approvalCount += 1;
    }

    function finalizeRequest(uint index) public restricted {
        // Manipulate the copy the of the struct that exists inside the storage
        // O(1) complexity to access the element in the array
        Request storage request = requests[index];

        // 50% of the people who have contributed to the campagin have to vote yes
        // The number of approvals the request has, against the total number
        // of the people who have contributed to the campagin
        require(request.approvalCount > (approversCount / 2));

        // Be sure that request is not finalized
        require(!request.complete);

        // Send the coins to the recipient
        request.recipient.transfer(request.value);

        // Mark request as finalized with true
        request.complete = true;
    }
}
