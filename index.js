var EventEmitter = require('events').EventEmitter;
var Stream = require('stream');

function wrapAgain(emitter, stream) {
  var listeners = {};


  function liveIn(_stream) {
    _stream.on('end', function() {
      removeAllListeners();
    });
    stream = _stream;
  }
  if (stream) liveIn(stream);

  function removeAllListeners() {
    for(eventType in listeners) {
      listeners[eventType].forEach(function(listener) {
        emitter.removeListener(eventType, listener);
      });
    }
  }

  function addListener(eventType, listener) {
    var eventTypeListeners = listeners[eventType];
    if (! eventTypeListeners) eventTypeListeners = listeners[eventType] = [];
    eventTypeListeners.push(listener);
    emitter.on.apply(emitter, arguments);
  }

  function removeListener(eventType, listener) {
    var eventTypeListeners = listeners[eventType];
    if (eventTypeListeners) {
      var index = eventTypeListeners.indexOf(listener);
      if (index >= 0) eventTypeListeners.splice(index, 1);
    }
    emitter.removeListener(eventType, listener);
  }

  return {
    on: addListener,
    addListener: addListener,
    removeListener: removeListener,
    liveIn: liveIn,
    emit: emitter.emit.bind(emitter),
    setMaxListeners: emitter.setMaxListeners.bind(emitter)
  }
}

function wrap(emitter, stream) {
  if (arguments.length < 2 && emitter instanceof Stream) {
    stream = emitter;
    emitter = undefined;
  }
  if (! emitter) emitter = new EventEmitter();
  return wrapAgain(emitter, stream);
}

module.exports = wrap;