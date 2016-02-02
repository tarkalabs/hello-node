"use strict"
const reddit = require('./lib/reddit');

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
    console.log(data.toString());
  });
});
