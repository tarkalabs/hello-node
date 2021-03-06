"use strict"
const reddit = require('./lib/reddit');
const http = require('http');
const REDDIT_FILE = "reddit_content.json";
const handleError = (res, err) => {
  res.writeHead(500);
  res.write(JSON.stringify(err));
  res.end();
}
var server = http.createServer((req,res) => {
  if(req.url == "/" && req.method=="GET") {
    reddit.readReddit("reddit_content.json",(err,data) => {
      if(err) {
        handleError(res, err);
        return;
      }
      res.writeHead(200,null,  {"Content-Type": "application/json"});
      res.write(data);
      res.end();
    });
  }
  else if(req.url == "/refresh" && req.method=="POST") {
    reddit.dumpReddit(REDDIT_FILE,(err) => {
      if(err) {
        handleError(res, err);
        return;
      }
      res.write("Content refreshed");
      res.end();
    })
  } else {
    res.writeHead(404, "Not found");
    res.end();
  }
});

server.listen(1337);

setInterval(()=>reddit.dumpReddit(REDDIT_FILE,()=>{}), 30000);
//var models = require('./lib/models');
//models.hello();
//models();

//models.on('event', function() {
  //console.log('received event');
  //console.log(arguments);
//});

//console.log('emitting event...');
//models.emit('event', 1 ,2,3);

