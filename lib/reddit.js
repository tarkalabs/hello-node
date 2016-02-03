import db from "./db";
import {map, pick} from "lodash";
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
      let stories = JSON.parse(content);
      let entries = map(stories.data.children, (child)=> pick(child.data, ["title","score","num_comments","url"]));
      db("posts").insert(entries).then(()=>{
        callback(null,"done");
      });
    });
  }
  readReddit(callback) {
    db.select().from("posts").then((data) => {
      callback(null,data);
    });
  }
}
