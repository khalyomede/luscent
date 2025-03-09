
//#region src/update-dom.ts
/**
* The function will take a state.
*
* Then find all the one-way data binding (data-luscent-value="..."), grab the value in the state and put it on the DOM element.
*/
var updateDOM = function(state) {
	if (!(state instanceof Object)) {
		console.warn("The UI update failed because it seems the state is not an object. Your state should be an object (of anything you want inside of it).");
		return;
	}
	document.querySelectorAll("[data-luscent-value]").forEach(function(element) {
		var key = element.getAttribute("data-luscent-value");
		var keyIsEmpty = key === null || key.trim().length === 0;
		var elementHasId = element.id.trim().length > 0;
		var elementId = element.id;
		if (keyIsEmpty) {
			if (elementHasId) console.warn("The element id \"".concat(elementId, "\" seems to have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly."));
			else console.warn("It seems you have a data-luscent-value with an empty value. Please fill it to let the UI update pursue correctly.");
			return;
		}
		if (!state.hasOwnProperty(key)) {
			if (elementHasId) console.warn("The element id \"".concat(elementId, "\" content with data-luscent-value=\"").concat(key, "\" could not be rendered because the state does not contain the key \"").concat(key, "\"."));
			else console.warn("The UI rendering failed for an element content with data-luscent-value=\"".concat(key, "\" could not be rendered because the state does not contain the key \"").concat(key, "\"."));
			return;
		}
		element.textContent = String(state[key]);
	});
};
var update_dom_default = updateDOM;

//#endregion
//#region src/bind-events.ts
/**
* This method registers the event handler that react to DOM events.
*
* Each events goal is to return a new state to trigger a new UI change.
*/
var bindEvents = function(methods, state) {
	document.querySelectorAll("[data-luscent-on-click]").forEach(function(element) {
		var methodName = element.getAttribute("data-luscent-on-click");
		if (methodName && methods[methodName]) element.addEventListener("click", function(event) {
			state = methods[methodName](state, event);
			update_dom_default(state);
		});
	});
};
var bind_events_default = bindEvents;

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
	update_dom_default(state);
	bind_events_default(methods, state);
	console.log("Luscent app started successfully");
};
var start_default = start;

//#endregion
export { start_default as start };