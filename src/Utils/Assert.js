GUI.AssertException = function(message) { 
  this.message = message; 
};

GUI.AssertException.prototype.toString = function () {
  return 'AssertException: ' + this.message;
};

GUI.assert = function(exp, message) {
  if (!exp) {
    throw new GUI.AssertException(message);
  }
};