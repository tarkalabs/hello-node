import db from "./db";
import Q from "q";
import {map, pick} from "lodash";
import {spawn} from "child_process";

export default class RedditLib {
  constructor(fileLocation) {
    this.fileLocation = fileLocation;
  }
  downloadRedditProcess(url) {
    return spawn("curl", [url]);
  }
  downloadReddit() {
    let promise = Q.Promise((resolve,reject)  => {
      var redditProcess = this.downloadRedditProcess("https://www.reddit.com/hot.json");
      var redditContent = "";

      redditProcess.stdout.on("data",(data) => {
        redditContent = redditContent+data.toString();
      });

      redditProcess.on("close", (code) => {
        resolve(redditContent);
      });
    });
    return promise;
  }
  dumpReddit() {
    return this.downloadReddit().then((content) => {
        let stories = JSON.parse(content);
        let entries = map(stories.data.children, (child)=> pick(child.data, ["title","score","num_comments","url"]));
        return db("posts").insert(entries)
    });
  }
  readReddit() {
    return db.select().from("posts");
  }
}
