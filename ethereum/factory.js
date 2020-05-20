import web3 from './web3';
import CampaignFactory from '../build/contracts/CampaignFactory.json';

const networkID = 5777;
const contractABI = CampaignFactory.abi;
const contractAddress = CampaignFactory.networks[networkID].address;

// Create and instance of the contract
const instance = new web3.eth.Contract(contractABI, contractAddress);

export default instance;
