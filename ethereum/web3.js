import Web3 from 'web3';

let web3 = null;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	// We are in the browser and metamask is running...
	// web3 = new Web3(window.web3.currentProvider);
	if (window.ethereum) {
		web3 = new Web3(window.ethereum);
		window.ethereum.enable();
	} else if (window.web3) {
		web3 = new Web3(window.web3.currentProvider);
	}
} else {
	// We are on the server or the user is not running metamask
	const provider = new Web3.providers.HttpProvider('http://localhost:8545');
	web3 = new Web3(provider);
}

export default web3;
