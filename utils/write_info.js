const fs = require("fs");
const getProjectRoot = require("./get_root_dir");

function appendToFile(param, filePath) {
  var info = "";
  console.log("Param Type:", typeof param);

  if (typeof param === "object") {
    info = JSON.stringify(param);
  }
  info += "\n";

  fs.appendFile(filePath, info, (err) => {
    if (err) {
      console.error("fail to write to file：", err);
    } else {
      console.log("The content has been successfully added to the file");
    }
  });
}

function getTimeStr() {
  // 创建一个 Date 对象
  const date = new Date();

  // 获取年份、月份和日期
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份从0开始，所以需要加1
  const day = date.getDate();

  // 拼接成年月日字符串
  const currentDateString = `${year}-${month}-${day}`;
  console.log("currentDateString", currentDateString);
  return currentDateString;
}

function writeInfo(param, logFileName) {
  if (logFileName === null || logFileName === "" || logFileName === undefined) {
    logFileName = "Default";
  }

  var filePath = getProjectRoot();
  filePath += "/logs/Records-";
  filePath += logFileName + "-";
  filePath += getTimeStr();
  filePath += ".log";
  console.log("file Path:", filePath);

  appendToFile(param, filePath);
}

module.exports = writeInfo;
