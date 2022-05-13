function DropObj(){
	this.initialize = function (options) {

		this.parent = options.parent;
		this.area = this.parent;
		this.manager = this.parent.manager;

		this.$el = options.$el;
		this.id = this.$el.attr("id");
		this.index = options.index

		this.labels = [];
		this.labelsById = [];
		this.labelInstructions = "Press ENTER to drop item here.";
		this.labelText = "";

		this.$validation = null;

		//DEFAULT SETTINGS
		this.settings = {
			dropType: null,
			labelType: null,
			onDropAction: null
		}
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
		//set label
		this.setupLabel();
		//setup attributes
		this.setupAttributes();
		//event listeners
		this.setupInteractions();
		//for searchabilty
		this.area.elementsById[this.id] = this;

	},

	/* ************************
		* setup attributes
		* ************************
		* use the settings and other info
		* to set object attributes
		*/
	this.setupAttributes = function () {
		//var onDrop = this.$el.attr("onDrop");
		if (this.settings.onDropAction !== null && typeof this.$el.attr("ondrop") === "undefined") {
			this.$el.attr("ondrop", this.settings.onDropAction);
		}

		// can it contain multiple ?
		if (this.settings.dropType === "multiple") {
			this.$el.addClass("snap-drop-multiple");
		}
		if (this.settings.dropType === "trade") {
			this.$el.addClass("snap-drop-trade");
		}

		if(typeof this.$el.attr("data-answer") !== "undefined"){
			
			this.answer = this.$el.attr("data-answer");
			this.area.createValidation(this);
			//this.createValidation();
			
		}
		//this.$el.attr("role", "button");

	},

	/* ************************
		* setup Interactions
		* ************************
		* launch the event listeners
		* 
		*/
	this.setupInteractions = function () {
		var that = this;

		this.$el.on('dragover', function (event) {
			that.whileOver(event);
		});
		this.$el.on('dragleave', function (event) {
			that.dragLeave(event);
		});
		this.$el.on('drop', function (event) {
			that.drop(event);
		});
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
		* *  LABELS
		* **************************************************************************************/
	/* ************************
		* setup LABEL
		* ************************
		* gets the label
		* add it to the DOM
		*/
	this.setupLabel = function () {
		//var that = this;
		var items;
		//-------ARIA-LABELLEDBY-------
		var labelBy = this.$el.attr("aria-labelledby");
		this.$el.attr("aria-describedby", labelBy);
		var $describedBy = $(this.splitSpaceId(this.$el.attr("aria-describedby")));


		//-------ARIA-LABEL-------
		var ariaLabel = this.$el.attr("aria-label");
		if (typeof ariaLabel !== "undefined") {
			//there's a specific LABEL attribute
			this.labelText += ariaLabel

		}
		//-------ARIA-LABELFOR-------
		var $labelFor = $("label[for=" + this.id + "]");
		if ($labelFor.length > 0) {
			//this isn't a very good practice btw... 
			//apparently there'S already a label
			for (items = 0; items < $labelFor.length; items++) {
				this.area.createLabel($labelFor.eq(items), this);
			}
		}
		//-------ARIA-DESCRIBEDBY-------
		if ($describedBy.length > 0) {
			//there's a DESCRIBED BY
			//shouldn't be anything to do... ?
			for (items = 0; items < $describedBy.length; items++) {
				this.area.createLabel($describedBy.eq(items), this);
			}


		}

		if (this.labels.length === 0) {
			this.getLabel();
		}

		if (this.labels.length > 0) {
			var aLabels = [];
			for (items = 0; items < this.labels.length; items++) {
				aLabels[aLabels.length] = this.labels[items].id;
			}
			//var joined = aLabels.join(" ");
			//var $joined=$("#" + joined.replace(/ /g, ',#'));
			var LabelTextMerge = this.labelText + "";
			for (items = 0; items < this.labels.length; items++) {
				LabelTextMerge += " " + this.area.expandAbbr(this.labels[items].$el);
			}

			this.$el

				//.attr("aria-describedby", this.id+"_label_instr "+joined)
				//.removeAttr("aria-label")
				.removeAttr("aria-describedby")
				.removeAttr("aria-labelledby")
				.attr("aria-label", LabelTextMerge + " " + this.labelInstructions);
			/*this.$el.hover(
				function () {
					$joined.addClass("snap-drop-label");
				},
				function () {
					$joined.removeClass("snap-drop-label");
				}
			);*/


		}
	},

	/* ************************
		* get LABEL
		* ************************
		* checks label type
		* gets the label
		*/
	this.getLabel = function () {
		var labelType = this.settings.labelType;
		var $labelTarget;
		//OVERRIDE
		//if this is a return drop box
		if ((this.settings.dropType === "return" && this.$el.find(".snap-drag").length > 0) || this.dropType === "origin") {
			labelType = "origin";
		}

		switch (labelType) {
			case "structure":
				this.findInnerLabel();
				this.findTags(this.$el, ["h6", "h5", "h4", "h3", "h2"], 0);
				break;
			case "tablerow":
				this.findInnerLabel();
				$labelTarget = this.$el.closest("tr").children('td').first();
				/*if ($labelTarget.find("p").length === 1) {
					$labelTarget = $labelTarget.find("p").eq(0);
				}*/

				this.area.createLabel($labelTarget, this);
				var tdIndex = this.$el.closest("td").index() + 1;
				this.findTags(this.$el, ["th[scope=col]:nth-child(" + tdIndex + ")", "caption", "h3", "h2"], 0);
				break;
			case "textEl":
				this.findInnerLabel();
				if(this.$el.closest("li")){
					$labelTarget = this.$el.closest("li");
				}
				else{
					$labelTarget = this.$el.closest("p");
				}

				this.area.createLabel($labelTarget, this);
				break;
			case "textElBefore":
				this.findInnerLabel();
				if(this.$el.prev(".LOM-editable").length != 0){
					$labelTarget = this.$el.prev(".LOM-editable");
				}
				else if(this.$el.prev("li").length != 0){
					$labelTarget = this.$el.prev("li");
				}
				else{
					$labelTarget = this.$el.prev("p");
				}

				this.area.createLabel($labelTarget, this);

				break;
			case "bootstrap-col":
				this.findInnerLabel();
				$labelTarget = this.$el.closest(".row").children('[class*=col-]').first();
				if ($labelTarget.find("p").length === 1) {
					$labelTarget = $labelTarget.find("p").eq(0);

				}

				this.area.createLabel($labelTarget, this);
				break;
			case "origin":
				this.findInnerLabel();
				$labelTarget = this.$el.find(".snap-drag");
				if ($labelTarget.find("p").length === 1) {
					//more specific
					$labelTarget = $labelTarget.find("p").eq(0);
				}

				break;
			default:
				//find some text
				this.findInnerLabel();
				this.findTags(this.$el, ["h6", "h5", "h4", "h3", "h2"], 0);
				break;
		}

		return true;
	},

	/* ************************
		* find INNER LABEL
		* ************************
		* find anything inside the element
		* to act as a label.
		*/
	this.findInnerLabel = function () {
		var $labelTarget = this.$el.find("p,caption,h2,h3,h4,h5,h6").eq(0);
		if ($labelTarget.length > 0) {
			if ($labelTarget.closest(".snap-drag").length === 0) {
				//this HAS a label and it's not inside a drag.
				this.area.createLabel($labelTarget, this);
			} else {
				//well... no label here...
			}
		}
	},

	/* ************************
		* find Tags
		* ************************
		* RECURSIVE
		* return tags in a certain listed order
		* send in the element to search in (original)
		* only one element will be found of each hopefuly
		*/
	this.findTags = function ($el, tagArray, index) {

		var $testContain, $testIs;
		var newIndex = index;
		var $lookAt
		if (!$el.hasClass("snap-drag-area")) {
			$lookAt = $el.prevAll();
			for (var i = index; i < tagArray.length; i++) {


				$testContain = $el.prevAll(":has(" + tagArray[i] + ")");
				$testIs = $el.prevAll(tagArray[i]);
				if ($lookAt.find(tagArray[i]).length > 0) {
					newIndex = i;
					this.area.createLabel($testContain.first().find(tagArray[i]), this);
				}
				if ($testIs.length > 0) {
					newIndex = i;
					this.area.createLabel($testIs.first(), this);
				}
			}
			this.findTags($el.parent(), tagArray, newIndex);
		}
	},

	/* ***************************************************************************************
		* * States
		* **************************************************************************************/
	this.select = function () {
		this.area.currentDrop = this;
		this.unhighlightAll();
		this.highlight();
		this.$el.attr("tabindex", "0")
			//.attr("aria-label", this.labelText)
			.focus()
			.attr("aria-controls", this.area.currentDrag.id);

	},

	this.highlight = function () {
		$(".drag-highlight").removeClass("drag-highlight");
		if (this.area.originalDrop.id !== this.id && this.checkDroppable()) {
			this.$el.addClass("drag-highlight");
		}
	},

	this.unhighlight = function () {
		this.$el.removeClass("drag-highlight");
	},

	this.unhighlightAll = function () {
		$(".snap-drop")
			.removeClass("drag-highlight")
			//.removeAttr("aria-label")
			.removeAttr("aria-controls")
			.removeAttr("tabindex");
	},

	this.checkDroppable = function () {
		var flag = true;
		flag = (!this.isLocked) ? flag : false;
		flag = (this.settings.dropType === "return" && this.isOrigin) ? false : flag;
		flag = (this.settings.dropType === "single" && this.$el.find(".snap-drag").length > 0) ? false : flag;
		return flag;
	},

	/* ************************
		* is origin
		* ************************
		* this drop cannot be dropped to, only returned
		* 
		*/
	this.setOrigin = function () {
		this.isOrigin = true;
		if (this.settings.dropType === "return" || this.settings.dropType === "origin") {
			this.$el.addClass("snap-origin");
			this.isLocked = true;
		}
	},

	/* ***************************************************************************************
		* * DRAGGING EVENTS
		* **************************************************************************************/


	/* ************************
		* drag OVER
		* ************************
		* Launched repeatedly
		* while dragover
		*/
	this.whileOver = function (evt) {
		evt.preventDefault(); //without this, the entire thing won't drop

		//creating a Drag Enter
		if (this.area.enterDrop !== this.id) {
			this.area.enterDrop = this.id;

			this.dragEnter();
		}
	},

	/* ************************
		* drag Enter DROPBOX
		* ************************
		* Launched once
		* when drag and drops meet
		*/
	this.dragEnter = function () {
		if (this.checkDroppable()) {
			this.highlight();
		}

		//
	},

	/* ************************
		* drag Leave DROPBOX
		* ************************
		* Launched when drag and drops stop meeting
		* 
		*/
	this.dragLeave = function (evt) {
		this.area.enterDrop = null;
		var $target = $(evt.target).closest(".snap-drop");
		if ($target.hasClass("snap-drop")) {
			this.unhighlightAll();
		}
		//
	},

	/* ************************
		* DROP
		* ************************
		* Launched when is dropped
		* 
		*/
	this.drop = function (evt) {
		this.log("start the drop sequence");
		//prevent buttons and such from triggering
		evt.preventDefault();
		//target ID
		if (this.checkDroppable()) {
			this.area.currentDrag.dropSuccess = true;
			this.manageMove();
		}


	},

	/* ************************
		* MANAGE MOVE
		* ************************
		* Launched when is dropped
		* 
		*/
	this.manageMove = function () {
		//find the objects
		var alreadyDrag = this.$el.find(".snap-drag");
		var dragBox = this.area.currentDrag;

		if (alreadyDrag.length > 0) {
			var alreadyDragObj = this.area.elementsById[alreadyDrag.eq(0).attr("id")];
			switch (this.settings.dropType) {
				case "trade":
					alreadyDragObj.moveToDrop(this.area.originalDrop);
					dragBox.moveToDrop(this);


					break;
				case "return":
					alreadyDragObj.moveToDrop(alreadyDragObj.origin);
					dragBox.moveToDrop(this);
					break;

				case "multiple":

					dragBox.moveToDrop(this);
					break;
				default:
			}
		} else {
			dragBox.moveToDrop(this);
		}
	},

	this.reset = function () {
		this.unhighlight();
		this.area.undo = this.area.originalDrop.id;


	},

	/* ***************************************************************************************
		* * 
		* **************************************************************************************/
	this.splitSpaceId = function (str) {
		if (typeof str !== "undefined") {
			var newId = "#" + str.replace(" ", ",#");
			return newId;
		} else {
			return "";
		}

	},

	this.log = function (msg) {
		this.manager.log(msg);
	}
}
