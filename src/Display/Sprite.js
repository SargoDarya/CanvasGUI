GUI.Sprite = function() {
  GUI.DisplayObject.call(this);
  
  this.image = null;
  this.spriteFrame = null;
};

GUI.Sprite.prototype = new GUI.DisplayObject;
GUI.Sprite.prototype.constructor = GUI.Sprite;

/**
 * Load a sprite from a remote path
 * @param {String}, path
 * @return void
 */
GUI.Sprite.prototype.fromPath = function(path)
{
  var self = this;
  
  this.isVisible(false);
  
  this.image = new Image();
  this.image.onload = function(evt) {
    self.remoteLoadHandler(evt);
  }
  this.image.src = path;
};

GUI.Sprite.prototype.fromSpriteFrame = function(frameName)
{
  var spriteFrame = GUI.SpriteFrameCache.getSpriteFrame(frameName);
  
  if(spriteFrame) {
    this.spriteFrame = spriteFrame;
    this.image = spriteFrame.texture;
    this.size(spriteFrame.sourceSize.w, spriteFrame.sourceSize.h);
  }
};

GUI.Sprite.prototype.remoteLoadHandler = function(evt) 
{
  this.isVisible(true);
  this.isDirty(true);
  this.size(this.image.width, this.image.height);
};

GUI.Sprite.prototype.render = function() 
{
  var pos = GUI.Display.getTLPosition(this);
  if(this.spriteFrame) {
    var f = this.spriteFrame;
    this._ctx.drawImage(this.image, f.frame.x, f.frame.y, f.frame.w, f.frame.h,
      pos.x, pos.y, this._size.width, this._size.height);
  } else {
    this._ctx.drawImage(this.image, pos.x, pos.y);
  }

  this._dirty = false;
  
  GUI.DisplayObject.prototype.render.call(this);
};