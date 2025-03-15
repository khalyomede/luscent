import Context from "./context";

/**
 * This method updates all input elements with data-luscent-on-input-bind attributes
 * to reflect the current state values.
 *
 * It completes the two-way binding process by handling the state → DOM direction
 * (the DOM → state direction is handled by the bindTwoWay function).
 */
const renderBind = <T>(context: Context<T>, element?: HTMLElement): void => {
    const target = element ?? document;
    const elements = Array.from(target.querySelectorAll('[data-luscent-on-input-bind]'));

    for (const element of elements) {
        if (!(element instanceof HTMLElement)) {
            continue;
        }

        const elementId = element.id;
        const elementHasId = elementId.trim().length > 0;
        const key = element.dataset.luscentOnInputBind;

        if (key === undefined) {
            if (elementHasId) {
                console.warn(`The element with id "${elementId}" has an empty data-luscent-on-input-bind attribute. Cannot sync with state.`);
            } else {
                console.warn(`An element has an empty data-luscent-on-input-bind attribute. Cannot sync with state.`);
            }
            continue;
        }

        if (!(key in (context.state as Object))) {
            if (elementHasId) {
                console.warn(`The element with id "${elementId}" has data-luscent-on-input-bind="${key}", but no corresponding state property exists.`);
            } else {
                console.warn(`An element has data-luscent-on-input-bind="${key}", but no corresponding state property exists.`);
            }
            continue;
        }

        if (!(element instanceof HTMLInputElement)) {
            if (elementHasId) {
                console.warn(`The element with id "${elementId}" has data-luscent-on-input-bind="${key}" but is not an input element. Cannot sync with state.`);
            } else {
                console.warn(`An element has data-luscent-on-input-bind="${key}" but is not an input element. Cannot sync with state.`);
            }
            continue;
        }

        // Get the state value and update the input
        const value = context.state[key as keyof T];
        element.value = String(value);
    }
};

export default renderBind;
