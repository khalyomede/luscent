import Method from "./method";
import updateDOM from "./update-dom";

/**
 * This method registers the event handler that react to DOM events.
 *
 * Each events goal is to return a new state to trigger a new UI change.
 */
const bindEvents = <T>(methods: Record<string, Method<T>>, state: T): void => {
    document.querySelectorAll('[data-luscent-on-click]').forEach(element => {
        const methodName = element.getAttribute('data-luscent-on-click');

        if (methodName && methods[methodName]) {
            element.addEventListener('click', (event) => {
                // Update state using the method
                state = methods[methodName](state, event);
                // Update DOM with new state
                updateDOM(state);
            });
        }
    });
}

export default bindEvents;
