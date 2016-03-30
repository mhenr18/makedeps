#!/usr/bin/env node
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

// write header
console.log(process.argv[2].replace('$', '$$') + ': \\');

// read lines from stdin and write to stdout, and make sure $'s are escaped
rl.on('line', function(line){
    console.log('  ' + line.replace('$', '$$') + ' \\');
});

rl.on('end', function () {
    console.log('\n');
});
