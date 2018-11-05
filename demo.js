/*
this demo is sync mode,
run the codes seperately
*/

var Web3 = require('web3');
var compiler = require('./compile.js');

// set backend of eth
let provider = 'HTTP://127.0.0.1:7545'
let web3 = new Web3(Web3.givenProvider || provider);

// set smart contract file
let c_name = 'hello.sol'
let c_classname = 'Hello'
let c_path = './contract'

// compile smart contract file
// to abi and bytecode
let contracts = compiler.compile(c_path, c_name)
// console.log(contracts)

// set user sk, address
let user = []
user[0] = {
    sk:'0x48d8512ebc3c05d631c394540a61e44d805dcfa0b1e072dd3fe3cc5cffbb7323',
    addr:'0xa28b6091ace3373b72c7cc977d741f4ce6665BfA',
}
user[1] = {
    sk:'0xd16b2088107f69727fe1ec8bd81da3d19f70ce5cf5594d2a9569aed9ec0d1bbf',
    addr:'0xB599bDc6317Bfb551Fc35EaC49443e9A4A761D63',
}

// construct a TX
let tx = {
    to: user[1].addr,
    value: '1000000000000000000',
    gas: 2000000,
}

// sign a TX
web3.eth.accounts
.signTransaction(tx, user[0].sk)
.then(
    (r) => {
        signedTX = r
        console.log(r)
        // send a TX
        web3.eth.sendSignedTransaction(
            signedTX.rawTransaction
        ).then(
            (rr) => {
                console.log(rr)
            } 
        )
            
    }
)

// deploy a contract
let abi = JSON.parse( contracts[`${c_name}:${c_classname}`].interface )
let code = contracts[`${c_name}:${c_classname}`].bytecode

let someContract = new web3.eth.Contract(abi);

someContract.deploy({
    data: code,
    arguments: []
})
.send({
    from: user[0].addr,
    gas: 1500000,
    gasPrice: '3000000'
}, function(error, transactionHash){
    console.log('error:', error, transactionHash)
})
.on('error', function(error){
    console.log('error:', error)
})
.on('transactionHash', function(transactionHash){
     console.log('transactionHash:', transactionHash) 
})
.on('receipt', function(receipt){
   console.log('new contract address:', receipt.contractAddress) // contains the new contract address
})
.on('confirmation', function(confirmationNumber, receipt){
    console.log('confirmation:', confirmationNumber, receipt)
})
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address

    // invoke a contract's method
    newContractInstance.options.address = '0x3573B204B17b1A1b5a1b0EedEE8963E306C025e4'
    newContractInstance.options.from = user[0].addr
    newContractInstance.options.gasPrice = '300000000'
    newContractInstance.options.gas = '1500000'

    // mycontract.methods.{name}(args).call()
    newContractInstance.methods.ping(666).call({}, function(error, result){
        console.log(error, result)
    });

});

return