GUI.CEGUISkin = function()
{
  this._imageSet = null;
  this._imageFile = new Image();
  this._lookNFeel = null;
  this._scheme = null;
  
  this._widgetLooks = {};
};


GUI.CEGUISkin.prototype.setImageSet = function(imageset) {
  this._imageSet = imageset;
};

GUI.CEGUISkin.prototype.setImageFile = function(imageFile) {
  this._imageFile.src = imageFile;
};

GUI.CEGUISkin.prototype.setLookNFeel = function(lookNFeel) {
  this._lookNFeel = lookNFeel;
};

GUI.CEGUISkin.prototype.setScheme = function(scheme) {
  this._scheme = scheme;
};

GUI.CEGUISkin.prototype.addWidgetLook = function(name, widgetLook)
{
  this._widgetLooks[name] = widgetLook;
};