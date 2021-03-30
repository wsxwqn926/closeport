#! /usr/bin/env node
const { exec } = require('child_process');
const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
});
console.info(chalk[color](str));
    console.log('');
console.log(`\x1b[1m\x1b[31m 请输入要终止的端口号： \x1b[0m`)
rl.question(`Please enter the port `, (port) => {
    exec('netstat -aon| findstr "80"', [], (err, stdout) => {
        if (err) {
            console.log(err);
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
                        console.error('error:', err);
                        return;
                    }
                    console.log(`\x1b[1m\x1b[31m 已成功终止端口 ${port} \x1b[0m`)
                })
                break;
            }
        }
        if (falg) {
            console.log(`\x1b[1m\x1b[31m 未检测到端口 ${port} \x1b[0m`)
        }
    })
    rl.close()

});
