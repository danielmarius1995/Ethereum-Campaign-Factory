pragma solidity >=0.5.0 <0.7.0;

import './Campaign.sol';

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        // msg.sender is the user who is trying to create the campaign
        // it must be passed here as a parameter, otherwise the manager
        // will become the address of factory
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(address(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
