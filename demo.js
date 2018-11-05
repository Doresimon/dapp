
var Web3 = require('web3');
var provider = 'HTTP://127.0.0.1:7545'
var web3 = new Web3(Web3.givenProvider || provider);

// console.log(web3)


// web3.eth.getBlock(1)
// .then(console.log);


// web3.eth.getAccounts()
// .then(console.log);
web3.eth.getTransaction('0x5909f1a4ed06db876403ea94801c756faf863ec769cb69a9e504781acf4d20c4')
.then(console.log);


// web3.eth.getBlockNumber()
// .then(console.log);

// web3.eth.getBalance("0xa28b6091ace3373b72c7cc977d741f4ce6665BfA")
// .then(console.log);

// web3.eth.getStorageAt("0xa28b6091ace3373b72c7cc977d741f4ce6665BfA", 0)
// .then(console.log);

// web3.eth.getCode("0xa28b6091ace3373b72c7cc977d741f4ce6665BfA")
// .then(console.log);


let user = []
user[0] = {
    sk:'0x48d8512ebc3c05d631c394540a61e44d805dcfa0b1e072dd3fe3cc5cffbb7323',
    // hex_sk: new Buffer('48d8512ebc3c05d631c394540a61e44d805dcfa0b1e072dd3fe3cc5cffbb7323', 'hex'),
    addr:'0xa28b6091ace3373b72c7cc977d741f4ce6665BfA',
}
user[1] = {
    sk:'0xd16b2088107f69727fe1ec8bd81da3d19f70ce5cf5594d2a9569aed9ec0d1bbf',
    addr:'0xB599bDc6317Bfb551Fc35EaC49443e9A4A761D63',
}
// user[0].account = web3.eth.accounts.privateKeyToAccount(user[0].sk);
user[0].account = web3.eth.accounts.privateKeyToAccount(user[0].sk);

// console.log('Account: ', user[0].account)

let tx = {
    to: user[1].addr,
    value: '1000000000000000000',
    gas: 2000000
}

// let signedTX
// web3.eth.accounts.signTransaction(tx, user[0].sk).then(
//     (r)=>{
//         signedTX = r
//         console.log(r)
        
//         // console.log(signedTX)

//         web3.eth.sendSignedTransaction(signedTX.rawTransaction,(rr)=>{console.log(rr)} )
//     }
// )


let abi =  [
    {
      "constant": true,
      "inputs": [],
      "name": "n",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "num",
          "type": "uint256"
        }
      ],
      "name": "ping",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]


let myContract = new web3.eth.Contract(abi);

myContract.options.address = '0x3573B204B17b1A1b5a1b0EedEE8963E306C025e4'
myContract.options.from = user[0].addr
myContract.options.gasPrice = '300000000'
myContract.options.gas = '1500000'


myContract.methods.ping(666).call({}, function(error, result){
    console.log(error, result)
});
let code = "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061016c806100606000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e52d6061461005c578063773acdef146100875780638da5cb5b146100b4575b600080fd5b34801561006857600080fd5b5061007161010b565b6040518082815260200191505060405180910390f35b34801561009357600080fd5b506100b260048036038101908080359060200190929190505050610111565b005b3480156100c057600080fd5b506100c961011b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60015481565b8060018190555050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a723058202dfbc33669c6d3d7af81a7270901b50abb475df169806755e6fbcb3e0b1e85d80029"

// // console.log("myContract:",myContract.options.jsonInterface)


// myContract.deploy({
//     data: code,
//     arguments: []
// })
// .send({
//     from: user[0].addr,
//     gas: 1500000,
//     gasPrice: '300000000'
// }, function(error, transactionHash){console.log(error, transactionHash)})
// .on('error', function(error){ console.log(error) })
// .on('transactionHash', function(transactionHash){ console.log(transactionHash) })
// .on('receipt', function(receipt){
//    console.log(receipt.contractAddress) // contains the new contract address
// })
// .on('confirmation', function(confirmationNumber, receipt){ console.log(confirmationNumber, receipt) })
// .then(function(newContractInstance){
//     console.log(newContractInstance.options.address) // instance with the new contract address
// });
