Object.toType = (function toType(global) {
  return function(obj) {
    if (obj === global) {
      return "global";
    }

    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  }
})(this)

var logObjectInfo = function(name, obj) {
    var message = obj ?
        name + " has value '" + obj + "'  and is of type " + Object.toType(obj) :
        name + " is undefined.";
    
    log(message);
}