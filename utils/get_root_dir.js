const path = require("path");
const fs = require("fs");

//使用__dirname获取当前文件的目录,并在1个循环中不断向上查找父目录,直到找到包含package.json文件的目录
function getProjectRoot() {
  let currentDir = __dirname;
  while (!fs.existsSync(path.join(currentDir, "package.json"))) {
    currentDir = path.dirname(currentDir);
  }
  return currentDir;
}
// console.log(getProjectRoot());

module.exports = getProjectRoot;
