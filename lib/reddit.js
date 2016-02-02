"use strict"
const fs = require("fs");
const spawn = require("child_process").spawn;

var downloadRedditProcess = (url) => spawn("curl",[url]);

var downloadReddit = function(callback) {
  var redditProcess = downloadRedditProcess("https://www.reddit.com/hot.json");
  var redditContent = "";

  redditProcess.stdout.on("data",(data) => {
    redditContent = redditContent+data.toString();
  });

  redditProcess.on("close", (code) => {
    callback(redditContent);
  });
}
var dumpReddit = function(location, callback) {
  downloadReddit((content) => {
    fs.open(location,'w', (err, fd) => {
      if(err) {
        callback(err, null);
        return;
      }
      fs.write(fd, content, (err) => {
        fs.close(fd);
        if(!err) {
          callback(null, "done");
        } else {
          callback(err,null);
        }
      });

    });
  });
}
exports.downloadReddit = downloadReddit;
exports.dumpReddit = dumpReddit;
