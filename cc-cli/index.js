#!/usr/bin/env node
modules = ["./hello", "./sponsors-extract"]
const { program } = require("commander");
modules.forEach((m) => require(m)(program));
program.parse();

