var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

// write header
console.log(process.argv[2] + ': \\');

// read lines from stdin and write to stdout
rl.on('line', function(line){
    console.log('  ' + line + ' \\');
});

rl.on('end', function () {
    console.log('\n');
});
