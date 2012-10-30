GUI.CEGUISkinParser = function(obj) 
{
  GUI.assert(obj.skinPath != null, "Skin Path is not given");
  GUI.assert(obj.skin != null, "Skin Path is not given");
  
  var self = this;
  
  this.callback = obj.callback || null;
  
  this.skinName = obj.skin;
  this.skinPath = obj.skinPath;
  this.fullSkinPath = this.skinPath+'/'+this.skinName+'Skin/';
  this.skin = new GUI.CEGUISkin();
  
  this.loaded = {
    lookNFeel: false,
    scheme: false,
    imageset: false,
    texture: false
  };
  
  function parse(data) {
    self.parse(data);
  }
  
  GUI.AjaxHelper({
    url: this.fullSkinPath+this.skinName+'.scheme',
    onSuccess: parse
  });
};

GUI.CEGUISkinParser.prototype.parse = function(data)
{
  var self = this; 
  
  xmlDoc = this.getXML(data);
  
  this.parseImageSet(xmlDoc.getElementsByTagName('Imageset')[0].getAttribute("Filename"));
  
  // load image set
  //this.skin.loadImageSet(xmlDoc.getElementsByTagName('Imageset')[0].getAttribute("Filename"));
  
  // Defines custom UI
  this.parseLookNFeel(xmlDoc.getElementsByTagName('LookNFeel')[0].getAttribute("Filename"));
};


GUI.CEGUISkinParser.prototype.parseImageSet = function(imageSetPath)
{
  var self = this;
  
  function parse(data)
  {
    var xmlDoc = self.getXML(data);
    var imgSet = xmlDoc.getElementsByTagName('Imageset')[0];
    var imgFile = imgSet.getAttribute("Imagefile");
    self.skin.setImageFile(self.fullSkinPath+imgFile);
    
    var images = xmlDoc.getElementsByTagName('Image');
    var frameObj = {
      frames: {},
      meta: {
        image: imgFile,
        format: "RGBA8888",
        size: {
          w:imgSet.getAttribute("NativeHorzRes"),
          h:imgSet.getAttribute("NativeVertRes")},
        scale: 1
      }
    }
    
    frameObj.texture = new Image();
    frameObj.texture.src = self.fullSkinPath+imgFile;
    
    for(var i=0; i<images.length; i++) {
      // Create a frameset
      var frameName = images[i].getAttribute("Name");
      var x = images[i].getAttribute("XPos");
      var y = images[i].getAttribute("YPos");
      var w = images[i].getAttribute("Width");
      var h = images[i].getAttribute("Height");
      var frame = {
        "frame": {"x":x,"y":y,"w":w,"h":h},
        "spriteSourceSize": {"x":0,"y":0,"w":w,"h":h},
        "sourceSize": {"w":w,"h":h}
      }
      frameObj.frames[frameName] = frame;
    }
    
    GUI.SpriteFrameCache.addSpriteFrameFile(frameObj);
  }
  
  GUI.AjaxHelper({
    url: this.fullSkinPath+imageSetPath,
    onSuccess: parse
  });
};

GUI.CEGUISkinParser.prototype.parseLookNFeel = function(lookNFeelPath)
{
  var self = this;
  
  function parse(data)
  {
    var xmlDoc = self.getXML(data);
    //self.skin.setImageFile(self.fullSkinPath+xmlDoc.getElementsByTagName('Imageset')[0].getAttribute("Imagefile"));
    // write parser code here
    var widgetLooks = {};
    
    var widgetLookNodes = xmlDoc.documentElement.childNodes;
    for(var i=0; i<widgetLookNodes.length; i++) {
      var node = widgetLookNodes[i];
      if(node.nodeName !== "WidgetLook") continue;

      var widgetName = node.getAttribute('name');
      self.skin.addWidgetLook(widgetName, self.parseWidgetLookNode(node));
    }
    
    self.loaded.lookNFeel = true;
    self.loadDone();
  }
  
  GUI.AjaxHelper({
    url: this.fullSkinPath+lookNFeelPath,
    onSuccess: parse
  });
};

GUI.CEGUISkinParser.prototype.parseWidgetLookNode = function(widgetNode)
{
  var widgetLook = new GUI.CEGUIWidgetLook();
  
  for(var i=0; i<widgetNode.childNodes.length; i++) {
    var node = widgetNode.childNodes[i];
    
    switch(node.nodeName) {
      case 'ImagerySection':
        var components = this.parseImagerySection(node);
        widgetLook.addImagerySection(node.getAttribute('name'), components);
        break;
        
      case 'StateImagery':
        //console.log(name);
        break;
        
      case 'PropertyDefinition':
        var redraw = (node.hasAttribute('redrawOnWrite')) ? node.getAttribute('redrawOnWrite') : false;
        widgetLook.addProperty(node.getAttribute('name'), node.getAttribute('initialValue'), redraw);
        break;
    }
  }
  
  return widgetLook;
};

GUI.CEGUISkinParser.prototype.parseImagerySection = function(imageryNode) 
{
  var components = {};
  var k=0;
  
  for(var i=0; i<imageryNode.childNodes.length; i++) {
    var node = imageryNode.childNodes[i];
    
    if(node.nodeName === '#text') continue;
    var component = {};
    var nodeName = node.nodeName;
    var nodeArea = node.getElementsByTagName('Area')[0];
    
    // get Area
    if(nodeArea) {
      var area = {
        leftEdge: 0,
        topEdge: 0,
        width: 0,
        height: 0
      };
      
      var areaChilds = nodeArea.getElementsByTagName('Dim');
      for(k=0; k<areaChilds.length; k++) {
        var cn = areaChilds[k];
        console.log(cn);
        if(cn.nodeName === '#text') continue;
        switch(cn.getAttribute('type')) {
          case 'LeftEdge':
          case 'TopEdge':
            area[cn.getAttribute('type')] = cn.childNodes[0].getAttribute('value');
            break;

          case 'Width':
          case 'Height':
            area[cn.getAttribute('type')] = cn.childNodes[0].getAttribute('scale');
            break;
        }
      };

      component.area = area;  
    }
    
    components[nodeName] = component;
    
  }
  
  return components;
}


GUI.CEGUISkinParser.prototype.loadDone = function()
{
  
};

GUI.CEGUISkinParser.prototype.getXML = function(data)
{
  var parser;
  var xmlDoc;
  
  if (window.DOMParser)
  {
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(data,"text/xml");
  }
  else // Internet Explorer (grrrr...)
  {
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async=false;
    xmlDoc.loadXML(data); 
  }
  
  return xmlDoc;
};