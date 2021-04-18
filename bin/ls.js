/*
 * @Author: your name
 * @Date: 2021-04-14 14:13:04
 * @LastEditTime: 2021-04-18 16:41:39
 * @LastEditors: Please set LastEditors
 * @Description: 查看端口列表
 * @FilePath: \closeport\bin\ls.js
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
    if(!port){
      ports.forEach(element => {
        element.replace(',','')
        element.replace('，','')
        console.log(chalk.green(element))
      });
    }else{
      let falg = true;
      for (let i = 0; i < ports.length; i++) {
        if (ports[i] && ports[i].indexOf(port) !== -1) {
            falg = false;
            let item = ports[i].replace(/^\s*|\s*$/g, "").split(" ");
            let id = item[item.length - 1];
            exec(`tasklist|findstr ${id}`, [], (err, tasklist) => {
                if (err) {
                    console.error('\n error:', error(JSON.stringify(err)));
                    return;
                }
                
                console.log(chalk.green(`\n 端口：${port} \n ${ports[i]}`))
                console.log(chalk.green(`\n 使用程序：`))
                let tasklists = tasklist.split("\n");
                tasklists.forEach(element => {
                  element.replace(',','')
                  element.replace('，','')
                  console.log(chalk.green(`  ${element}`))
                });
            })
            break;
        }
      }
      if (falg) {
          console.log(chalk.yellow(`\n 未检测到端口：${port}`))
      }
    }
  })
}