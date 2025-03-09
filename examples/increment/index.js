(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ?  factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.luscent = {})));
})(this, function(exports) {
"use strict";

//#region src/index.ts
var start = function() {
	return console.log("App is starting.");
};

//#endregion
exports.start = start
});