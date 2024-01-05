var FileStreamRotator = require("file-stream-rotator");
var fs = require("fs");
var path = require("path");
const getProjectRoot = require("../utils/get_root_dir");

function getLoggerDirectory() {
  var loggerDirectory = path.join(getProjectRoot(), "logs");
  // ensure log directory exists
  fs.existsSync(loggerDirectory) || fs.mkdirSync(loggerDirectory);
  return loggerDirectory;
}

function getAccessLogStream() {
  // create a rotating write stream
  var accessLogStream = FileStreamRotator.getStream({
    date_format: "YYYYMMDD",
    filename: path.join(getLoggerDirectory(), "Access-%DATE%.log"),
    frequency: "daily",
    verbose: true,
  });
  return accessLogStream;
}

module.exports = getAccessLogStream;
