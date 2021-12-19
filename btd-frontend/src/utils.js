import Web3 from 'web3';
import MedicalResult from './contract-abis/MedicalResult.json';
import ERC721 from './contract-abis/IERC721.json';

export const loadWeb3 = async () => {
    if(window.ethereum){
        const web3 = new Web3(window.ethereum);
        return web3;
    }else if(window.web3){
        window.web3 = new Web3('http://localhost:8545');
    }else{
        window.alert("Non-ethereum browser detected!");
    }
}

loadWeb3();

export const getUserAddress = async () => {
    const web3 = await loadWeb3();
    const address = await web3.eth.getAccounts();
    return address[0];
}

export const getContract = async () => {
    const web3 = await loadWeb3();
    const networkId = await window.ethereum.request({method: 'eth_chainId'});
    const networkData = await MedicalResult.networks[parseInt(networkId)];

    if(networkData){
        const abi = MedicalResult.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);



        return contract;
    }else{
        window.alert("Smart contract is not deployed to the detected network!");
    }
}

export const getInterface = async () => {
    const web3 = window.web3;

    const abi = ERC721.abi;
    const interfejs = new web3.eth.Contract(abi, "0xCae984421cFE3a45C321206e8FF4ceB991752B0A");

    return interfejs;
}

export const mintResult = async(result, evt) => {
    evt.preventDefault();
    const contract = await getContract();
    const walletAddress = await getUserAddress();


   await contract.methods.mint(walletAddress, JSON.stringify(result)).send({from: walletAddress});

}

export const check = async() => {
    const contract = await getContract();
    const walletAddress = await getUserAddress();
    const res = await contract.methods.resultData(1, walletAddress).call();

    return res;
}

export const getTokens = async() => {
    const contract = await getContract();
    const walletAddress = await getUserAddress();
    const patientTokens = await contract.methods.tokenIds(walletAddress).call();

    var tokens = [];

    for(var i = 0;i<patientTokens.length;i++){
        var token = await contract.methods.resultData(patientTokens[i], walletAddress).call();
        tokens.push(JSON.parse(token));
    }

    return tokens;
}