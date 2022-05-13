function DragAreaObj(){
	this.initialize = function (options) {

		//this.master = options.master;
		this.parent = options.parent;
		this.manager = this.parent;

		this.$el = options.$el;
		this.id = options.id;
		this.isDefault = options.isDefault;

		this.drags = [];
		this.drops = [];
		this.labels = [];
		this.elementsById = [];
		this.labelsById = [];

		//DEFAULT SETTINGS
		this.settings = {
			dropType: null,
			labelType: null,
			onDropAction: null
		};
		//this.dropContains=null;
		this.getSettings(this.$el.attr("data-drag-settings"));


		this.setupDom();
	},

	/* ***************************************************************************************
		* * SETUP
		* **************************************************************************************/
	/* ************************
		* get Settings
		* ************************
		* recovers the settings from the DOM and assigns them
		*/
	this.getSettings = function () {
		var that = this
		var settings = this.$el.attr("data-drag-settings");
		//jQuery.parseJSON( '{ "name": "John" }' );
		if (typeof settings !== "undefined") {
			settings = settings.replace(/'/g, '"');
			settings = $.parseJSON(settings);
			//this.dropContains=(typeof settings.dropContains !=="undefined")?settings.dropContains:this.dropContains;
			Object.keys(this.settings).forEach(function (key) {
				that.settings[key] = (typeof settings[key] !== "undefined") ? settings[key] : that.settings[key];
			})


		}


	},

	/* ************************
		* setup DOM
		* ************************
		* setup the dom, like classes and such
		* setup events and calls for drop and drag
		*/
	this.setupDom = function () {
		//set attributes for this
		this.setupAttributes();
		// scan for drop elements
		this.scanDrop();
		// scan for drag elements
		this.scanDrag();
		//scan for other interactions
		this.scanButtons();

	},

	/* ************************
		* setup attributes
		* ************************
		* use the settings and other info
		* to set object attributes
		*/
	this.setupAttributes = function () {
		//if there's no set area
		if (this.isDefault) {
			this.$el.addClass("snap-drag-area");
		}
		this.$el.attr("role", "application");
	},

	/* ************************
		* SCAN DRAG OBJECTS
		* ************************
		* looks through this area
		* creates all the DRAG objs
		*/
	this.scanDrag = function () {
		var $dragEl = this.$el.find(".snap-drag");
		for (var i = 0; i < $dragEl.length; i++) {
			this.drags[this.drags.length] = new DragObj();
			this.drags[this.drags.length - 1].initialize({
				parent: this,
				$el: $dragEl.eq(i),
				index: i
			});
		}
	},

	/* ************************
		* RESET VARS
		* ************************
		* prepares the vars for
		* a new dragging adventure
		*/
	this.resetVars = function () {
		this.currentDrag = null;
		this.enterDrop = null;
		this.originalDrop.$el.removeClass("snap-original-drop");
		this.originalDrop = null;
		$(".snap-drop[tabindex=0]").removeAttr("tabindex");

	},

	/* ************************
		* SCAN DROP OBJECTS
		* ************************
		* looks through this area
		* creates all the DROP objs
		*/
	this.scanDrop = function () {
		var $dropEl = this.$el.find(".snap-drop");
		for (var i = 0; i < $dropEl.length; i++) {
			this.drops[this.drops.length] = new DropObj();
			this.drops[this.drops.length - 1].initialize({
				parent: this,
				$el: $dropEl.eq(i),
				index: i
			});
		}

	},

	/* ************************
		* SCAN buttons
		* ************************
		* looks through this area
		* creates all the DROP objs
		*/
	this.scanButtons = function () {
		var that = this;
		var $buttons = this.$el.find(".btn-submit-dragondrop");
		if ($buttons.length > 0) {
			this.disableValidation();
			this.settings.autoValidate = false;

			this.$el.attr("data-validate", "false");
			$buttons.click(function () {
				//
				var $drags;
				var dragObj;
				that.$el.attr("data-validate", "true");
				for (var i = 0; i < that.drops.length; i++) {
					$drags = that.drops[i].$el.find(".snap-drag");
					if ($drags.length > 0) {
						dragObj = that.elementsById[$drags.eq(0).attr("id")];
					} else {
						dragObj = null;
					}
					that.validate(dragObj, that.drops[i])
				}
				that.$el.attr("tabindex", "0");
				that.$el.focus();
				that.$el.attr("tabindex", "-1");
			});
		} else {
			this.$el.attr("data-validate", "true");
		}
	},

	this.disableValidation = function () {
		this.$el.attr("data-validate", "false")
	},

	/* ***************************************************************************************
		* * labels
		* **************************************************************************************/
	this.createLabel = function ($label, drop) {
		var id = $label.attr("id");


		if (typeof id === "undefined") {
			id = this.id + "_" + this.labels.length;
			$label.attr("id", id);
		}

		if (typeof this.elementsById[id] === "undefined") {
			this.labels[this.labels.length] = new LabelObj();
			this.labels[this.labels.length - 1].initialize({
				area: this,
				firstParent: drop,
				id: $label.attr("id"),
				$el: $label,
				index: this.labels.length
			});
		} else {
			this.log("THIS LABEL EXISTS ALREADY DONT CREATE IT")

		}

		this.labelsById[id].nestWithParent(drop);

		//console.log(this.labelsById);
	},

	/* **********************
		* expand Abbr
		* 
		*  receive an object, return its text with
		*  the abbreviations expanded
		* *********************/
	this.expandAbbr = function ($el) {
		var $abbr = $el.find("abbr");
		var newText = $el.text();
		var definition, abbr;

		for (var i = 0; i < $abbr.length; i++) {
			abbr = $abbr.eq(i).text();
			definition = $abbr.eq(i).attr("title");
			if (typeof definition === "undefined") {
				definition = abbr.split("").toString().replace(/,/g, ".")
			}
			newText = newText.replace(abbr, definition)
		}
		return newText;
	},

	/* ***************************************************************************************
		* * states
		* **************************************************************************************/
	this.activate = function () {
		this.$el.addClass("active");
	},

	this.deactivate = function () {
		this.$el.removeClass("active");

	},

	/* ************************
		* NEXT PREVIOUS DROP
		* ************************
		* allows keyboard cycling
		* through drops
		*/
	this.findNextDrop = function () {
		var found;
		if (this.currentDrop.index !== (this.drops.length - 1)) {
			found = this.drops[(this.currentDrop.index + 1)];
		} else {
			found = this.drops[0];
		}
		//we found it.
		if (!found.checkDroppable()) {
			this.currentDrop = found;
			this.findNextDrop();
		} else {
			found.select();
		}
	},

	this.findPreviousDrop = function () {
		var found;
		if (this.currentDrop.index === 0) {
			found = this.drops[(this.drops.length - 1)];
		} else {
			found = this.drops[this.currentDrop.index - 1];
		}
		//we found it.
		if (!found.checkDroppable()) {
			this.currentDrop = found;
			this.findPreviousDrop();
		} else {
			found.select();
		}

	},

	/* ***************************************************************************************
		* * AUTO VALIDATION
		* **************************************************************************************/
	this.createValidation = function (obj) {
		//set validation as true.
		obj.settings.validation = true;
		//create custom ID
		var id = obj.id + "_validation";
		//detect if it already exists
		obj.$validation = this.detectValidation(obj);
		//make sure it has an ID
		obj.$validation
			.attr("id", id)
			.attr("data-feedback", "null");
		//set the correct incorrect default feedbackif it doesn't  exist
		if (obj.$validation.children(".snap-validation-incorrect").length === 0) {
			obj.$validation.prepend("<div class='snap-validation-incorrect just-the-icon'>Incorrect</div>");
		}
		if (obj.$validation.children(".snap-validation-correct").length === 0) {
			obj.$validation.prepend("<div class='snap-validation-correct just-the-icon'>Correct</div>");
		}

		obj.settings.validationHtml = obj.$validation.html();
		obj.$validation.html("");
	},

	this.detectValidation = function (obj) {
		var id = obj.$el.id + "_validation";
		var $valid = $("#" + id);

		if ($valid.length > 0) {
			return $valid;
		} else {
			//check if next
			$valid = obj.$el.next();
			if ($valid.hasClass("snap-validation")) {
				return $valid;
			}
			//check  if inside
			$valid = obj.$el.find(".snap-validation");
			if ($valid.length > 0) {
				return $valid;
			}
			//lets make a new one
			obj.$el.after("<div class='snap-validation hidden-feedback'></div>");
			return obj.$el.next();
		}
	},

	this.validate = function (dragObj, dropObj) {
		var $targetValidation;
		var validationHtml;
		var aAnswer, aValue;

		if (dropObj.settings.dropType !== "multiple") {
			$targetValidation = dropObj.$validation;
			validationHtml = dropObj.settings.validationHtml;
		} else {
			$targetValidation = dragObj.$validation;
			validationHtml = dragObj.settings.validationHtml;

		}

		if (dropObj.settings.validation) {
			aAnswer = dropObj.answer.split(",");

			aValue = (dragObj === null) ? [""] : dragObj.value.split(",");

			var correct = this.multiValidation(aAnswer, aValue);
			$targetValidation.attr("data-feedback", (correct) ? "correct" : "incorrect");
			$targetValidation.html(validationHtml);
			$targetValidation.find(".snap-validation-" + ((correct) ? "incorrect" : "correct")).remove()
			$targetValidation.attr("tabindex", 0);
			$targetValidation.focus();
			$targetValidation.attr("tabindex", -1);

		} else {
			this.$el.focus();
		}
	},

	this.validateReset = function (obj) {
		if (obj.settings.validation) {
			obj.$validation.attr("data-feedback", "null");
			obj.$validation.html("");
		}
	},

	this.multiValidation = function (aAnswer, aValue) {
		var flag = false;
		for (var i = 0; i < aAnswer.length; i++) {
			for (var j = 0; j < aValue.length; j++) {
				if (aAnswer[i] === aValue[j]) {
					flag = true;
				}
			}
		}
		return flag;
	},

	/* ***************************************************************************************
		* * 
		* **************************************************************************************/
	this.getElementsById = function (id) {
		return this.elementsById[id];
	},

	this.log = function (msg) {
		this.manager.log(msg);
	}
}
