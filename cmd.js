#!/usr/bin/env node
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

// all file paths have a $ replaced with $$ to play nicely with makefiles.
// we have to replace with $$$$ becasue the $ char is a wilecard in String.replace
// and so two $$ = one actual $

// write header
console.log(process.argv[2].replace('$', '$$$$') + ': \\');

// read lines from stdin and write to stdout
rl.on('line', function(line){
    console.log('  ' + line.replace('$', '$$$$') + ' \\');
});

rl.on('end', function () {
    console.log('\n');
});
