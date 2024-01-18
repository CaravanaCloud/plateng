#!/usr/bin/env node
modules = ["./hello", "./extract-sponsors"]
const { program } = require("commander");
modules.forEach((m) => require(m)(program));
program.parse();

