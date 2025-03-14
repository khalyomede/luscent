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
var renderIf = function(context, conditions) {
	var elements = Array.from(document.querySelectorAll("[data-luscent-if]"));
	for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
		var element = elements_1[_i];
		if (!(element instanceof HTMLElement)) continue;
		var elementId = element.id;
		var elementHasId = elementId.length > 0;
		var key = element.dataset.luscentIf;
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
			var templateId = element.dataset.luscentTemplate;
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
			element.textContent = "";
			element.appendChild(template.content.cloneNode(true));
		} else element.textContent = "";
	}
};
var render_if_default = renderIf;

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
var renderFor = function(context, lists) {
	var elements = Array.from(document.querySelectorAll("[data-luscent-for]"));
	for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
		var element = elements_1[_i];
		if (!(element instanceof HTMLElement)) continue;
		var elementId = element.id;
		var elementHasId = elementId.length > 0;
		var key = element.dataset.luscentFor;
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
		var templateId = element.dataset.luscentTemplate;
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
		element.textContent = "";
		var items = lists[key](context.state);
		for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
			var item = items_1[_a];
			var clone = template.content.cloneNode(true);
			var valueElements = Array.from(clone.querySelectorAll("[data-luscent-value]"));
			for (var _b = 0, valueElements_1 = valueElements; _b < valueElements_1.length; _b++) {
				var valueElement = valueElements_1[_b];
				if (!(valueElement instanceof HTMLElement)) continue;
				var propName = valueElement.getAttribute("data-luscent-value");
				if (!propName) continue;
				if (propName in item) {
					var value = item[propName];
					if (valueElement instanceof HTMLInputElement) valueElement.value = value;
					else valueElement.textContent = value;
				}
			}
			element.appendChild(clone);
		}
	}
};
var render_for_default = renderFor;

//#endregion
//#region src/render-value.ts
var renderValue = function(context, getters) {
	document.querySelectorAll("[data-luscent-value]").forEach(function(element) {
		if (element.closest("template")) return;
		if (element.closest("[data-luscent-for]")) return;
		var getterName = element.getAttribute("data-luscent-value");
		var getterNameIsEmpty = getterName === null || getterName.trim().length === 0;
		var elementHasId = element.id.trim().length > 0;
		var elementId = element.id;
		if (getterNameIsEmpty) {
			if (elementHasId) console.warn("The element id \"".concat(elementId, "\" seems to have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly."));
			else console.warn("It seems you have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly.");
			return;
		}
		if (!getters.hasOwnProperty(getterName)) {
			if (elementHasId) console.warn("The element id \"".concat(elementId, "\" content with data-luscent-value=\"").concat(getterName, "\" could not be rendered because a getter with the same name could not be found."));
			else console.warn("The UI rendering failed for an element content with data-luscent-value=\"".concat(getterName, "\" could not be rendered because a getter with the same name Could not be found."));
			return;
		}
		console.log("Running getter ".concat(getterName));
		var value = getters[getterName](context.state);
		console.log("value was", value);
		if (element instanceof HTMLInputElement) element.value = value;
		else element.textContent = value;
	});
};
var render_value_default = renderValue;

//#endregion
//#region src/update-dom.ts
/**
* The function will take a state.
*
* Then find all the one-way data binding (data-luscent-value="..."), grab the value in the state and put it on the DOM element.
*/
var updateDOM = function(context, getters, conditions, lists) {
	console.log("DOM will be updated with");
	console.log(context.state);
	render_value_default(context, getters);
	render_if_default(context, conditions);
	if (lists) render_for_default(context, lists);
};
var update_dom_default = updateDOM;

//#endregion
//#region src/bind-events.ts
/**
* This method registers the event handler that react to DOM events.
*
* Each events goal is to return a new state to trigger a new UI change.
*/
var bindEvents = function(context, getters, methods, conditions, lists) {
	document.querySelectorAll("[data-luscent-on-click]").forEach(function(element) {
		var methodName = element.getAttribute("data-luscent-on-click");
		if (methodName && methods[methodName]) element.addEventListener("click", function(event) {
			context.state = methods[methodName](context.state, event);
			update_dom_default(context, getters, conditions, lists);
		});
	});
	document.querySelectorAll("[data-luscent-on-submit]").forEach(function(element) {
		var methodName = element.getAttribute("data-luscent-on-submit");
		if (methodName && methods[methodName]) element.addEventListener("submit", function(event) {
			event.preventDefault();
			context.state = methods[methodName](context.state, event);
			update_dom_default(context, getters, conditions, lists);
		});
	});
};
var bind_events_default = bindEvents;

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
var bindTwoWay = function(context, getters, conditions, lists) {
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
			update_dom_default(context, getters, conditions, lists);
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
	update_dom_default(context, getters, conditions, lists);
	bind_events_default(context, getters, methods, conditions, lists);
	bind_two_way_default(context, getters, conditions, lists);
	console.log("Luscent app started successfully");
};
var start_default = start;

//#endregion
exports.start = start_default
});