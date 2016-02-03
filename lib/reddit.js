import db from "./db";
import Q from "q";
import request from "superagent";
import {map, pick} from "lodash";
import {spawn} from "child_process";

export default class RedditLib {
  constructor(fileLocation) {
    this.fileLocation = fileLocation;
  }
  downloadReddit() {
    let url = "https://www.reddit.com/hot.json";
    let promise = Q.Promise((resolve, reject) => {
      request.get(url).end((err,res) => resolve(res.body));
    });
    return promise;
  }
  dumpReddit() {
    return this.downloadReddit().then((content) => {
        let entries = map(content.data.children, (child)=> pick(child.data, ["title","score","num_comments","url"]));
        return db("posts").insert(entries)
    }).fail((err) => console.log(err));
  }
  readReddit() {
    return db.select().from("posts");
  }
}
