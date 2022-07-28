#! /usr/bin/env node
const path = require("path");
const args = process.argv.slice(2);

if (args < 2) {
  console.log("you must enter directory name");
  process.exit(1);
}

console.log("gathering resources, please wait...");



process.exit(0);