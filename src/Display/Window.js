GUI.Window = function(){
  GUI.DisplayObject.call(this);
  
  this._dirty = false;
  this._backgroundColor = "#000000";
};

GUI.Window.prototype = new GUI.DisplayObject;
GUI.Window.prototype.constructor = GUI.Window;

GUI.Window.prototype.backgroundColor = function(backgroundColor) {
  if(typeof backgroundColor == 'string') this._backgroundColor = backgroundColor;
  return this._background
};

GUI.Window.prototype.render = function()
{
  var pos = GUI.Display.getTLPosition(this);

  this._ctx.fillStyle = this._backgroundColor;
  this._ctx.fillRect(pos.x, pos.y, this._size.width, this._size.height);
  
  GUI.DisplayObject.prototype.render.call(this);
};