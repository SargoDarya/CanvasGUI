GUI.Button = function() {
  
  this._defaultFrame = null;
  this._mouseOverFrame = null;
  this._mouseDownFrame = null;
  
  this.spriteFrame = this._defaultFrame;
  
};

GUI.Button.prototype = new GUI.Sprite;
GUI.Button.prototype.constructor = GUI.Button;

GUI.Button.prototype.fromFiles = function(obj)
{
  
};

GUI.Button.prototype.fromSpriteFrames = function(obj)
{
  this._defaultFrame   = GUI.SpriteFrameCache.getSpriteFrame(obj.up)   || null;
  this._mouseOverFrame = GUI.SpriteFrameCache.getSpriteFrame(obj.over) || null;
  this._mouseDownFrame = GUI.SpriteFrameCache.getSpriteFrame(obj.down) || null;
  
  if(this._defaultFrame) {
    this.spriteFrame = this._defaultFrame;
    this.image = this._defaultFrame.texture;
    this.size(this._defaultFrame.sourceSize.w, this._defaultFrame.sourceSize.h);
  }
};

GUI.Button.prototype.mouseDownHandler = function(evt)
{
  this._dirty = true;
  this.spriteFrame = this._mouseDownFrame;
  this.invalidateRect();
};

GUI.Button.prototype.mouseUpHandler = function(evt)
{
  this._dirty = true;
  this.spriteFrame = this._mouseOverFrame;
  this.invalidateRect();
};

GUI.Button.prototype.mouseOverHandler = function(evt)
{
  if(this.spriteFrame != this._mouseDownFrame) {
    this._dirty = true;
    this.spriteFrame = this._mouseOverFrame;
    this.invalidateRect();
  }
};

GUI.Button.prototype.mouseOutHandler = function(evt)
{
  this._dirty = true;
  this.spriteFrame = this._defaultFrame;
  this.invalidateRect();
};

GUI.Button.prototype.render = function()
{
  GUI.Sprite.prototype.render.call(this);
};