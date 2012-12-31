# emitter-in-stream

Creates an event emitter attached to another event emitter, but bound to stream life.

When stream ends, all event listeners are removed.

## Install

```bash
$ npm install emitter-in-stream
```

## Require

```javascript
var EIS = require('emitter-in-stream');
```

## Wrap emitter and stream

```javascript
var ee = new EventEmitter();
var stream = //...

var eis = EIS(ee, stream);

// or

var eis = EIS(ee);
eis.liveIn(stream);
```

## When stream ends, all listeners are removed from original emitter

```javascript
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
```

# Licence

MIT