// console.log("Hello World!");

const express = require("express");
const os = require("os");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/system-info", (req, res) => {
  res.json({
    platform: os.platform(),
    release: os.release(),
  });
});

app.get("/log-visit", (req, res) => {
  function logVisitor(visitorData) {
    const logFilePath = path.join(__dirname, "visitors.log");
    fs.appendFileSync(logFilePath, visitorData + "\n");
  }
  const visitorData = `Visitor at ${new Date().toISOString()}`;
  logVisitor(visitorData);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Visit logged");
});

app.get("/show-log", (req, res) => {
  function getLogFile() {
    const logFilePath = path.join(__dirname, "visitors.log");
    return fs.readFileSync(logFilePath, "utf8");
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(getLogFile());
});

app.listen(5001, () => {});
