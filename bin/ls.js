/*
 * @Author: your name
 * @Date: 2021-04-14 14:13:04
 * @LastEditTime: 2021-04-14 14:46:16
 * @LastEditors: Please set LastEditors
 * @Description: 查看端口列表
 * @FilePath: \closeport\bin\ls.js
 */
const { exec } = require('child_process');
const chalk = require('chalk');
const error = chalk.bold.red;
module.exports = async function (){
  exec('netstat -aon| findstr "80"', [], (err, stdout) => {
    if (err) {
        console.log('\n error:',error(JSON.stringify(err)));
        return;
    }

    let ports = stdout.split("\n");
    ports.forEach(element => {
      element.replace(',','')
      element.replace('，','')
      console.log(chalk.green(element))
    });
  })
}