#!/usr/bin/env node

var argv = process.argv
argv.shift()

var exec = require('child_process').exec;

if (! argv[1]){
  argv[1] = 'bin/www'
  console.log('default entry is bin/www')
}

exec('node -v', function(error, stdout, stderr) {
  if (error !== null) {
      console.log('exec error: ' + error);
  }
  
  if (/^v7/.test(stdout)) {
    console.log("Warning: you've use node v7.x, this version support aysnc/await,you need create an alias:\n    alias node='node --harmony-async-await'")
    console.log("Current: node --harmony-async-await " + argv[1])
    return exec("node --harmony-async-await " + argv[1], function(error, stdout, stderr) {
      console.log(stdout)
      console.log(stderr)
      
      if (error !== null) {
          console.log('exec error: ' + error);
      }
    });
  }
  
  console.log(argv[1])

  var current_path = process.cwd();

  var entry = require('path').resolve(process.cwd(),  argv[1])

  require('..')(entry, is_cli=true)
});
