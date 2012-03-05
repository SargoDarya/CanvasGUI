GUI.SVGSprite = function(path) {
  GUI.DisplayObject.call(this);
  this._path = path;
  this._size = {width: 100, height: 100};
};

GUI.SVGSprite.prototype = new GUI.DisplayObject;
GUI.SVGSprite.prototype.constructor = GUI.SVGSprite;

GUI.SVGSprite.prototype.render = function() {
  var pos = GUI.Display.getTLPosition(this);
  this._ctx.drawSvg(this._path, pos.x, pos.y, this._size.width, this._size.height);
};