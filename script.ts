import { ethers } from 'ethers';

const safeAddress = "0x6b1c176436277a91E1841b93cF83e63491600f09"
const provider = ethers.providers.getDefaultProvider(5)
const safeContract: ethers.Contract = new ethers.Contract(safeAddress, [{
    "inputs": [],
    "name": "getOwners",
    "outputs": [
        {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}], provider)
console.log(safeAddress, provider)
console.log(safeContract)
console.log(await safeContract.getOwners())
