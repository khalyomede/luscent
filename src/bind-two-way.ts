import Condition from "./condition";
import Context from "./context";
import Getter from "./getter";
import updateDOM from "./update-dom";
import List from "./list";
import Method from "./method";

const bindTwoWay = <T>(context: Context<T>, getters: Record<string, Getter<T>>, methods: Record<string, Method<T>>, conditions: Record<string, Condition<T>>, lists: Record<string, List<T>>): void => {
    const elements = Array.from(document.querySelectorAll('[data-luscent-on-input-bind]'));

    for (const element of elements) {
        if (!(element instanceof HTMLElement)) {
            continue;
        }

        const elementId = element.id;
        const elementHasId = elementId.trim().length > 0;

        const key = element.dataset.luscentOnInputBind;

        if (key === undefined) {
            if (elementHasId) {
                console.warn(`Please specify a key when using data-luscent-on-input-bind on the element with id "${elementId}".`);
            } else {
                console.warn(`Please specify a key when using data-luscent-on-input-bind.`);
            }

            return;
        }

        if (!(element instanceof HTMLInputElement)) {
            if (elementHasId) {
                console.warn(`It seems you tried to bind a value (using data-luscent-on-input-bind="${key}") on the element with id "${elementId}" that is not an HTMLInputElement. This won't make the data reactive.`);
            } else {
                console.warn(`It seems you tried to bind a value (using data-luscent-on-input-bind="${key}") on an element that is not an HTMLInputElement. This won't make the data reactive.`);
            }

            continue;
        }

        element.addEventListener("input", (event: Event): void => {
            if (!(event instanceof InputEvent)) {
                return;
            }

            const target = event.target as HTMLInputElement;

            context.state = {
                ...context.state,
                [key]: target.value
            };

            updateDOM(context, getters, methods, conditions, lists);
        });
    }
};

export default bindTwoWay;
