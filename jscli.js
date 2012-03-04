/*
	jscli (JavaScript Command-line Interface) v0.3.2 (Experimental!)
	By Tomas Thelander
	
	https://github.com/dekadans/jscli
*/

/* Constructor */
function jscli(args)
{
	if (args != null)
	{
		if (args.bgcolor != null)
			this.bc = args.bgcolor;
		
		if (args.div != null)
			this.div = args.div;
		
		if (args.fontsize != null)
			this.fs = args.fontsize;
			
		if (args.fontcolor != null)
			this.fc = args.fontcolor;
		
		if (args.fullscreen != null)
			this.fullscreen = args.fullscreen;
		
		if (args.interpreter != null)
			this.interpreter = args.interpreter;
		
		if (args.height != null)
			this.wh = args.height;
		
		if (args.prompt != null)
			this.prompt = args.prompt;
		
		if (args.starthidden != null)
			this.hidden = args.starthidden;
		
		if (args.width != null)
			this.ww = args.width;
		
		if (args.motd != null)
			this.welcome = args.welcome;
	}
	this.create();
}

/* Prototype */

jscli.prototype = {
	
	/* Properties */
	
	constructor : jscli,
	
	div : 'jscli',
	textarea : '',
	input : '',
	inputwrap : '',
	hiddenbox : '',
	canvas : '',
	
	bc : '000000',
	fs : 10,
	fc : 'FFFFFF',
	
	fullscreen : false,
	
    fontString : 'Consolas, "Lucida Console", Monaco, "Courier New", Monospace',
    
	interpreter : '',
	
	hidden : false,
	
	history : ['','','','','','','','','',''],
	historyPos : 9,
	
	prompt : '>',
	
	version : '0.3.2',
	
	welcome : 'jscli v0.3.2',
	
	wh : 300,
	ww : 500,
	
	/* Public functions */
	
	bgColor : function(c){
		if (c != null)
		{
			this.bc = c;
			if (this.bc.charAt(0) != '#')
			{
				document.getElementById(this.div).style.backgroundColor = '#' + this.bc;
				document.getElementById(this.input).style.backgroundColor = '#' + this.bc;
			}
			else
			{
				document.getElementById(this.div).style.backgroundColor = this.bc;
				document.getElementById(this.input).style.backgroundColor = this.bc;
			}
		}
		return this.bc;
	},
	
	canvasCreate : function() {
		this.clearOutputTrue();
		this.inputHide();
		
		document.getElementById(this.div).style.overflow = 'hidden';
		document.getElementById(this.textarea).innerHTML = '<canvas id="'+ this.canvas +'" width="'+ this.ww +'" height="'+ this.wh +'">No canvas support</canvas>';
		
		return this.canvasGet();
	},
	
	canvasDestroy : function() {
		if (document.getElementById(this.canvas) != null)
		{
			this.clearOutput();
			this.inputShow();
			
			document.getElementById(this.div).style.overflow = 'auto';
		}
	},
	
	canvasGet : function() {
		if (document.getElementById(this.canvas) != null)
		{
			canvas = document.getElementById(this.canvas);
			if (canvas.getContext)
			{
				return {elm : canvas, ctx : canvas.getContext('2d')};
			}
		}
		
		return 0;
	},
	
	clearInput : function(){
		if (document.getElementById(this.input) != null)
			document.getElementById(this.input).value = '';
	},
	
	clearOutput : function(){
		document.getElementById(this.textarea).innerHTML = this.welcome + '<br />';
	},
	
	clearOutputTrue : function(){
		document.getElementById(this.textarea).innerHTML = '';
	},
	
	create : function(){
		this.textarea = 'cli_text_'+this.div;
		this.input = 'cli_input_'+this.div;
		this.inputwrap = 'cli_input_wrap_'+this.div;
		this.hiddenbox = 'cli_show_'+this.div;
		this.canvas = 'cli_canvas_'+this.div;
		
		this.prompt = this.escapeHTML(this.prompt);
		
		div = document.getElementById(this.div);
		div.style.backgroundColor = '#' + this.bc;
		div.style.fontFamily = this.fontString;
		div.style.overflow = 'auto';
		div.style.border = '0px';
		div.style.cursor = '';
		div.innerHTML = '<div id="'+this.textarea+'"></div>';
		div.innerHTML += '<div id="'+this.inputwrap+'">'+ this.escapeHTML(this.prompt) +'<input id="'+this.input+'" type="text" style="color: #' + this.fc +'; background-color: #' + this.bc +'; border: 0px; font-size: '+ this.fs +'pt;width:90%; font-family: '+ this.fontString +';" /></div>';
		
		document.getElementById(this.textarea).style.margin = '5px';
		document.getElementById(this.textarea).style.marginBottom = '0px';
		document.getElementById(this.inputwrap).style.margin = '5px';
		document.getElementById(this.inputwrap).style.marginTop = '0px';
		
		this.windowWidth(this.ww);
		this.windowHeight(this.wh);
		this.fontColor(this.fc);
		this.fontSize(this.fs);
		
		this.clearOutput();
		this.inputFocus();
		
		if (this.hidden)
		{
			this.hidden = false;
			this.windowHide();
			return;
		}
		if (this.fullscreen)
		{
			this.windowMaximize();
		}
		
		this._addEvent(document.getElementById(this.input), "keydown", this._textKeyPress, this);
		this._addEvent(div, "click", this.inputFocus, this);
	},
	
	escapeHTML : function(s){
		var result = "";
		for(var i = 0; i < s.length; i++){
			if(s.charAt(i) == "&" && s.length-i-1 >= 4 && s.substr(i, 4) != "&amp;")
			{
				result = result + "&amp;";
			}
			else if(s.charAt(i)== "<")
			{
				result = result + "&lt;";
			}
			else if(s.charAt(i)== ">")
			{
				result = result + "&gt;";
			}
			else
			{
				result = result + s.charAt(i);
			}
		}
		return result;
	},
	
	inputFocus : function(){
		if (document.getElementById(this.input) != null)
		{
			document.getElementById(this.input).focus();
		}
	},
	
	inputHide : function(){
		document.getElementById(this.inputwrap).style.display = 'none'
	},
	
	inputShow : function(){
		document.getElementById(this.inputwrap).style.display = 'block'
	},
	
	inputUnfocus : function(){
		document.getElementById(this.input).blur();
	},
	
	fontColor : function(c){
		if (c != null)
		{
			this.fc = c;
			if (this.fc.charAt(0) != '#')
			{
				document.getElementById(this.div).style.color = '#' + this.fc;
				document.getElementById(this.input).style.color = '#' + this.fc;
			}
			else
			{
				document.getElementById(this.div).style.color = this.fc;
				document.getElementById(this.input).style.color = this.fc;
			}
		}
		return this.fc;
	},
	
	fontSize : function(s){
		if (s != null)
		{
			this.fs = s;
			document.getElementById(this.div).style.fontSize = this.fs + 'pt';
			document.getElementById(this.input).style.fontSize = this.fs + 'pt';
		}
		return this.fs;
	},
	
	windowHeight : function(h){
		if (h != null && h != '')
		{
			this.wh = h.toString();
			if (this.ww.charAt(this.ww.length-1) != '%')
				document.getElementById(this.div).style.height = this.wh + 'px';
			else
				document.getElementById(this.div).style.height = this.wh;
		}
		return this.wh;
	},
	
	windowHide : function(c)
	{
		if (this.fullscreen)
		{
			return;
		}
		
		if (c == null)
		{
			c = '#999999';
		}
		else
		{
			c = this._hashColor(c);
		}
		
		div = document.getElementById(this.div);
		div.innerHTML = '<div id="'+ this.hiddenbox +'" style="padding:5px;">There\'s a CLI hidden here. Click to show.</div>';
		div.style.height = '';
		div.style.color = c;
		div.style.backgroundColor = '';
		div.style.border = '1px dashed ' + c;
		div.style.cursor = 'pointer';
		
		this._addEvent(document.getElementById(this.hiddenbox), "click", this.create, this);
	},
	
	windowMaximize : function() {
		document.body.style.height = '100%';
		document.body.style.overflow = 'hidden';
		div = document.getElementById(this.div);
		div.style.position = 'absolute';
		div.style.top = '0';
		div.style.left = '0';
		div.style.width = '100%';
		div.style.height = '100%';
		this.fullscreen = true;
	},
	
	windowNormal : function() {
		document.body.style.height = '100%';
		document.body.style.overflow = 'auto';
		document.getElementById(this.div).style.position = 'static';
		this.windowWidth(this.ww);
		this.windowHeight(this.wh);
		this._scrollDown();
		this.fullscreen = false;
	},
	
	windowWidth : function(w){
		if (w != null && w != '')
		{
			this.ww = w.toString();
			if (this.ww.charAt(this.ww.length-1) != '%')
				document.getElementById(this.div).style.width = this.ww + 'px';
			else
				document.getElementById(this.div).style.width = this.ww;
		}
		return this.ww;
	},
	
	write : function(s){
		document.getElementById(this.textarea).innerHTML += s + '<br />';
		this._scrollDown();
	},
	
	toString : function(){
		return 'jscli is in development';
	},
	
	/* Private functions */
	
	
	/* code from http://helephant.com/2008/04/26/objects-event-handlers-and-this-in-javascript/ */
	_addEvent : function(element, eventName, eventHandler, scope){
		var scopedEventHandler = scope ? function(e) { eventHandler.apply(scope, [e]); } : eventHandler;
		if(document.addEventListener)
			element.addEventListener(eventName, scopedEventHandler, false);
		else if(document.attachEvent)
			element.attachEvent("on"+eventName, scopedEventHandler);
	},
	
	/* end from http://helephant.com/2008/04/26/objects-event-handlers-and-this-in-javascript/ */
	
	_hashColor : function(c){
		if (c.charAt(0) != '#')
		{
			return '#' + c;
		}
		else
		{
			return c;
		}
	},
	
	_interpret : function(s){
		this.historyPos = 9;
		this._pushToHistory(s);
		
		if (s == 'about')
		{
			this.write(this.prompt+'about');
			this.write('jscli v'+this.version+'<br />This is a command-line interface written in JavaScript<br />Please note that this is a very experimental release.')
			this.clearInput();
		}
		else if (s == '?' || s == 'help')
		{
			this.clearInput();
			this.write(this.prompt+s);
			this.write('- Built-in commands:');
			this.write('? OR help - show this text');
			this.write('about - show info about jscli');
			if (typeof this.interpreter == 'object' && typeof this.interpreter.help == 'function')
			{
				this.write('<br />- Custom commands:');
				this.interpreter.help(this);
			}
		}
		else
		{
			if (typeof this.interpreter == 'object')
			{
				this.interpreter.check(s, this);
			}
			else
			{
				this.write(this.prompt + s);
				this.clearInput();
			}
		}
	},
	
	_pushToHistory : function(s){
		if (s != '' && this.history[9] != s)
		{
			this.history.shift();
			this.history.push(s);
		}
	},
	
	_scrollDown : function(){
		document.getElementById(this.div).scrollTop = document.getElementById(this.div).scrollHeight;
	},
	
	_textKeyPress : function(e){
		if (e == null)
		{
			e = window.event;
		}
		if (e.keyCode == '13')
		{
			this._interpret(document.getElementById(this.input).value.replace(/^\s+|\s+$/g, ""));
		}
		else if (e.keyCode == '38')
		{
			if (this.history[this.historyPos] != null)
			{
				document.getElementById(this.input).value = this.history[this.historyPos];
				if (this.historyPos != 0)
					this.historyPos--;
			}
		}
		else if (e.keyCode == '40')
		{
			if (this.history[this.historyPos] != null)
			{
				document.getElementById(this.input).value = this.history[this.historyPos];
				if (this.historyPos != 9)
					this.historyPos++;
			}
		}
	}
};
