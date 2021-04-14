/*
 * @Author: your name
 * @Date: 2021-04-14 14:10:08
 * @LastEditTime: 2021-04-14 14:16:04
 * @LastEditors: Please set LastEditors
 * @Description: 关闭端口
 * @FilePath: \closeport\bin\closePort.js
 */
const { exec } = require('child_process');
const chalk = require('chalk');
const error = chalk.bold.red;

module.exports = async function (port){
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
}