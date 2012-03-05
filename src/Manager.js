GUI.Manager = function(){
  
  // Create the DOM
  this.domElement = document.createElement('canvas');
  this.domElement.id = 'gui';
  
  this._size = new GUI.Point(window.innerWidth, window.innerHeight);
  
  this._ctx = this.domElement.getContext('2d');
  this._ctx.canvas.width = this._size.x;
  this._ctx.canvas.height = this._size.y;
  
  // Properties
  this._stage = new GUI.DisplayObject();
  this._focus = null;
  
  this._stage._ctx = this._ctx;
  this._stage.tag("Stage");
  this._stage.size(this._size.x, this._size.y);
  
  this._mouse = new GUI.Mouse();
  
};

/**
 * Adds a children to the Stage
 * @param {GUI.DisplayObject}, child
 * @return void
 */
GUI.Manager.prototype.addChild = function(child)
{
  this._stage.addChild(child);
};

/**
 * Resizes the canvas on resize
 * @param {Number}, w
 * @param {Number}, h
 * @return void
 */
GUI.Manager.prototype.setSize = function(w, h) 
{
  this._ctx.canvas.width = w;
  this._ctx.canvas.height = h;
  
  this._stage.size(this._size.x, this._size.y);
  this._stage.redraw();
  
  GUI.Display.dirtyRectangles.push(new GUI.Rect({width: w, height: h}, {x: 0, y: 0}));
};

/**
 * Clears and removes all childs from the stage
 * @return void
 */
GUI.Manager.prototype.clean = function()
{
  this._stage.removeAllChilds();
  this._stage.invalidateRect();
};

/**
 * Mouse Move Handler
 * @param {MouseEvent}, evt
 * @return void
 */
GUI.Manager.prototype.injectMouseMove = function(evt)
{ 
  this._mouse.injectMoveEvent(evt);
  
  // Update because of cursor
  var r = this._mouse._cursor.rect();
  var rp = GUI.Display.getTLPosition(this._mouse._cursor);
  r.position(rp.x, rp.y);
  this._stage.redrawRect(r);
};

/**
 * Mouse Click Handler
 * @param {MouseEvent}, evt
 * @return void
 */
GUI.Manager.prototype.injectMouseDown = function(evt)
{
  var pos = this._mouse.position();
  var p = new GUI.Point(pos.x, pos.y);
  this._focus = this._stage.getChildAtPoint(p);
};

/**
 * Keydown Handler
 * @param {KeyboardEvent}, evt
 * @return void
 */
GUI.Manager.prototype.injectKeyDown = function(evt)
{
  if(this._focus && this._focus.handleKeyDown) {
    this._focus.handleKeyDown(evt)
  }
};

/**
 * Keyup Handler
 * @param {KeyboardEvent}, evt
 * @return void
 */
GUI.Manager.prototype.injectKeyUp = function(evt)
{
  if(this._focus && this._focus.handleKeyUp) {
    this._focus.handleKeyUp(evt)
  }
};

/**
 * Bind events
 * @param {KeyboardEvent}, evt
 * @return void
 */
GUI.Manager.prototype.bindEvents = function()
{
  var self = this;
  var fnc = (document.addEventListener) ? 'addEventListener' : 'attachEvent';
  document[fnc]('keydown', function(evt) { 
    self.injectKeyDown(evt); 
  });
  document[fnc]('keyup', function(evt) { 
    self.injectKeyUp(evt); 
  });
  document[fnc]('mousedown', function(evt) { 
    self.injectMouseDown(evt); 
  });
  document[fnc]('mousemove', function(evt) { 
    self.injectMouseMove(evt); 
  });
};

/**
 * Render the GUI
 * @return void
 */
GUI.Manager.prototype.render = function() 
{
  if(!GUI.Display.dirtyRectangles.length) return;
  for(var i=0; i<GUI.Display.dirtyRectangles.length; i++) {
    var r = GUI.Display.dirtyRectangles[i];
    r._position = GUI.Display.getDenormalizedPosition(r._position.x, r._position.y);
    this._ctx.clearRect(r.position().x, r.position().y, r.size().width, r.size().height);
  }

  this._stage.render();
  GUI.Display.dirtyRectangles = [];
};