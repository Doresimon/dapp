/* 
@ return

{ 
    'filename:classname':
    { 
        assembly: 
        { 
            '.code': [Array],
            '.data': [Object] 
        },
        bytecode:
        '...',
        functionHashes:
        { 
            'n()': '...',
            'owner()': '...',
            'ping(uint256)': '...' 
        },
        gasEstimates: 
        { 
            creation: [Array], 
            external: [Object], 
            internal: {} 
        },
        interface:
        '...',
        metadata:
        '...',
        opcodes:
        '...',
        runtimeBytecode:
        '...',
        srcmap:
        '...',
        srcmapRuntime:
        '...', 
    } 
} 
      
*/


var solc = require('solc')
var fs = require('fs')

let compiler ={
    name:'',
    path:'',
    content: '',

    readFile(){
        this.content = (fs.readFileSync(`${this.path}/${this.name}`)).toString()
    },

    compile(path, name){
        this.name = name
        this.path = path
        this.readFile()

        let input = {}
        input[this.name] = this.content

        let output = solc.compile({ sources: input }, 1)

        return output.contracts
    }
}

module.exports = compiler