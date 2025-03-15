(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ?  factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.luscent = {})));
})(this, function(exports) {
"use strict";

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
		element_1.textContent = "";
		var items = lists[key](context.state);
		for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
			var item = items_1[_a];
			var clone = template.content.cloneNode(true);
			var uniqueKey = "luscent-".concat(Date.now(), "-").concat(Math.random().toString(36).substring(2, 9));
			var cloneChildren = Array.from(clone.childNodes).filter(function(child$1) {
				return child$1 instanceof HTMLElement;
			});
			for (var _b = 0, cloneChildren_1 = cloneChildren; _b < cloneChildren_1.length; _b++) {
				var child = cloneChildren_1[_b];
				child.dataset.luscentKey = uniqueKey;
			}
			element_1.appendChild(clone);
			var addedElements = Array.from(document.querySelectorAll("[data-luscent-key=\"".concat(uniqueKey, "\"]")));
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
		if (!local && item.closest("[data-luscent-for]")) {
			console.log("skipping data-luscent-value because closest is luscent-for");
			return;
		}
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
//#region src/bind-events.ts
/**
* This method registers the event handler that react to DOM events.
*
* Each events goal is to return a new state to trigger a new UI change.
*/
var bindEvents = function(context, getters, methods, conditions, lists, element) {
	var _a;
	var target = element !== null && element !== void 0 ? element : document;
	var xpathExpression = "//*[./@*[starts-with(name(), \"data-luscent-on-\")]]";
	var xpathResult = document.evaluate(xpathExpression, target, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var _loop_1 = function(i$1) {
		var node = xpathResult.snapshotItem(i$1);
		if (node instanceof HTMLElement) {
			var keys = Object.keys(node.dataset);
			var isTwoWayBinding = keys.some(function(key) {
				return key.endsWith("Bind");
			});
			if (isTwoWayBinding) return "continue";
			var luscentEventName = (_a = keys.filter(function(key) {
				return key.startsWith("luscentOn");
			})[0]) !== null && _a !== void 0 ? _a : "";
			var eventName_1 = luscentEventName.replace("luscentOn", "").toLowerCase();
			var methodName_1 = node.dataset[luscentEventName];
			var boundAttributeName = "luscentOn".concat(eventName_1.charAt(0).toUpperCase() + eventName_1.slice(1), "Bound");
			if (node.dataset[boundAttributeName] === "true") {
				console.debug("Will not bind event ".concat(eventName_1, " to element because is is already bound"), node);
				return "continue";
			}
			if (methodName_1 && methods[methodName_1]) {
				console.log("Binding event ".concat(eventName_1, " to element"), node);
				node.addEventListener(eventName_1, function(event) {
					if (eventName_1 === "submit") event.preventDefault();
					var id = node.dataset.luscentRenderedId;
					context.state = methods[methodName_1](context.state, event, id);
					update_dom_default(context, getters, methods, conditions, lists);
				});
				node.dataset[boundAttributeName] = "true";
			}
		}
	};
	for (var i = 0; i < xpathResult.snapshotLength; i++) _loop_1(i);
};
var bind_events_default = bindEvents;

//#endregion
//#region src/update-dom.ts
/**
* The function will take a state.
*
* Then find all the one-way data binding (data-luscent-value="..."), grab the value in the state and put it on the DOM element.
*/
var updateDOM = function(context, getters, methods, conditions, lists, element, local) {
	render_value_default(context, getters, element, local);
	render_if_default(context, getters, methods, conditions, lists, element);
	if (lists) render_for_default(context, getters, methods, conditions, lists, element);
	bind_events_default(context, getters, methods, conditions, lists, element);
};
var update_dom_default = updateDOM;

//#endregion
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

//#endregion
//#region src/bind-two-way.ts
var bindTwoWay = function(context, getters, methods, conditions, lists) {
	var elements = Array.from(document.querySelectorAll("[data-luscent-on-input-bind]"));
	var _loop_1 = function(element$1) {
		if (!(element$1 instanceof HTMLElement)) return "continue";
		var elementId = element$1.id;
		var elementHasId = elementId.trim().length > 0;
		var key = element$1.dataset.luscentOnInputBind;
		if (key === undefined) {
			if (elementHasId) console.warn("Please specify a key when using data-luscent-on-input-bind on the element with id \"".concat(elementId, "\"."));
			else console.warn("Please specify a key when using data-luscent-on-input-bind.");
			return { value: void 0 };
		}
		if (!(element$1 instanceof HTMLInputElement)) {
			if (elementHasId) console.warn("It seems you tried to bind a value (using data-luscent-on-input-bind=\"".concat(key, "\") on the element with id \"").concat(elementId, "\" that is not an HTMLInputElement. This won't make the data reactive."));
			else console.warn("It seems you tried to bind a value (using data-luscent-on-input-bind=\"".concat(key, "\") on an element that is not an HTMLInputElement. This won't make the data reactive."));
			return "continue";
		}
		element$1.addEventListener("input", function(event) {
			var _a;
			if (!(event instanceof InputEvent)) return;
			var target = event.target;
			context.state = __assign(__assign({}, context.state), (_a = {}, _a[key] = target.value, _a));
			update_dom_default(context, getters, methods, conditions, lists);
		});
	};
	for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
		var element = elements_1[_i];
		var state_1 = _loop_1(element);
		if (typeof state_1 === "object") return state_1.value;
	}
};
var bind_two_way_default = bindTwoWay;

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
	/**
	* @todo Do the same as bindEvents: keep track of bounded elements + move this call to updateDOM
	*/
	bind_two_way_default(context, getters, methods, conditions, lists);
	console.log("Luscent app started successfully");
};
var start_default = start;

//#endregion
exports.start = start_default
});