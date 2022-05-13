function LabelObj(){
	this.initialize = function (options) {

		//this.master = options.master;
		this.parents = [];

		this.area = options.area;
		this.manager = this.area.parent;


		this.$el = options.$el;
		this.id = options.id;

		//DEFAULT SETTINGS
		this.settings = {};

		this.nest();

	},

	this.nest = function () {
		this.area.labelsById[this.id] = this;

	},

	this.nestWithParent = function (parent) {
		parent.labelsById[this.id] = this;
		parent.labels[parent.labels.length] = this;
		this.parents[this.parents.length] = parent;
	},

	/* ***************************************************************************************
		* * SETUP
		* **************************************************************************************/
	this.log = function (msg) {
		this.manager.log(msg);
	}
}