jscli
=====

jscli (JavaScript Command-Line Interface) is a small javascript application that imitates
the behavior of a traditional Command-Line Interface terminal.
This is a very experimental version, and is not to be considered as final in any way.

It is written in pure JavaScript and does not use any framwork (jQuery, Prototype etc.),
it supplies several functions that allow the developer to manage the cli, and can of course
be expanded to use whatever commands you want.

Get Started
-----------

First, include `jscli.js`, no ploblems there.

Then you create a new jscli object. Something like this:
    new jscli({
		// Width and height when not in fullscreen
    	width : '500',
    	height : '300',
		
		// ID of the div
    	div : 'jscli',
    	
		// Command interpreter object, see index.html for example
		interpreter : [Object]
		
		// Optional appearance settings
		fontsize : 12,
		fontcolor : 'C4C4C4',
		bgcolor : 'AA7700',
		prompt : '$',
		motd : 'Short message!',
		
		// Optional display control (both false by default)
		starthidden : false,
		fullscreen : true
    });

Public functions
----------------

The following child-functions of the jscli-object may be used:
	bgColor() - changes the background, takes hexvalue: 'FF00FF' or '#FF00FF'
	canvasCreate() - transforms the terminal to a HTML5 canvas for graphics
	canvasDestroy() - reverse back to terminal
	canvasGet() - returns object: {elm:[Canvas Element], ctx:[Canvas 2D Context]}
	create() - (re)creates the jscli instance (called automatically upon initializing the object)
	clearInput() - clears the input field
	clearOutput() - clears the terminal output
	clearOutputTrue() - clears the terminal output without inserting the motd-text
	escapeHTML(string) - escapes special HTML characters
	fontColor(hex), fontSize(int) - change the font of jscli. fontColor takes hexvalue: 'FF00FF' or '#FF00FF'
	inputHide(), inputShow() - shows/hides the input field
	inputFocus(), inputUnfocus() - switches focus to/from the input field
	windowHeight(string), windowWidth(string) - changes width and height of jscli when not in fullscreen. '100' = 100px, '50%' = 50 per cent
	windowHide(hex) - jscli is minimized to a thin discrete box, and is restored if you click on it (or if create() is called). Optionally takes hex-color (defaults to light-gray)
	windowMaximize(), windowNormal() - jscli runs in fullscreen, must be reversed with windowNormal (not by setting width/height)
	write(string) - writes string to the terminal

Example
-------

See index.html


