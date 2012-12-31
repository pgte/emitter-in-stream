var Stream = require('stream');

module.exports = function() {
  var s = new Stream();
  s.end = function() {
    this.emit('end');
  }
  return s;
}