GUI.TextLabel = function(){
  GUI.DisplayObject.call(this);
  this._lineHeight = 14;
  this._fontSize = 12;
  this._font = 'Arial'
  this._fontStyle = '';
  this._text = '';
  this._color = '#000000';
  this._autoResize = true;
  
  // size changing styles 
  this._padding = [0, 0, 0, 0];
};

GUI.TextLabel.prototype = new GUI.DisplayObject;
GUI.TextLabel.prototype.constructor = GUI.TextLabel;

GUI.TextLabel.prototype.fontSize = function(size) {
  if(typeof size == 'number') {
    this._fontSize = size;
    GUI.Display.Manager._ctx.font = this._fontSize+'px '+this._font;
    size = GUI.Display.Manager._ctx.measureText(this._text);
    if(this._autoResize) {
      this.size(size.width+this._padding[1]+this._padding[3], size.height+this._padding[0]+this._padding[2]);
    }
    this.invalidateRect();
  }
  return this._fontSize;
}

GUI.TextLabel.prototype.text = function(text) {
  if(typeof text === 'string') {
    this._text = text;
    var size = GUI.Display.Manager._ctx.measureText(this._text);
    if(this._autoResize) {
        this.size(size.width+this._padding[1]+this._padding[3], size.height+this._padding[0]+this._padding[2]);
    }
    this.invalidateRect();
  }
  return this._text;
};

GUI.TextLabel.prototype.render = function()
{
  var pos = GUI.Display.getTLPosition(this);
  this._ctx.fillStyle = this._color;
  GUI.Display.Manager._ctx.font = this._fontSize+'px '+this._font;
  this._ctx.fillText(this._text, pos.x+this._padding[0], pos.y+this._lineHeight+this._padding[3]);
  
  GUI.DisplayObject.prototype.render.call(this);
};