"use strict";

//#region src/update-dom.ts
/**
* The function will take a state.
*
* Then find all the one-way data binding (data-luscent-value="..."), grab the value in the state and put it on the DOM element.
*/
var updateDOM = function(context, getters) {
	console.log("DOM will be updated with");
	console.log(context.state);
	document.querySelectorAll("[data-luscent-value]").forEach(function(element) {
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
	/**
	* @todo Same for data-luscent-on-input-bind="stateKey"
	*/
};
var update_dom_default = updateDOM;

//#endregion
//#region src/bind-events.ts
/**
* This method registers the event handler that react to DOM events.
*
* Each events goal is to return a new state to trigger a new UI change.
*/
var bindEvents = function(context, getters, methods) {
	document.querySelectorAll("[data-luscent-on-click]").forEach(function(element) {
		var methodName = element.getAttribute("data-luscent-on-click");
		if (methodName && methods[methodName]) element.addEventListener("click", function(event) {
			context.state = methods[methodName](context.state, event);
			update_dom_default(context, getters);
		});
	});
	document.querySelectorAll("[data-luscent-on-submit]").forEach(function(element) {
		var methodName = element.getAttribute("data-luscent-on-submit");
		if (methodName && methods[methodName]) element.addEventListener("submit", function(event) {
			event.preventDefault();
			context.state = methods[methodName](context.state, event);
			update_dom_default(context, getters);
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
var bindTwoWay = function(context, getters) {
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
			update_dom_default(context, getters);
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
	var context = { state };
	update_dom_default(context, getters);
	bind_events_default(context, getters, methods);
	bind_two_way_default(context, getters);
	console.log("Luscent app started successfully");
};
var start_default = start;

//#endregion
exports.start = start_default