#! /usr/bin/env node
const program = require('commander');
const requiredPackageVersion = require('./package.json').version;
const { exec } = require('child_process');
const chalk = require('chalk');
const error = chalk.bold.red;

program.version(requiredPackageVersion, '-v, --vers', 'output the current version')
  .usage('<command> [options]');

program.command('close <port>')
  .description('关闭指定端口')
  .action((port, cmd) => {
    require('./bin/closePort.js')(port)
  });

program.command('ls')
  .description('查看端口列表')
  .action((port, cmd) => {
    require('./bin/ls.js')(port)
  });

  program.parse(process.argv);