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
    exec('netstat -aon| findstr "80"', [], (err, stdout) => {
        if (err) {
            console.log('\n error:',error(JSON.stringify(err)));
            return;
        }

        let ports = stdout.split("\n");
        let falg = true;
        for (let i = 0; i < ports.length; i++) {
            if (ports[i] && ports[i].indexOf(port) !== -1) {
                falg = false;
                let item = ports[i].replace(/^\s*|\s*$/g, "").split(" ");
                let id = item[item.length - 1];
                exec(`taskkill  -F -PID ${id}`, [], (err) => {
                    if (err) {
                        console.error('\n error:', error(JSON.stringify(err)));
                        return;
                    }
                    console.log(chalk.green("\n success：已成功终止端口"))
                })
                break;
            }
        }
        if (falg) {
            console.log(chalk.yellow("\n error：未检测到端口"))
        }
    })
  });

  program.parse(process.argv);