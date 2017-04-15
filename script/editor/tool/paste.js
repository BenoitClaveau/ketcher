var Action = require('../action');
var EditorTool = require('./base');

function PasteTool(editor, struct) {
	if (!(this instanceof PasteTool))
		return new PasteTool(editor, struct);

	this.editor = editor;
	this.editor.selection(null);
	this.struct = struct;

	var rnd = editor.render;
	this.action = Action.fromPaste(rnd.ctab,
		this.struct, 'lastEvent' in this.OnMouseMove0 ?
			rnd.page2obj(this.OnMouseMove0.lastEvent) : undefined);
	rnd.update();
}

PasteTool.prototype = new EditorTool();
PasteTool.prototype.OnMouseMove = function (event) {
	var rnd = this.editor.render;
	if ('action' in this)
		this.action.perform(rnd.ctab);
	this.action = Action.fromPaste(rnd.ctab, this.struct, rnd.page2obj(event));
	rnd.update();
};

PasteTool.prototype.OnMouseUp = function () {
	if (this.action) {
		var action = this.action;
		delete this.action;
		this.editor.update(action);
	}
};

PasteTool.prototype.OnCancel = function () {
	var rnd = this.editor.render;
	if (this.action) {
		this.action.perform(rnd.ctab); // revert the action
		delete this.action;
	}
};

module.exports = PasteTool;
