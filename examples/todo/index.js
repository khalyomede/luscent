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
function __spreadArray(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
}

//#endregion
//#region src/bind-events.ts
/**
* This method registers the event handler that react to DOM events.
*
* Each events goal is to return a new state to trigger a new UI change.
*/
var bindEvents = function(state, context, methods, target) {
	var elements = Array.from(document.querySelectorAll("[data-luscent-on][data-luscent-trigger]:not([data-luscent-bound])"));
	var _loop_1 = function(element$1) {
		if (!(element$1 instanceof HTMLElement)) return "continue";
		var methodName = element$1.dataset.luscentTrigger;
		if (methodName === undefined || !(methodName in methods)) return "continue";
		var eventName = element$1.dataset.luscentOn;
		if (eventName === undefined) return "continue";
		var prevent = element$1.dataset.luscentPreventDefault;
		element$1.addEventListener(eventName, function(event) {
			return __awaiter(void 0, void 0, void 0, function() {
				var id;
				return __generator(this, function(_a) {
					switch (_a.label) {
						case 0:
							if (prevent !== undefined) event.preventDefault();
							id = element$1.dataset.luscentRenderedId;
							return [4, methods[methodName](context.state, event, id)];
						case 1:
							_a.sent();
							return [2];
					}
				});
			});
		}, {
			passive: prevent === undefined,
			capture: true
		});
		element$1.dataset.luscentBound = String(true);
	};
	for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
		var element = elements_1[_i];
		_loop_1(element);
	}
};
var bind_events_default = bindEvents;

//#endregion
//#region src/bind-two-way.ts
var bindTwoWay = function(newState, context, methods, target) {
	var _loop_1 = function(key$1) {
		var element = target.querySelector("[data-luscent-bind=".concat(key$1, "]"));
		if (!(element instanceof HTMLElement)) return "continue";
		var eventName = element.dataset.luscentBindOn;
		if (eventName === undefined) return "continue";
		if (!(element instanceof HTMLInputElement)) return "continue";
		var boundEvent = element.dataset.luscentBound;
		if (boundEvent !== undefined) return "continue";
		element.addEventListener(eventName, function(event) {
			return __awaiter(void 0, void 0, void 0, function() {
				var value, updatedState;
				var _a;
				return __generator(this, function(_b) {
					switch (_b.label) {
						case 0:
							console.log("two way triggering...");
							if (!(event.target instanceof HTMLInputElement)) return [2];
							value = event.target.value;
							updatedState = (_a = {}, _a[key$1] = value, _a);
							return [4, update_dom_two_default(context, context.state, updatedState, methods, [document])];
						case 1:
							_b.sent();
							return [2];
					}
				});
			});
		});
		element.dataset.luscentBound = String(true);
	};
	for (var key in newState) _loop_1(key);
};
var bind_two_way_default = bindTwoWay;

//#endregion
//#region src/compute-dom-updates.ts
var getTemplate = function(id, cache) {
	if (cache.has(id)) {
		console.debug("template cache hit", id);
		return cache.get(id);
	}
	var template = document.querySelector("template#".concat(id));
	console.debug("Search for template with id ".concat(id, " (uncached)̀"));
	if (template instanceof HTMLTemplateElement) {
		cache.set(id, template);
		console.debug("warming cache");
		return template;
	}
	return undefined;
};
var computeDomUpdates = function(difference, root) {
	if (root === void 0) root = document;
	var addedOrUpdated = __assign(__assign({}, difference.added), difference.updated);
	var updates = {
		domUpdates: [],
		elementsToRender: new Map()
	};
	var cachedTemplates = new Map();
	var _loop_1 = function(key$1) {
		console.debug("Computing state key", key$1);
		var value = addedOrUpdated[key$1];
		console.debug("----- data-luscent-value");
		var elementForValue = root.querySelector("[data-luscent-value=".concat(key$1, "]"));
		if (elementForValue instanceof HTMLElement) updates.domUpdates.push(function() {
			return elementForValue.textContent = value;
		});
		console.debug("----- data-luscent-id");
		var elementForId = root.querySelector("[data-luscent-id=".concat(key$1, "]"));
		if (elementForId instanceof HTMLElement) elementForId.dataset.luscentRenderedId = value;
		console.debug("----- data-luscent-bind");
		var boundElement = root.querySelector("[data-luscent-bind=".concat(key$1, "]"));
		if (boundElement instanceof HTMLInputElement) updates.domUpdates.push(function() {
			return boundElement.value = value;
		});
		console.debug("----- data-luscent-attribute");
		var elementToSetAttributeTo = root.querySelector("[data-luscent-with=".concat(key$1, "]"));
		if (elementToSetAttributeTo instanceof HTMLElement) {
			var attributeName_1 = elementToSetAttributeTo.dataset.luscentAttribute;
			if (attributeName_1 !== undefined) updates.domUpdates.push(function() {
				return elementToSetAttributeTo.setAttribute(attributeName_1, value);
			});
		}
		console.debug("----- data-luscent-if");
		var element = root.querySelector("[data-luscent-if=".concat(key$1, "]"));
		console.debug("Trying to find element with [data-luscent-if=".concat(key$1, "]"), element);
		if (element instanceof HTMLElement) {
			console.debug("Found data-luscent-if element");
			var templateId = element.dataset.luscentTemplate;
			if (templateId !== undefined) {
				var template_1 = root.querySelector("template#".concat(templateId));
				if (template_1 instanceof HTMLTemplateElement) {
					updates.domUpdates.push(function() {
						return element.textContent = "";
					});
					if (value) {
						updates.domUpdates.push(function() {
							return element.appendChild(template_1.content.cloneNode(true));
						});
						updates.elementsToRender.set(element, addedOrUpdated);
					}
				}
			}
		}
		console.debug("----- data-luscent-for");
		if (Array.isArray(value)) {
			var elementLooped_1 = root.querySelector("[data-luscent-for=".concat(key$1, "]"));
			console.debug("Finding element with data-luscent-for=".concat(key$1));
			if (elementLooped_1 instanceof HTMLElement) {
				var templateId = elementLooped_1.dataset.luscentTemplate;
				console.debug("Finding template with id=".concat(templateId));
				if (templateId !== undefined) {
					var template = getTemplate(templateId, cachedTemplates);
					if (template !== undefined) {
						console.debug("Found template");
						var idName = elementLooped_1.dataset.luscentKey;
						if (idName !== undefined) {
							var lastAddedElement_1 = null;
							console.debug("Iterating on values for data-luscent-for=".concat(key$1), value);
							var _loop_2 = function(item$1) {
								console.debug("rendering item", item$1);
								if (typeof item$1 === "object") {
									var id = item$1[idName];
									var itemElement = root.querySelector("[data-luscent-rendered-for-key=\"".concat(key$1, ".").concat(idName, "\"][data-luscent-rendered-for-id=\"").concat(id, "\"]"));
									if (itemElement instanceof HTMLElement) lastAddedElement_1 = itemElement;
									else {
										var content_1 = template.content.cloneNode(true);
										var childElements = Array.from(content_1.childNodes);
										for (var _a = 0, childElements_1 = childElements; _a < childElements_1.length; _a++) {
											var childElement = childElements_1[_a];
											if (!(childElement instanceof HTMLElement)) continue;
											console.debug("---- child is", childElement);
											childElement.dataset.luscentRenderedForKey = "".concat(key$1, ".").concat(idName);
											childElement.dataset.luscentRenderedForId = id;
											updates.elementsToRender.set(childElement, item$1);
										}
										if (lastAddedElement_1 !== null) updates.domUpdates.push(function() {
											return lastAddedElement_1 === null || lastAddedElement_1 === void 0 ? void 0 : lastAddedElement_1.after(content_1);
										});
										else updates.domUpdates.push(function() {
											return elementLooped_1.append(content_1);
										});
									}
								}
							};
							for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
								var item = value_1[_i];
								_loop_2(item);
							}
						}
					}
				}
			}
			cachedTemplates = new Map();
		}
	};
	for (var key in addedOrUpdated) _loop_1(key);
	return updates;
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
//#region src/update-dom-two.ts
var updateDomTwo = function(context_1, state_1, newState_1, methods_1, elements_1) {
	var args_1 = [];
	for (var _i = 5; _i < arguments.length; _i++) args_1[_i - 5] = arguments[_i];
	return __awaiter(void 0, __spreadArray([
		context_1,
		state_1,
		newState_1,
		methods_1,
		elements_1
	], args_1, true), Promise, function(context, state, newState, methods, elements, persistState) {
		var difference, computedDomUpdates, newElementsToRender, _a, elements_2, element, _b, domUpdates, elementsToRender, _c, elements_3, element, updates_1;
		if (persistState === void 0) persistState = true;
		return __generator(this, function(_d) {
			switch (_d.label) {
				case 0:
					console.log("----- rendering start", elements);
					difference = object_difference_default(state, newState);
					console.log("diff", difference);
					computedDomUpdates = [];
					newElementsToRender = new Map();
					for (_a = 0, elements_2 = elements; _a < elements_2.length; _a++) {
						element = elements_2[_a];
						_b = compute_dom_updates_default(difference, element), domUpdates = _b.domUpdates, elementsToRender = _b.elementsToRender;
						computedDomUpdates.push.apply(computedDomUpdates, domUpdates);
						elementsToRender.forEach(function(partialState, element$1) {
							return newElementsToRender.set(element$1, partialState);
						});
					}
					return [4, perform_dom_updates_default(computedDomUpdates)];
				case 1:
					_d.sent();
					for (_c = 0, elements_3 = elements; _c < elements_3.length; _c++) {
						element = elements_3[_c];
						bind_events_default(newState, context, methods, element);
						bind_two_way_default(newState, context, methods, element);
					}
					if (!(newElementsToRender.size > 0)) return [3, 3];
					console.debug("new elements to render");
					newElementsToRender.forEach(function(_, element$1) {
						return console.debug(element$1);
					});
					updates_1 = [];
					newElementsToRender.forEach(function(partialState, element$1) {
						return updates_1.push(updateDomTwo(context, {}, partialState, methods, [element$1], false));
					});
					return [4, Promise.all(updates_1)];
				case 2:
					_d.sent();
					_d.label = 3;
				case 3:
					if (persistState) context.state = __assign(__assign({}, context.state), newState);
					return [2];
			}
		});
	});
};
var update_dom_two_default = updateDomTwo;

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
	update_dom_two_default(context, {}, context.state, methods, [document]);
	console.log("Luscent app started successfully");
	return { updateState: function(state$1) {
		return __awaiter(void 0, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, update_dom_two_default(context, context.state, state$1, methods, [document])];
					case 1:
						_a.sent();
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