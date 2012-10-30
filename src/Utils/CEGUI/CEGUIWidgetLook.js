GUI.CEGUIWidgetLook = function()
{
  this._properties = {};
  this._imagerySections = {};
  this._stateImagery = {};
  
  this.property = {};
};

GUI.CEGUIWidgetLook.prototype.addProperty = function(name, value, redraw)
{
  var self = this;
  redraw = redraw || false;
  this._properties[name] = {value: value, redraw: redraw};
  this.property.__defineGetter__(name, function(){
    return self._properties[name].value;
  });
  this.property.__defineSetter__(name, function(val){
    self._properties[name].value = val;
  });
};

GUI.CEGUIWidgetLook.prototype.addImagerySection = function(name, value)
{
  var self = this;
  this._imagerySections[name] = value;
};