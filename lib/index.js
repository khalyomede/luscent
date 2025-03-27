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
//#region src/render-if.ts
/**
* This method will find all [data-luscent-if] and show the element if the condition met, or hide it otherwise.
*/
var renderIf = function(context, getters, methods, conditions, lists, element) {
	var target = element !== null && element !== void 0 ? element : document;
	var elements = Array.from(target.querySelectorAll("[data-luscent-if]"));
	for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
		var element_1 = elements_1[_i];
		if (!(element_1 instanceof HTMLElement)) continue;
		var elementId = element_1.id;
		var elementHasId = elementId.length > 0;
		var key = element_1.dataset.luscentIf;
		/**
		* œtodo Use didyoumean2 to suggest (for typos).
		*/
		if (key === undefined) {
			if (elementHasId) console.warn("The element with id \"".concat(elementId, "\" cannot be shown/hidden because data-luscent-if target an empty key."));
			else console.warn("An element cannot be shown/hidden because data-luscent-if target an empty key.");
			continue;
		}
		if (!(key in conditions)) {
			if (elementHasId) console.warn("The element with id \"".concat(elementId, "\" could not be shown/hidden because it uses data-luscent-if=\"").concat(key, "\" but no conditions was found with this key"));
			else console.warn("An element could not be shown/hidden because it uses data-luscent-if=\"".concat(key, "\" but no conditions was found with this key"));
			continue;
		}
		var value = conditions[key](context.state);
		if (value) {
			var templateId = element_1.dataset.luscentTemplate;
			if (templateId === undefined) {
				if (elementHasId) console.warn("The element with id \"".concat(elementId, "\" could not be shown/hidden because it has an empty data-luscent-template"));
				else console.warn("An element could not be shown/hidden because it has an empty data-luscent-template");
				continue;
			}
			var template = document.getElementById(templateId);
			if (template === null || !(template instanceof HTMLTemplateElement)) {
				if (elementHasId) console.warn("The element with id \"".concat(elementId, "\" could not be shown/hidden because no template exist with id empty data-luscent-template=\"").concat(templateId, "\""));
				else console.warn("An element could not be shown/hidden because no template exist with id empty data-luscent-template=\"".concat(templateId, "\""));
				continue;
			}
			var clone = template.content.cloneNode(true);
			var uniqueId = "luscent-".concat(Date.now(), "-").concat(Math.random().toString(36).substring(2, 9));
			var cloneChildren = Array.from(clone.childNodes).filter(function(child$1) {
				return child$1 instanceof HTMLElement;
			});
			for (var _a = 0, cloneChildren_1 = cloneChildren; _a < cloneChildren_1.length; _a++) {
				var child = cloneChildren_1[_a];
				child.dataset.luscentId = uniqueId;
			}
			element_1.textContent = "";
			element_1.appendChild(clone);
			var addedElements = Array.from(document.querySelectorAll("[data-luscent-id=\"".concat(uniqueId, "\"]")));
			for (var _b = 0, addedElements_1 = addedElements; _b < addedElements_1.length; _b++) {
				var addedElement = addedElements_1[_b];
				update_dom_default(context, getters, methods, conditions, lists, addedElement);
			}
		} else element_1.textContent = "";
	}
};
var render_if_default = renderIf;

//#endregion
//#region src/render-id.ts
/**
* This method will fill any data-luscent-id value by the iterate object corresponding value for this id.
* Useful when iterating with data-luscent-for, and you want to identify the iterate it, to identify it when reacting to
* an event like data-luscent-on-click="deleteTask" data-luscent-id="id" (where "id" is the name of the key in the iterated item).
*/
var renderId = function(element, item) {
	var domElements = Array.from(element.querySelectorAll("[data-luscent-id]"));
	for (var _i = 0, domElements_1 = domElements; _i < domElements_1.length; _i++) {
		var element_1 = domElements_1[_i];
		if (!(element_1 instanceof HTMLElement)) return;
		var key = element_1.dataset.luscentId;
		if (!key)
 /**
		* @todo Warn
		*/
		continue;
		if (!(key in item))
 /**
		* @todo Warn
		*/
		continue;
		var value = item[key];
		element_1.dataset.luscentRenderedId = String(value);
	}
};
var render_id_default = renderId;

//#endregion
//#region src/render-for.ts
/**
* This method will find all [data-luscent-for] and render a template for each item in the list.
*
* For each element with data-luscent-for, it:
* 1. Gets the list name from the attribute
* 2. Gets the template ID from data-luscent-template
* 3. Clears the element
* 4. For each item in the list:
*    a. Clones the template
*    b. Finds all elements with data-luscent-value in the clone
*    c. Sets each element's content to the corresponding property of the item
*    d. Appends the clone to the element
*/
var renderFor = function(context, getters, methods, conditions, lists, element) {
	var target = element !== null && element !== void 0 ? element : document;
	var elements = Array.from(target.querySelectorAll("[data-luscent-for]"));
	for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
		var element_1 = elements_1[_i];
		if (!(element_1 instanceof HTMLElement)) continue;
		var elementId = element_1.id;
		var elementHasId = elementId.length > 0;
		var key = element_1.dataset.luscentFor;
		if (key === undefined) {
			if (elementHasId) console.warn("The element with id \"".concat(elementId, "\" cannot iterate because data-luscent-for targets an empty key."));
			else console.warn("An element cannot iterate because data-luscent-for targets an empty key.");
			continue;
		}
		if (!(key in lists)) {
			if (elementHasId) console.warn("The element with id \"".concat(elementId, "\" could not iterate because it uses data-luscent-for=\"").concat(key, "\" but no list was found with this key."));
			else console.warn("An element could not iterate because it uses data-luscent-for=\"".concat(key, "\" but no list was found with this key."));
			continue;
		}
		var templateId = element_1.dataset.luscentTemplate;
		if (templateId === undefined) {
			if (elementHasId) console.warn("The element with id \"".concat(elementId, "\" could not iterate because it has an empty data-luscent-template."));
			else console.warn("An element could not iterate because it has an empty data-luscent-template.");
			continue;
		}
		var template = document.getElementById(templateId);
		if (template === null || !(template instanceof HTMLTemplateElement)) {
			if (elementHasId) console.warn("The element with id \"".concat(elementId, "\" could not iterate because no template exists with id data-luscent-template=\"").concat(templateId, "\"."));
			else console.warn("An element could not iterate because no template exists with id data-luscent-template=\"".concat(templateId, "\"."));
			continue;
		}
		var items = lists[key](context.state);
		var keyName = element_1.dataset.luscentKey;
		if (keyName === undefined)
 /**
		* @todo console.warn
		*/
		continue;
		for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
			var item = items_1[_a];
			var keyValue = item[keyName];
			var existingElement = element_1.querySelector("[data-luscent-key=\"".concat(keyValue, "\"]"));
			if (existingElement !== null) {
				console.debug("skipping rendering for element with id ".concat(keyValue));
				continue;
			}
			var clone = template.content.cloneNode(true);
			var cloneChildren = Array.from(clone.childNodes).filter(function(child$1) {
				return child$1 instanceof HTMLElement;
			});
			for (var _b = 0, cloneChildren_1 = cloneChildren; _b < cloneChildren_1.length; _b++) {
				var child = cloneChildren_1[_b];
				child.dataset.luscentKey = keyValue;
			}
			element_1.appendChild(clone);
			var addedElements = Array.from(document.querySelectorAll("[data-luscent-key=\"".concat(keyValue, "\"]")));
			for (var _c = 0, addedElements_1 = addedElements; _c < addedElements_1.length; _c++) {
				var addedElement = addedElements_1[_c];
				render_id_default(addedElement, item);
				update_dom_default(context, getters, methods, conditions, lists, addedElement, item);
			}
		}
	}
};
var render_for_default = renderFor;

//#endregion
//#region src/render-value.ts
var renderValue = function(context, getters, element, local) {
	var target = element !== null && element !== void 0 ? element : document;
	target.querySelectorAll("[data-luscent-value]").forEach(function(item) {
		if (!local && item.closest("[data-luscent-for]")) return;
		var getterName = item.getAttribute("data-luscent-value");
		var getterNameIsEmpty = getterName === null || getterName.trim().length === 0;
		var elementHasId = item.id.trim().length > 0;
		var elementId = item.id;
		if (getterNameIsEmpty) {
			if (elementHasId) console.warn("The element id \"".concat(elementId, "\" seems to have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly."));
			else console.warn("It seems you have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly.");
			return;
		}
		if (!local && !getters.hasOwnProperty(getterName)) {
			if (elementHasId) console.warn("The element id \"".concat(elementId, "\" content with data-luscent-value=\"").concat(getterName, "\" could not be rendered because a getter with the same name could not be found."));
			else console.warn("The UI rendering failed for an element content with data-luscent-value=\"".concat(getterName, "\" could not be rendered because a getter with the same name Could not be found."));
			return;
		}
		var value = local ? local[getterName] : getters[getterName](context.state);
		if (item instanceof HTMLInputElement) item.value = value;
		else item.textContent = value;
	});
};
var render_value_default = renderValue;

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
var bindEvents = function(context, methods, element) {
	var _a;
	var target = element !== null && element !== void 0 ? element : document;
	var nodes = find_by_xpath_default("//*[./@*[starts-with(name(), \"data-luscent-on-\")]]", target);
	var _loop_1 = function(node$1) {
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
//#region src/render-bind.ts
/**
* This method updates all input elements with data-luscent-on-input-bind attributes
* to reflect the current state values.
*
* It completes the two-way binding process by handling the state → DOM direction
* (the DOM → state direction is handled by the bindTwoWay function).
*/
var renderBind = function(context, element) {
	var target = element !== null && element !== void 0 ? element : document;
	var elements = Array.from(target.querySelectorAll("[data-luscent-on-input-bind]"));
	for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
		var element_1 = elements_1[_i];
		if (!(element_1 instanceof HTMLElement)) continue;
		var elementId = element_1.id;
		var elementHasId = elementId.trim().length > 0;
		var key = element_1.dataset.luscentOnInputBind;
		if (key === undefined) {
			if (elementHasId) console.warn("The element with id \"".concat(elementId, "\" has an empty data-luscent-on-input-bind attribute. Cannot sync with state."));
			else console.warn("An element has an empty data-luscent-on-input-bind attribute. Cannot sync with state.");
			continue;
		}
		if (!(key in context.state)) {
			if (elementHasId) console.warn("The element with id \"".concat(elementId, "\" has data-luscent-on-input-bind=\"").concat(key, "\", but no corresponding state property exists."));
			else console.warn("An element has data-luscent-on-input-bind=\"".concat(key, "\", but no corresponding state property exists."));
			continue;
		}
		if (!(element_1 instanceof HTMLInputElement)) {
			if (elementHasId) console.warn("The element with id \"".concat(elementId, "\" has data-luscent-on-input-bind=\"").concat(key, "\" but is not an input element. Cannot sync with state."));
			else console.warn("An element has data-luscent-on-input-bind=\"".concat(key, "\" but is not an input element. Cannot sync with state."));
			continue;
		}
		var value = context.state[key];
		element_1.value = String(value);
	}
};
var render_bind_default = renderBind;

//#endregion
//#region src/bind-two-way.ts
var bindTwoWay = function(context, getters, methods, conditions, lists) {
	var elements = find_by_xpath_default("//*[./@*[starts-with(name(), \"data-luscent-on-\") and substring(name(), string-length(name()) - 4) = \"-bind\"]]");
	for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
		var element = elements_1[_i];
		var elementId = element.id;
		var elementHasId = elementId.trim().length > 0;
		var keys = Object.keys(element.dataset).filter(function(key$1) {
			return key$1.startsWith("luscentOn") && key$1.endsWith("Bind");
		});
		var _loop_1 = function(key$1) {
			var eventName = key$1.replace("luscentOn", "").replace("Bind", "").toLowerCase();
			var stateKey = element.dataset[key$1];
			var boundAttributeName = "luscentOn".concat(eventName.charAt(0).toUpperCase() + eventName.slice(1), "BindBound");
			if (element.dataset[boundAttributeName] === "true") return "continue";
			if (!stateKey) {
				if (elementHasId) console.warn("Please specify a key when using data-luscent-on-".concat(eventName, "-bind on the element with id \"").concat(elementId, "\"."));
				else console.warn("Please specify a key when using data-luscent-on-".concat(eventName, "-bind."));
				return "continue";
			}
			if (!(element instanceof HTMLInputElement)) {
				if (elementHasId) console.warn("It seems you tried to bind a value (using data-luscent-on-".concat(eventName, "-bind=\"").concat(stateKey, "\") on the element with id \"").concat(elementId, "\" that is not an HTMLInputElement. This won't make the data reactive."));
				else console.warn("It seems you tried to bind a value (using data-luscent-on-".concat(eventName, "-bind=\"").concat(stateKey, "\") on an element that is not an HTMLInputElement. This won't make the data reactive."));
				return "continue";
			}
			element.addEventListener(eventName, function(event) {
				var _a$1;
				if (!(event instanceof InputEvent)) return;
				var target = event.target;
				context.state = __assign(__assign({}, context.state), (_a$1 = {}, _a$1[stateKey] = target.value, _a$1));
				update_dom_default(context, getters, methods, conditions, lists);
			});
			element.dataset[boundAttributeName] = "true";
		};
		for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
			var key = keys_1[_a];
			_loop_1(key);
		}
	}
};
var bind_two_way_default = bindTwoWay;

//#endregion
//#region src/hyphenize.ts
var hyphenize = function(text) {
	return text.replace(/([A-Z])/g, "-$1").replace(/[\s_-]+/g, "-").toLowerCase().replace(/^-/, "").replace(/-$/, "");
};
var hyphenize_default = hyphenize;

//#endregion
//#region src/render-set.ts
/**
* @todo Use it to replace other location where this logic is similar (finding attribute/value from dataset starting with...).
*/
var getAttribute = function(dataset) {
	var _a;
	for (var key in dataset) if (key.startsWith("luscentSet")) return {
		key: key.replace("luscentSet", ""),
		value: (_a = dataset[key]) !== null && _a !== void 0 ? _a : null
	};
	return null;
};
var renderSet = function(context, getters, element, local) {
	var target = element !== null && element !== void 0 ? element : document;
	var nodes = find_by_xpath_default("//*[./@*[starts-with(name(), \"data-luscent-set-\")]]", target);
	for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
		var node = nodes_1[_i];
		var attribute = getAttribute(node.dataset);
		if (attribute === null)
 /**
		* @todo console.warn
		*/
		continue;
		var key = attribute.key, value = attribute.value;
		if (value === null || value.trim().length === 0)
 /**
		* @todo console.warn
		*/
		continue;
		if (key.trim().length === 0)
 /**
		* @todo console.warn
		*/
		continue;
		var getterValue = local !== undefined ? local[value] : getters[value](context.state);
		node.setAttribute(hyphenize_default(key), getterValue);
	}
};
var render_set_default = renderSet;

//#endregion
//#region src/update-dom.ts
/**
* The function will take a state.
*
* Then find all the one-way data binding (data-luscent-value="..."), grab the value in the state and put it on the DOM element.
*/
var updateDOM = function(context, getters, methods, conditions, lists, element, local) {
	render_value_default(context, getters, element, local);
	render_set_default(context, getters, element, local);
	render_bind_default(context, element);
	render_if_default(context, getters, methods, conditions, lists, element);
	if (lists) render_for_default(context, getters, methods, conditions, lists, element);
	bind_events_default(context, methods, element);
	bind_two_way_default(context, getters, methods, conditions, lists);
};
var update_dom_default = updateDOM;

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
	update_dom_default(context, getters, methods, conditions, lists);
	console.log("Luscent app started successfully");
	return { updateState: function(state$1) {
		context.state = __assign(__assign({}, context.state), state$1);
		update_dom_default(context, getters, methods, conditions, lists);
	} };
};
var start_default = start;

//#endregion
exports.start = start_default