let spaceLetters = [' ', '\t'];

function isAWhiteSpace(letter) {
    for(let i = 0; i < spaceLetters.length; i++){
        if(spaceLetters[i] === letter) {
            return true
        }
    }
    return false;
}

function parseArgsWithQuot(commandMsg) {
    commandMsg = commandMsg.trim();
    let args = [];
    let quoteArg = false;
    let start = false;
    debugger;
    for (let i = 0; i < commandMsg.length; i++) {
        let l = args.length - 1;
        debugger;
        if (!start && (commandMsg[i] === '"')) {
            quoteArg = true;
            start = true;
            args.push('');
            debugger;
        } else if (!start && commandMsg[i] !== '"' && !isAWhiteSpace(commandMsg[i])) {
            quoteArg = false;
            start = true;
            args.push('');
            args[l + 1] += commandMsg[i];
            debugger;
        } else if (start && quoteArg && commandMsg[i] !== '"') {
            args[l] += commandMsg[i];
            debugger;
        } else if (start && !quoteArg && !isAWhiteSpace(commandMsg[i])) {
            args[l] += commandMsg[i];
            debugger;
        } else if (start && quoteArg && commandMsg[i] === '"') { // here finishing and getting the args
            start = false;
            debugger;
        } else if(start && !quoteArg && (isAWhiteSpace(commandMsg[i]) || i === commandMsg.length - 1)) {
            start = false;
            debugger;
        }
    }
    return args;
}


let commandMsg = `prayer register "Arabic Emarat Republic" "wow" --f cry kill`;

console.dir(parseArgsWithQuot(commandMsg));