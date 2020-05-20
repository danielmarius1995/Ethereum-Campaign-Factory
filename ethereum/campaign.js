import web3 from './web3';
import Campaign from '../build/contracts/Campaign.json';

const contractABI = Campaign.abi;
export default (contractAddress) => {
  return new web3.eth.Contract(contractABI, contractAddress);
};
