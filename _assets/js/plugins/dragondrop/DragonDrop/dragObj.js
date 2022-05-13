function DragObj(){
	this.initialize = function (options) {
		this.parent = options.parent;
		this.area = this.parent
		this.manager = this.parent.manager;

		this.$el = options.$el;
		this.id = this.$el.attr("id");
		this.index = options.index;

		//DEFAULT SETTINGS
		this.settings = {}
		this.getSettings(this.$el.attr("data-drag-settings"));

		this.setupDom();

	},

	/* ***************************************************************************************
		* * SETUP
		* **************************************************************************************/

	/* ************************
		* setup Dom
		* ************************
		* Prepare the dom
		* launch setup interactions
		*/
	this.setupDom = function () {
		//set relationships
		this.setupRelationships();
		//set DOM attributes
		this.setupAttributes();
		//this.$el
		this.setupInteractions();
	},

	/* ************************
		* setup relationships
		* ************************
		* use the settings and other info
		* to set object attributes
		*/
	this.setupRelationships = function () {
		//for searchabilty
		this.area.elementsById[this.id] = this;
		//point of origin
		this.origin=this.area.elementsById[this.$el.closest(".snap-drop").attr("id")];
		this.origin.setOrigin();
	},

	/* ************************
		* setup attributes
		* ************************
		* use the settings and other info
		* to set object attributes
		*/
	this.setupAttributes = function () {

		this.$el.attr("tabindex", "0");
		var labelText=this.area.expandAbbr(this.$el);
		this.$el.attr("aria-label", labelText+"Press enter to move this item to a droppable area.")
		//this.$el.attr("role", "button");
		
		if(typeof this.$el.attr("data-value") !== "undefined"){
			
			this.value = this.$el.attr("data-value");
			this.area.createValidation(this);
			//this.createValidation();
			
		}
	},

	/* ************************
		* setup Interactions
		* ************************
		* launch the event listeners
		* set draggable attribute
		*/
	this.setupInteractions = function () {
		var that = this;
		this.$el.attr("draggable", true);
		// set event listeners
		this.$el.on('dragstart', function () {
			that.startDrag();
		});
		this.$el.on('drag', function () {
			that.whileDrag();
		});
		this.$el.on('dragend', function (e) {
			that.endDrag(e);
		});
		this.$el.on('drop', function () {
			that.stopDrag();
		});
		this.$el.on('keydown', function (e) {

			that.keyDown(e);
		});
		this.$el.on('click', function () {
			that.select();
		});
	},
	
	this.reset = function(){
		this.dropSuccess=null;
	},

	/* ************************
		* get Settings
		* ************************
		* recovers the settings from the DOM and assigns them
		* if that fails, recover from AREA
		* otherwise, grab the default value
		*/
	this.getSettings = function () {
		var that = this;
		var settings = this.$el.attr("data-drag-settings");
		var hasCustom = false;
		// are there custom settings?
		if (typeof settings !== "undefined") {
			settings = settings.replace(/'/g, '"');
			settings = $.parseJSON(settings);
			hasCustom = true;
		}
		//go through this object's declared settings
		Object.keys(this.settings).forEach(function (key) {

			//check if there's a custom settring set
			if (hasCustom) {
				if (typeof settings[key] !== "undefined") {
					//check if This specific setting exists and assign
					that.settings[key] = settings[key]
				}
			} else {
				//well, lets look through parent's settings then
				if (typeof that.area.settings[key] !== "undefined" && that.area.settings[key] !== null) {
					//grab parent's setting and car keys, otherwise nothing happens: default;
					that.settings[key] = that.area.settings[key];
				}
			}
		})
	},

	/* ***************************************************************************************
		* * States
		* **************************************************************************************/

	/* ************************
		* SELECT
		* ************************
		* Launched when clicked or
		* pressed enter or spacebar
		*/
	this.select = function () {
		var that = this;
		this.$el.addClass("snap-selected");
		if (!this.area.selected) {
			this.setOrigins();
			this.highlight();
			this.area.elementsById[this.$el.closest(".snap-drop").attr("id")].select();
			this.area.activate();
			//that.keyBoardMenu();
			//override the keyboard
			this.area.$el.bind('keydown keypess', function (evt) {
				evt.preventDefault();
				// ESCAPE
			});
			//override the keyboard
			this.area.$el.bind('keyup', function (evt) {
				evt.preventDefault();
				that.navigateKeyboard(evt);
			});
			this.area.$el.bind("click", function (evt) {
				evt.preventDefault();
				evt.stopPropagation();
				that.clickToMove(evt);


			});
			this.area.selected = true;
			//start the selection 			
		}
	},

	/* ************************
		* UNSELECT
		* ************************
		* Launched when ESC or click
		* outside
		*/
	this.unselect = function () {
		this.unhighlight();
		this.$el.removeClass("snap-selected");
		this.area.selected = false;
		this.area.deactivate();
		this.area.$el.unbind('keydown keyup keypess click');
	},

	this.setOrigins = function () {
		var origin=this.area.elementsById[this.$el.closest(".snap-drop").attr("id")];
		this.area.activate();
		//who'S the original dragger
		this.area.currentDrag = this;
		//where did this drag originate from
		this.area.originalDrop = origin;
		this.area.originalDrop.$el.addClass("snap-original-drop");

	},
	/* ************************
		* HIGHLIGHTS
		* ************************
		* 
		* 
		*/

	this.highlight = function () {

		this.$el.addClass("drag-highlight");

	},

	this.unhighlight = function () {
		this.$el.removeClass("drag-highlight");
	},

	/* ***************************************************************************************
		* * DRAGGING EVENTS
		* **************************************************************************************/

	/* ************************
		* start Drag
		* ************************
		* Launched Once when drag starts
		* 
		*/
	this.startDrag = function () {
		this.setOrigins();

	},

	/* ************************
		* while Drag
		* ************************
		* Launched every frame while dragging
		*/
	this.whileDrag = function () {
		//this.log("LOOK AT ME I'M DRAGGGGGINNNNNGGGG");
	},

	/* ************************
		* STOP Drag
		* ************************
		* used when dragging to 
		* FILLED drag
		*/
	this.stopDrag = function () {
		//everything moved to DROP

	},

	/* ************************
		* end Drag
		* ************************
		* Launched Once when drag ends
		* 
		*/
	this.endDrag = function () {
		this.log("THE DRAGON HAS LANDED!!!!");
		if(this.dropSuccess !== true){
			this.droppedOutside();
		}
		this.area.deactivate();
		this.area.resetVars();
		this.reset();
	},

	/* ************************
		* DROPPED OUTSIDE
		* ************************
		* Launched if the drop
		* was unsuccessful
		*/
	this.droppedOutside = function(){
		this.dropSuccess=null;
		if(this.area.settings.dropType==="return"){
			this.moveToDrop(this.origin);
		}
		this.unselect();
	},

	/* ************************
		* key press
		* ************************
		* Launched when pressing a key
		* 
		*/
	this.keyDown = function (evt) {
		if (evt.which === 13 || evt.which === 32) {
			evt.preventDefault();
			this.select();
		}
	},

	/* ************************
		* click to move
		* ************************
		* Launched when clicking
		* 
		*/
	this.clickToMove = function (evt) {
		var $target = $(evt.target);
		var $drag = $target.closest(".snap-drag");
		var $drop = $target.closest(".snap-drop");
		//figure out where you clicked... moffo.
		if ($drop.length === 0) {
			//if clicked outside
			this.unselect();
			this.droppedOutside();
		} else {
			var dropObj = this.area.elementsById[$drop.attr("id")];

			//is this because you just clicked the same spot?
			if (this.area.originalDrop.id === $drop.attr("id") || this.area.currentDrag.id === $drag.attr("id")) {
				//
			} else {
				//time to move!
				dropObj.$el.trigger("ondrop");
				dropObj.manageMove();
				this.endClick();
			}
		}
	},

	this.endClick = function () {

		this.parent.deactivate();
		this.parent.resetVars();
	},

	this.navigateKeyboard = function (evt) {

		if (evt.which === 27) {
			//window.cancell
			this.unselect();
		}
		//----TAB ---- SHIFT TAB
		if (evt.which === 9 && evt.shiftKey  && evt.type === "keyup") {
			this.area.findPreviousDrop();
		}else if (evt.which === 9 && evt.type === "keyup") {
			this.area.findNextDrop();
		}


		var sameDrop = this.area.currentDrop.id === this.$el.closest(".snap-drop").attr("id");
		//ENTER PRESS
		if ((evt.which === 13 || evt.which === 32) && evt.type === "keyup" && !sameDrop) {
			this.area.currentDrop.$el.trigger("ondrop");
			this.area.currentDrop.manageMove();
			this.endNavigateKeyboard();
		}
	},

	this.endNavigateKeyboard = function () {
		this.parent.deactivate();
		this.parent.resetVars();
		if(this.area.currentDrop.settings.validation!==true){
			this.$el.focus();
		}
		//
	},

	/* ***************************************************************************************
		* * moving and changing
		* **************************************************************************************/

	/* ************************
		* MOVE TO DROP
		* ************************
		* moves THIS drag to a 
		* DROP BOX
		*/
	this.moveToDrop = function (targetDrop) {
		//it'll work wether it'S an object or string ID
		var dropId = (typeof targetDrop === "object") ? targetDrop.id : targetDrop;
		
		
		//console.log(this.area.originalDrop);
		//define the players
		var elDropFinal = document.getElementById(dropId);
		var elDragFinal = (document.getElementById(this.id));
		
		//move the element
		elDropFinal.appendChild(elDragFinal);
		
		this.unselect();
		this.area.elementsById[dropId].reset();
		//this.$el.focus();
		
		
		//validate the drop
		this.area.validate(this,targetDrop);
		//reset original drop
		this.area.validateReset(this.area.originalDrop);
		
		if(this.area.settings.autoValidate === false){
			this.area.disableValidation();
		}
	},

	/* ************************
		* UNDO
		* ************************
		* moves THIS drag BACK
		* to previous DROP BOX
		*/
	this.undo = function () {
		//pass the ID of the undo
		this.moveToDrop(this.area.undo);
	},

	/* ***************************************************************************************
		* * keyboard menu
		* **************************************************************************************/
	this.keyBoardMenu = function () {
		//this is currently removed.
		//trying out the TABBING option first.
	},

	/* ***************************************************************************************
		* * 
		* **************************************************************************************/
	this.log = function (msg) {
		this.manager.log(msg);
	}
}
