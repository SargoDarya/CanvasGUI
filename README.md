# CanvasGUI
### An open source JavaScript GUI library
CanvasGUI aims to be a simple solution for implementing scalable GUI components in browser games.

## Usage
Include the script in your application:

```html
<script src="js/CanvasGUI.js"></script>
```

This will automatically create a Manager instance and set the size to fit the document. The GUI itself is 
still invisible though.

To get the GUI visible and running try this:

```html
<script>
// Shorthand for the GUI
var guiManager = GUI.Display.Manager;
guiManager.setSize(window.innerWidth, window.innerHeight);

// Append the DOM element
document.body.appendChild(guiManager.domElement);

// Create a new TextLabel element and add it to the stage
var textLabel = new GUI.TextLabel();
textLabel.position(0.5, 0.5);       // Center on Stage
textLabel.anchorPoint(0.5, 0.5);    // Put anchor to center
textLabel.fontSize(14);             // Set fontsize
textLabel.text('Here we go');
guiManager.addChild(textLabel);

// Render changed things
guiManager.render();
</script>
```

This is just the basic setup to get a quick display. In a real world application you probably want to have 
more.

## Injecting Events
Of course there's more to it than just displaying plain DisplayObjects. Maybe you want to respond to 
certain events. For this to work you have to set up EventListeners and re-route the events to the manager
instance.

If you want to just test the event bindings you can call the bindEvents method of the manager to automatically
bind to all events. However, in a real world application it's smarter to use the appropriate inject
method as you most probably have some event handlers already defined.

```html
<script>
// Shorthand for the GUI
var guiManager = GUI.Display.Manager;

// Append the DOM element
document.body.appendChild(guiManager.domElement);
	
// Auto Bind
guiManager.bindEvents();

// Inject events manually
document.addEventListener('keydown', guiManager.injectKeyDown);
document.addEventListener('keyup', guiManager.injectKeyUp); 
document.addEventListener('mousedown', guiManager.injectMouseDown); 
document.addEventListener('mousemove', guiManager.injectMouseMove); 

// Render changed things
guiManager.render();
</script>
```