var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var journalRouter = require("./routes/journal_router");
var accountRouter = require("./routes/account_router");

var getAccessLogStream = require("./config/custom_logger");
var initialization = require("./config/initialization");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// initialization
app.use(function (req, res, next) {
  initialization.tblInitialization();
  initialization.requestsInformation(req);
  next();
});

var accessLogStream = getAccessLogStream();
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", journalRouter);
app.use("/", accountRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
); // 使用 cors 中间件

module.exports = app;
