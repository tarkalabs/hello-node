"use strict"
var EventEmitter = require('events');
var util = require('util');

class MyEmitter extends EventEmitter {
  constructor() {
    super();
  }
}
//var MyEmitter = function(){
  //EventEmitter.call(this);
//}

//util.inherits(MyEmitter, EventEmitter);

var emitter = new MyEmitter();

module.exports = emitter;
