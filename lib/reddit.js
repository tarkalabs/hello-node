import fs from "fs";
import {spawn} from "child_process";

export default class RedditLib {
  constructor(fileLocation) {
    this.fileLocation = fileLocation;
  }
  downloadRedditProcess(url) {
    return spawn("curl", [url]);
  }
  downloadReddit(callback) {
    var redditProcess = this.downloadRedditProcess("https://www.reddit.com/hot.json");
    var redditContent = "";

    redditProcess.stdout.on("data",(data) => {
      redditContent = redditContent+data.toString();
    });

    redditProcess.on("close", (code) => {
      callback(redditContent);
    });
  }
  dumpReddit(callback) {
    console.log("dumping");
    this.downloadReddit((content) => {
      fs.open(this.fileLocation,'w', (err, fd) => {
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
  readReddit(callback) {
    fs.open(this.fileLocation,'r',(err,fd) => {
      if(err) {
        callback(err,null);
        return;
      }
      fs.readFile(fd,(err,data) => {
        fs.close(fd);
        callback(err,data);
      });
    });
  }
}
