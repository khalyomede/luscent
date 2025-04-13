
//#region \0tslib
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
//#region src/index.ts
function findElementsByAttribute(attr, root) {
	if (root === void 0) root = document;
	return Array.from(root.querySelectorAll("[".concat(attr, "]"))).filter(function(el) {
		return el instanceof HTMLElement;
	});
}
function findElementsByAttributeValue(attr, value, root) {
	if (root === void 0) root = document;
	return Array.from(root.querySelectorAll("[".concat(attr, "=\"").concat(value, "\"]"))).filter(function(el) {
		return el instanceof HTMLElement;
	});
}
function renderValue(context_1, getters_1) {
	return __awaiter(this, arguments, Promise, function(context, getters, root, localData) {
		var elements, _i, elements_1, element, getterName, value;
		if (root === void 0) root = document;
		return __generator(this, function(_a) {
			elements = findElementsByAttribute("data-luscent-value", root);
			for (_i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
				element = elements_1[_i];
				if (!localData && element.closest("[data-luscent-for]")) continue;
				getterName = element.getAttribute("data-luscent-value");
				if (!getterName) continue;
				value = void 0;
				if (localData && getterName in localData) value = localData[getterName];
				else if (getters[getterName]) value = getters[getterName](context.state);
				else if (getterName in context.state) value = context.state[getterName];
				else {
					console.warn("No getter or state property found for data-luscent-value=\"".concat(getterName, "\""));
					continue;
				}
				if (element instanceof HTMLInputElement) element.value = String(value);
				else element.textContent = String(value);
			}
			return [2];
		});
	});
}
function renderAttributes(context, attributes, root, localData) {
	if (root === void 0) root = document;
	var elements = findElementsByAttribute("data-luscent-attach", root);
	for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
		var element = elements_2[_i];
		var attributeName = element.getAttribute("data-luscent-attach");
		var withKey = element.getAttribute("data-luscent-with");
		if (!attributeName || !withKey) continue;
		var value = void 0;
		if (attributes[withKey]) value = attributes[withKey](context.state);
		else if (withKey in context.state) value = context.state[withKey];
		else {
			console.warn("No attribute getter or state property found for data-luscent-with=\"".concat(withKey, "\""));
			continue;
		}
		if (value === undefined || value === null) element.removeAttribute(attributeName);
		else if (value === true) element.setAttribute(attributeName, "");
		else element.setAttribute(attributeName, String(value));
	}
}
function renderIf(context_1, getters_1, methods_1, conditions_1, lists_1, attributes_1) {
	return __awaiter(this, arguments, Promise, function(context, getters, methods, conditions, lists, attributes, root) {
		var _a, _b, _c, _i, condition, elements, isTrue, _d, elements_3, element, templateId, template, clone;
		if (root === void 0) root = document;
		return __generator(this, function(_e) {
			switch (_e.label) {
				case 0:
					_a = conditions;
					_b = [];
					for (_c in _a) _b.push(_c);
					_i = 0;
					_e.label = 1;
				case 1:
					if (!(_i < _b.length)) return [3, 6];
					_c = _b[_i];
					if (!(_c in _a)) return [3, 5];
					condition = _c;
					elements = findElementsByAttributeValue("data-luscent-if", condition, root);
					isTrue = conditions[condition](context.state);
					_d = 0, elements_3 = elements;
					_e.label = 2;
				case 2:
					if (!(_d < elements_3.length)) return [3, 5];
					element = elements_3[_d];
					templateId = element.dataset.luscentTemplate;
					if (!templateId) return [3, 4];
					template = document.getElementById(templateId);
					if (!(template instanceof HTMLTemplateElement)) return [3, 4];
					element.innerHTML = "";
					if (!isTrue) return [3, 4];
					clone = template.content.cloneNode(true);
					element.appendChild(clone);
					return [4, updateDOM(context, getters, methods, conditions, lists, attributes, element)];
				case 3:
					_e.sent();
					_e.label = 4;
				case 4:
					_d++;
					return [3, 2];
				case 5:
					_i++;
					return [3, 1];
				case 6: return [2];
			}
		});
	});
}
function renderFor(context_1, getters_1, methods_1, conditions_1, lists_1, attributes_1) {
	return __awaiter(this, arguments, Promise, function(context, getters, methods, conditions, lists, attributes, root) {
		var forElements, _i, forElements_1, element, listName, templateId, template, keyName, items, _loop_1, _a, items_1, item;
		if (root === void 0) root = document;
		return __generator(this, function(_b) {
			switch (_b.label) {
				case 0:
					forElements = findElementsByAttribute("data-luscent-for", root);
					_i = 0, forElements_1 = forElements;
					_b.label = 1;
				case 1:
					if (!(_i < forElements_1.length)) return [3, 6];
					element = forElements_1[_i];
					listName = element.dataset.luscentFor;
					if (!listName || !lists[listName]) return [3, 5];
					templateId = element.dataset.luscentTemplate;
					if (!templateId) return [3, 5];
					template = document.getElementById(templateId);
					if (!(template instanceof HTMLTemplateElement)) return [3, 5];
					keyName = element.dataset.luscentKey || "id";
					items = lists[listName](context.state);
					element.innerHTML = "";
					_loop_1 = function(item$1) {
						var keyValue, clone, addedElement;
						return __generator(this, function(_c) {
							switch (_c.label) {
								case 0:
									keyValue = item$1[keyName];
									clone = template.content.cloneNode(true);
									Array.from(clone.children).forEach(function(child) {
										if (child instanceof HTMLElement) {
											if (keyValue !== undefined) child.dataset.luscentId = String(keyValue);
										}
									});
									element.appendChild(clone);
									addedElement = element.lastElementChild;
									if (!(addedElement && addedElement instanceof HTMLElement)) return [3, 3];
									return [4, renderValue(context, getters, addedElement, item$1)];
								case 1:
									_c.sent();
									return [4, renderAttributes(context, attributes, addedElement, item$1)];
								case 2:
									_c.sent();
									bindEvents(context, methods, addedElement);
									_c.label = 3;
								case 3: return [2];
							}
						});
					};
					_a = 0, items_1 = items;
					_b.label = 2;
				case 2:
					if (!(_a < items_1.length)) return [3, 5];
					item = items_1[_a];
					return [5, _loop_1(item)];
				case 3:
					_b.sent();
					_b.label = 4;
				case 4:
					_a++;
					return [3, 2];
				case 5:
					_i++;
					return [3, 1];
				case 6: return [2];
			}
		});
	});
}
function renderBind(context, root) {
	if (root === void 0) root = document;
	var elements = findElementsByAttribute("data-luscent-bind", root);
	for (var _i = 0, elements_4 = elements; _i < elements_4.length; _i++) {
		var element = elements_4[_i];
		if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) continue;
		var key = element.dataset.luscentBind;
		if (!key || !(key in context.state)) continue;
		var value = context.state[key];
		element.value = String(value || "");
	}
}
function bindTwoWay(context, methods, updateStateFn, root) {
	var _this = this;
	if (root === void 0) root = document;
	var elements = findElementsByAttribute("data-luscent-bind", root);
	var _loop_2 = function(element$1) {
		if (!(element$1 instanceof HTMLInputElement || element$1 instanceof HTMLTextAreaElement)) return "continue";
		var key = element$1.dataset.luscentBind;
		if (!key) return "continue";
		if (element$1.dataset.luscentBound === "true") return "continue";
		element$1.dataset.luscentBound = "true";
		element$1.addEventListener("input", function() {
			return __awaiter(_this, void 0, void 0, function() {
				var newState;
				var _a;
				return __generator(this, function(_b) {
					switch (_b.label) {
						case 0:
							newState = (_a = {}, _a[key] = element$1.value, _a);
							return [4, updateStateFn(newState)];
						case 1:
							_b.sent();
							return [2];
					}
				});
			});
		});
	};
	for (var _i = 0, elements_5 = elements; _i < elements_5.length; _i++) {
		var element = elements_5[_i];
		_loop_2(element);
	}
}
function bindEvents(context, methods, root) {
	var _this = this;
	if (root === void 0) root = document;
	var elements = Array.from(root.querySelectorAll("[data-luscent-on][data-luscent-trigger]"));
	var _loop_3 = function(element$1) {
		if (!(element$1 instanceof HTMLElement)) return "continue";
		if (element$1.dataset.luscentBound === "true") return "continue";
		var eventName = element$1.dataset.luscentOn;
		var methodName = element$1.dataset.luscentTrigger;
		if (!eventName || !methodName || !methods[methodName]) return "continue";
		element$1.dataset.luscentBound = "true";
		element$1.addEventListener(eventName, function(event) {
			return __awaiter(_this, void 0, void 0, function() {
				var id;
				var _a;
				return __generator(this, function(_b) {
					switch (_b.label) {
						case 0:
							if (element$1.dataset.luscentPreventDefault === "true") event.preventDefault();
							id = element$1.dataset.luscentId || ((_a = element$1.closest("[data-luscent-id]")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-luscent-id")) || undefined;
							return [4, methods[methodName](context.state, event, id)];
						case 1:
							_b.sent();
							return [2];
					}
				});
			});
		});
	};
	for (var _i = 0, elements_6 = elements; _i < elements_6.length; _i++) {
		var element = elements_6[_i];
		_loop_3(element);
	}
}
function updateDOM(context_1, getters_1, methods_1, conditions_1, lists_1, attributes_1) {
	return __awaiter(this, arguments, Promise, function(context, getters, methods, conditions, lists, attributes, root) {
		if (root === void 0) root = document;
		return __generator(this, function(_a) {
			switch (_a.label) {
				case 0: return [4, renderIf(context, getters, methods, conditions, lists, attributes, root)];
				case 1:
					_a.sent();
					return [4, renderFor(context, getters, methods, conditions, lists, attributes, root)];
				case 2:
					_a.sent();
					return [4, renderValue(context, getters, root)];
				case 3:
					_a.sent();
					renderAttributes(context, attributes, root);
					renderBind(context, root);
					return [2];
			}
		});
	});
}
function start(parameters) {
	var _this = this;
	var state = parameters.state || {};
	var methods = parameters.methods || {};
	var getters = parameters.getters || {};
	var conditions = parameters.conditions || {};
	var lists = parameters.lists || {};
	var attributes = parameters.attributes || {};
	var context = { state };
	var updateState = function(newState) {
		return __awaiter(_this, void 0, Promise, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						Object.assign(context.state, newState);
						return [4, updateDOM(context, getters, methods, conditions, lists, attributes)];
					case 1:
						_a.sent();
						bindEvents(context, methods, document);
						bindTwoWay(context, methods, updateState, document);
						return [2];
				}
			});
		});
	};
	setTimeout(function() {
		return __awaiter(_this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, updateDOM(context, getters, methods, conditions, lists, attributes)];
					case 1:
						_a.sent();
						bindEvents(context, methods, document);
						bindTwoWay(context, methods, updateState, document);
						console.log("Luscent initialized successfully");
						return [2];
				}
			});
		});
	}, 0);
	return { updateState };
}

//#endregion
export { start };