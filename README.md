# CanvasGUI

### An open source JavaScript GUI library

CanvasGUI aims to be a simple solution for implementing scalable GUI components in browser games.

## Usage

Include the script in your application:

```html
<script src="js/CanvasGUI.js"></script>
```

This will automatically create a Manager instance and set the size to fit the document. The GUI itself is still invisible though.

To get the GUI visible and running try this:

```html
<script>
  // Shorthand for the GUI
  var guiManager = GUI.Display.Manager;

  // Append the DOM element
	document.body.appendChild(guiManager.domElement);
	
	// Create a new TextLabel element and add it to the stage
	var textLabel = new GUI.TextLabel();
	textLabel.position(0.5, 0.5);			// Center on Stage
	textLabel.anchorPoint(0.5, 0.5);	// Put anchor to center
	textLabel.fontSize(14);						// Set fontsize
	guiManager.add(textLabel);
	
	// Render changed things
	guiManager.render();
</script>
```