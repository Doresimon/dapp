var solc = require('solc')
var fs = require('fs')

let contract = {
    name:'hello.sol',
    path:'./contract',
    content: '',
}

contract.content = (fs.readFileSync(`${contract.path}/${contract.name}`)).toString()

let input = {}
input[contract.name] = contract.content

let output = solc.compile({ sources: input }, 1)
for (var contractName in output.contracts)
	console.log(contractName + '[abi]: ' + output.contracts[contractName].interface)
	console.log(contractName + '[code]: ' + output.contracts[contractName].bytecode)