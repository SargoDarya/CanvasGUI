GUI.TextInput = function() {
  GUI.TextLabel.call(this);
  this._backgroundColor = "rgba(255, 255, 255, 0.7)";
  this._caretColor = "#FF0000";
  this._caretIndex = 0;
  this._dirty = true;
  this._focus = false;
  this._clearOnEnter = true;
  this._enterCallback = null;
  this._autoResize = false;
};

GUI.TextInput.prototype = new GUI.TextLabel;
GUI.TextInput.prototype.constructor = GUI.TextInput;

GUI.TextInput.prototype.handleKeyDown = function(evt)
{
  if(evt.metaKey || evt.ctrlKey || evt.altKey) return null;
  
  switch (evt.which) {
    case 8: // Backspace
      this._text = this._text.substr(0,this._caretIndex-1) + this._text.substr(this._caretIndex);
      if(this._caretIndex-1 > 0) this._caretIndex--;
      break;
  
    case 13:
      if(typeof this._enterCallback == 'function') this._enterCallback(this._text);
      if(this._clearOnEnter) {
        this._text = '';
        this._caretIndex = 0;
      }
      break;
  
    case 37:
      if(this._caretIndex-1 >= 0) this._caretIndex--;
      break;
    
    case 39:
      if(this._caretIndex < this._text.length) this._caretIndex++;
      break;

    default:
      var c = String.fromCharCode(evt.which);
      c = (evt.shiftKey) ? c : c.toLowerCase();
      this._text = this._text.substr(0,this._caretIndex) + c + this._text.substr(this._caretIndex);
      this._caretIndex++;
      break;
  }
  
  this._dirty = true;
  this.invalidateRect();
};

/**
 * MouseDownHandler, tries to figure out where to position the caret
 * @param  MouseEvent evt
 * @param  Point      point
 * @return Boolean    if the event should bubbles up
 */
GUI.TextInput.prototype.mouseDownHandler = function(evt, point)
{
  var pos = GUI.Display.getTLPosition(this);
  
  // measure text width
  GUI.Display.Manager._ctx.font = this._fontSize+'px '+this._font;
  var textWidth = this._ctx.measureText(this._text).width;
  var widthPerCharacter = textWidth/this._text.length;
  
  var diff = point._position.x - pos.x;
  var newCaretIndex = Math.round(diff/widthPerCharacter);
  this._caretIndex = (newCaretIndex > this._text.length-1) ? this._text.length-1 : newCaretIndex;
  this.isDirty();
  return false;
};

GUI.TextInput.prototype.render = function() 
{
  if(!this._dirty) return false;
  
  var pos = GUI.Display.getTLPosition(this);
  this._ctx.fillStyle = this._backgroundColor;
  this._ctx.fillRect(pos.x, pos.y, this._size.width, this._size.height);
  
  // Render Caret if object has focus
  if(this._focus) {
      GUI.Display.Manager._ctx.font = this._fontSize+'px '+this._font;
      var strokePosX = pos.x+this._ctx.measureText(this._text.substr(0, this._caretIndex)).width;
      this._ctx.strokeStyle = this._caretColor;
      this._ctx.beginPath();
      this._ctx.lineWidth = 1;
      this._ctx.moveTo(strokePosX+1.5, pos.y+this._lineHeight-this._fontSize);
      this._ctx.lineTo(strokePosX+1.5, pos.y+this._lineHeight);
      this._ctx.stroke();
      this._ctx.closePath();
  }
  
  GUI.TextLabel.prototype.render.call(this);
};