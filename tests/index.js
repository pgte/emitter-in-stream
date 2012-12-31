var emitterInStream = require('../');
var stream = require('./stream');
var EventEmitter = require('events').EventEmitter;
var test = require('tap').test;

test('creates emitter', function(t) {
  t.plan(2);
  var eis = emitterInStream();
  t.ok(!! eis.on);
  t.ok(!! eis.emit);
});

test('wraps emitter', function(t) {
  t.plan(2);
  var ee = new EventEmitter();
  var eis = emitterInStream(ee);
  t.ok(!! eis.on);
  t.ok(!! eis.emit);
});

test('emits', function(t) {
  t.plan(3);

  var eis = emitterInStream();
  
  eis.on('event', function(a, b) {
    t.equal(a, 'abc');
    t.equal(b, 'def');
  });
  eis.emit('event', 'abc', 'def');
  t.ok(true);
});

test('lives in stream', function(t) {
  t.plan(3);
  var s = stream();
  var eis = emitterInStream(s);
  eis.on('event', function(a, b) {
    t.equal(a, 'abc');
    t.equal(b, 'def');
  });
  eis.emit('event', 'abc', 'def');
  t.ok(true);

});

test('lives in stream and reacts to stream end', function(t) {
  t.plan(3);
  var s = stream();
  var eis = emitterInStream();
  eis.liveIn(s);
  eis.on('event', function(a, b) {
    t.equal(a, 'abc');
    t.equal(b, 'def');
    s.end();
  });
  eis.emit('event', 'abc', 'def');
  eis.emit('event', 'ghi', 'jkl');
  t.ok(true);
});
