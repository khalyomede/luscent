(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ?  factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.luscent = {})));
})(this, function(exports) {
"use strict";

//#region \0tslib
var __assign = function() {
	__assign = Object.assign || function __assign$1(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
}
function __generator(thisArg, body) {
	var _ = {
		label: 0,
		sent: function() {
			if (t[0] & 1) throw t[1];
			return t[1];
		},
		trys: [],
		ops: []
	}, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
	return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
		return this;
	}), g;
	function verb(n) {
		return function(v) {
			return step([n, v]);
		};
	}
	function step(op) {
		if (f) throw new TypeError("Generator is already executing.");
		while (g && (g = 0, op[0] && (_ = 0)), _) try {
			if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
			if (y = 0, t) op = [op[0] & 2, t.value];
			switch (op[0]) {
				case 0:
				case 1:
					t = op;
					break;
				case 4:
					_.label++;
					return {
						value: op[1],
						done: false
					};
				case 5:
					_.label++;
					y = op[1];
					op = [0];
					continue;
				case 7:
					op = _.ops.pop();
					_.trys.pop();
					continue;
				default:
					if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
						_ = 0;
						continue;
					}
					if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
						_.label = op[1];
						break;
					}
					if (op[0] === 6 && _.label < t[1]) {
						_.label = t[1];
						t = op;
						break;
					}
					if (t && _.label < t[2]) {
						_.label = t[2];
						_.ops.push(op);
						break;
					}
					if (t[2]) _.ops.pop();
					_.trys.pop();
					continue;
			}
			op = body.call(thisArg, _);
		} catch (e) {
			op = [6, e];
			y = 0;
		} finally {
			f = t = 0;
		}
		if (op[0] & 5) throw op[1];
		return {
			value: op[0] ? op[1] : void 0,
			done: true
		};
	}
}

//#endregion
//#region src/find-by-xpath.ts
var findByXpath = function(expression, root) {
	if (root === void 0) root = null;
	var elements = [];
	var xpathResult = document.evaluate(expression, root !== null && root !== void 0 ? root : document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var index = 0; index < xpathResult.snapshotLength; index++) {
		var node = xpathResult.snapshotItem(index);
		if (node === null || !(node instanceof HTMLElement)) continue;
		elements.push(node);
	}
	return elements;
};
var find_by_xpath_default = findByXpath;

//#endregion
//#region src/bind-events.ts
/**
* This method registers the event handler that react to DOM events.
*
* Each events goal is to return a new state to trigger a new UI change.
*/
var bindEvents = function(state, context, methods, element) {
	var _a;
	console.debug("binding events");
	var target = element !== null && element !== void 0 ? element : document;
	console.debug("target is", target);
	var nodes = find_by_xpath_default("//*[./@*[starts-with(name(), \"data-luscent-on-\")]]", target);
	var _loop_1 = function(node$1) {
		console.debug("Found element matching data-luscent-on", node$1);
		var keys = Object.keys(node$1.dataset);
		var isTwoWayBinding = keys.some(function(key) {
			return key.endsWith("Bind");
		});
		if (isTwoWayBinding) return "continue";
		var luscentEventName = (_a = keys.filter(function(key) {
			return key.startsWith("luscentOn");
		})[0]) !== null && _a !== void 0 ? _a : "";
		var eventName = luscentEventName.replace("luscentOn", "").toLowerCase();
		var methodName = node$1.dataset[luscentEventName];
		var boundAttributeName = "luscentOn".concat(eventName.charAt(0).toUpperCase() + eventName.slice(1), "Bound");
		if (node$1.dataset[boundAttributeName] === "true") return "continue";
		if (methodName && methods[methodName]) {
			console.log("binding event to element", {
				eventName,
				methodName,
				node: node$1
			});
			node$1.addEventListener(eventName, function(event) {
				return __awaiter(void 0, void 0, void 0, function() {
					var id;
					return __generator(this, function(_a$1) {
						switch (_a$1.label) {
							case 0:
								if (eventName === "submit") event.preventDefault();
								id = node$1.dataset.luscentRenderedId;
								return [4, methods[methodName](context.state, event, id)];
							case 1:
								_a$1.sent();
								return [2];
						}
					});
				});
			}, {
				passive: eventName !== "submit",
				capture: true
			});
			node$1.dataset[boundAttributeName] = "true";
		}
	};
	for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
		var node = nodes_1[_i];
		_loop_1(node);
	}
};
var bind_events_default = bindEvents;

//#endregion
//#region src/compute-dom-updates.ts
var computeDomUpdates = function(difference) {
	var addedOrUpdated = __assign(__assign({}, difference.added), difference.updated);
	var domUpdates = [];
	var _loop_1 = function(key$1) {
		console.debug("Computing state key", key$1);
		var value = addedOrUpdated[key$1];
		var elementForValue = document.querySelector("[data-luscent-value=".concat(key$1, "]"));
		if (elementForValue instanceof HTMLElement) domUpdates.push(function() {
			return elementForValue.textContent = value;
		});
		var elementToSetAttributeTo = document.querySelector("[data-luscent-with=".concat(key$1, "]"));
		if (elementToSetAttributeTo instanceof HTMLElement) {
			var attributeName_1 = elementToSetAttributeTo.dataset.luscentAttribute;
			if (attributeName_1 !== undefined) domUpdates.push(function() {
				return elementToSetAttributeTo.setAttribute(attributeName_1, value);
			});
		}
		var element = document.querySelector("[data-luscent-if=".concat(key$1, "]"));
		console.debug("Trying to find element with [data-luscent-if=".concat(key$1, "]"), element);
		if (element instanceof HTMLElement) {
			console.debug("Found data-luscent-if element");
			var templateId = element.dataset.luscentTemplate;
			if (templateId !== undefined) {
				var template_1 = document.getElementById(templateId);
				if (template_1 instanceof HTMLTemplateElement) {
					domUpdates.push(function() {
						return element.textContent = "";
					});
					if (value) domUpdates.push(function() {
						return element.appendChild(template_1.content.cloneNode(true));
					});
				}
			}
		}
	};
	for (var key in addedOrUpdated) _loop_1(key);
	return domUpdates;
};
var compute_dom_updates_default = computeDomUpdates;

//#endregion
//#region src/object-difference.ts
var objectDifference = function(before, after) {
	var updated = {};
	var added = {};
	var deleted = {};
	var mutated = {};
	console.log("before", before);
	console.log("after", after);
	for (var keyBefore in before) {
		var valueBefore = before[keyBefore];
		if (keyBefore in after) {
			var valueAfter = after[keyBefore];
			if (valueBefore != valueAfter) updated[keyBefore] = valueAfter;
			if (typeof valueBefore != typeof valueAfter) mutated[keyBefore] = valueAfter;
		} else deleted[keyBefore] = before[keyBefore];
	}
	for (var keyAfter in after) if (!(keyAfter in before)) added[keyAfter] = after[keyAfter];
	return {
		added,
		updated,
		deleted,
		mutated
	};
};
var object_difference_default = objectDifference;

//#endregion
//#region src/perform-dom-updates.ts
var performDomUpdates = function(domUpdates) {
	return new Promise(function(resolve) {
		return requestAnimationFrame(function() {
			return requestAnimationFrame(function() {
				domUpdates.forEach(function(domUpdate) {
					return domUpdate();
				});
				resolve();
			});
		});
	});
};
var perform_dom_updates_default = performDomUpdates;

//#endregion
//#region src/updateDomTwo.ts
var updateDomTwo = function(context, state, newState, methods) {
	return __awaiter(void 0, void 0, void 0, function() {
		var difference, domUpdates;
		return __generator(this, function(_a) {
			switch (_a.label) {
				case 0:
					difference = object_difference_default(state, newState);
					console.log("diff", difference);
					domUpdates = compute_dom_updates_default(difference);
					return [4, perform_dom_updates_default(domUpdates)];
				case 1:
					_a.sent();
					bind_events_default(newState, context, methods);
					return [2];
			}
		});
	});
};
var updateDomTwo_default = updateDomTwo;

//#endregion
//#region src/start.ts
/**
* This is the function to call to start your reactive app.
*
* It starts by calculating the initial state.
*
* Then renders the UI for the first time.
*
* Finally it registers any event method, for them to trigger new UI changes.
*/
var start = function(parameters) {
	var state = parameters.state || {};
	var methods = parameters.methods || {};
	var getters = parameters.getters || {};
	var conditions = parameters.conditions || {};
	var lists = parameters.lists || {};
	var context = { state };
	updateDomTwo_default(context, {}, context.state, methods);
	console.log("Luscent app started successfully");
	return { updateState: function(state$1) {
		return __awaiter(void 0, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, updateDomTwo_default(context, context.state, state$1, methods)];
					case 1:
						_a.sent();
						context.state = __assign(__assign({}, context.state), state$1);
						return [2];
				}
			});
		});
	} };
};
var start_default = start;

//#endregion
exports.start = start_default
});