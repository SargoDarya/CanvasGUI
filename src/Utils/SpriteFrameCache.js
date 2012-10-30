GUI.SpriteFrameCache = {
  _frameFiles: []
};

GUI.SpriteFrameCache.spritesFromFile = function(jsonFile, callback)
{
  function parseFile(data)
  {
    var img = new Image();
    img.src = data.meta.image;
    img.onload = callback;

    data.texture = img;
    
    GUI.SpriteFrameCache._frameFiles.push(data);
  };
  
  GUI.AjaxHelper({
    url: jsonFile,
    onSuccess: parseFile,
    type: 'json'
  });
};

GUI.SpriteFrameCache.getSpriteFrame = function(spriteName) 
{
  for(var i=0; i<GUI.SpriteFrameCache._frameFiles.length; i++) {
    var file = GUI.SpriteFrameCache._frameFiles[i];
    if(file.frames[spriteName]) {
      var frame = file.frames[spriteName];
      frame.texture = file.texture;
      return frame;
    }
  }
  
  return null;
};

GUI.SpriteFrameCache.addSpriteFrameFile = function(spriteFrameFile)
{
  GUI.SpriteFrameCache._frameFiles.push(spriteFrameFile);
};