/*
`""*$b..
	 ""*$o.
		 "$$o.
		   "*$$o.
			  "$$$o.
				"$$$$bo...       ..o:
				  "$$$$$$$$booocS$$$    ..    ,.
			   ".    "*$$$$SP     V$o..o$$. .$$$b
				"$$o. .$$$$$o. ...A$$$$$$$$$$$$$$b
		  ""bo.   "*$$$$$$$$$$$$$$$$$$$$P*$$$$$$$$:
			 "$$.    V$$$$$$$$$P"**""*"'   VP  * "l
			   "$$$o.4$$$$$$$$X
				"*$$$$$$$$$$$$$AoA$o..oooooo..           .b
					   .X$$$$$$$$$$$P""     ""*oo,,     ,$P
					  $$P""V$$$$$$$:    .        ""*****"
					.*"    A$$$$$$$$o.4;      .
						 .oP""   "$$$$$$b.  .$;
								  A$$$$$$$$$$P
								  "  "$$$$$P"
									  $$P*"
									  .$"
									 "
DRAGON DROP!! IN THE NIIIIIIGHT!												 
(THANKS ASCII ART UK :p )
*/

function DragManager(){
	this.initialize =function (options) {
		var that = this;

		//this.master = options.master;
		//this.parent = this.master;


		this.areas = []; //array for drag Areas


		$(window).on("load", function () {
			that.pageLoaded();
		});
	},

	this.reset = function () {
		this.areas = [];
	},

	this.pageLoaded = function () {
		this.scanDom();
	},

	this.scanDom = function () {
		var $drag = $(".snap-drag");

		if ($drag.length > 0) {
			this.scanOrphans();
			//set default IDs
			this.setIDs();
			//look for drag areas
			this.scanArea();
		}

	},

	/* **********************
	* SET IDs
	* 
	*  scan for any element without an ID
	* assign a value
	* *********************/
	this.setIDs = function () {
		var $drags = $(".snap-drag:not([id]),.snap-drop:not([id])");
		for (var i = 0; i < $drags.length; i++) {
			$drags.eq(i).attr("id", "snap-id-" + i);
		}

	},

	/* **********************
	* Scan area 
	* 
	*  scan for a drag area
	* drag area will contain drag and drop
	* *********************/
	this.scanArea = function () {
		var $container = $("body");
		var $areas = $container.find(".snap-drag-area");
		if ($areas.length > 0) {
			for (var i = 0; i < $areas.length; i++) {
				this.createArea($areas.eq(i), false);
			}


		} else {
			this.createArea($container.eq(0), true);
		}
	},

	/* ************************
	* SCAN ORPHANS
	* ************************
	* looks through this area
	* create drops for drags without drops
	*/
	this.scanOrphans = function () {
		//create drops for drags without drops
		var $orphans = $(".snap-drag").filter(function () {
			return $(this).closest(".snap-drop").length === 0;
		});

		var jsonSettings = {
			"dropType": "origin",
			"labelType": "origin"
		};

		$orphans.wrap("<div class='snap-drop' data-drag-settings='" + JSON.stringify(jsonSettings) + "'></div>")
	},

	/* **********************
	* create area 
	* 
	*  create the dragArea object
	* 
	* *********************/
	this.createArea = function ($area, isDefault) {
		if (typeof $area.attr("id") === "undefined") {
			$area.attr("id", "snap_da_" + this.areas.length);
		}
		this.areas[this.areas.length] = new DragAreaObj();
		this.areas[this.areas.length - 1].initialize({
			$el: $area,
			id: $area.attr("id"),
			isDefault: isDefault,
			parent: this//,
			//master: this.master
		});
	},

	this.log = function (msg) {
		console.log(msg);
	}
}