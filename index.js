"use strict"
const reddit = require('./lib/reddit');
const http = require('http');

var server = http.createServer((req,res) => {
  if(req.url == "/" && req.method=="GET") {
    res.write("hello world");
    res.end(); 
    return;
  }
  res.writeHead(404, "Not found");
  res.end();
});

server.listen(1337);

//var models = require('./lib/models');
//models.hello();
//models();

//models.on('event', function() {
  //console.log('received event');
  //console.log(arguments);
//});

//console.log('emitting event...');
//models.emit('event', 1 ,2,3);

reddit.dumpReddit("reddit_content.json",(err) => {
  reddit.readReddit("reddit_content.json",(err,data) => {
    if(err) { console.log(err); return; }
    //console.log(data.toString());
  });
});
