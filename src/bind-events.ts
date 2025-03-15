import Getter from "./getter";
import Method from "./method";
import updateDOM from "./update-dom";
import Context from "./context";
import Condition from "./condition";
import List from "./list";

/**
 * This method registers the event handler that react to DOM events.
 *
 * Each events goal is to return a new state to trigger a new UI change.
 */
const bindEvents = <T>(context: Context<T>, getters: Record<string, Getter<T>>, methods: Record<string, Method<T>>, conditions: Record<string, Condition<T>>, lists: Record<string, List<T>>, element?: HTMLElement): void => {
    const target = element ?? document;

    target.querySelectorAll('[data-luscent-on-click]').forEach(element => {
        const methodName = element.getAttribute('data-luscent-on-click');

        if (methodName && methods[methodName]) {
            element.addEventListener('click', (event) => {
                const id = (element as HTMLElement).dataset.luscentRenderedId;

                // Update state using the method
                context.state = methods[methodName](context.state, event, id);
                // Update DOM with new state
                updateDOM(context, getters, methods, conditions, lists);
            });
        }
    });

    target.querySelectorAll('[data-luscent-on-submit]').forEach(element => {
        const methodName = element.getAttribute('data-luscent-on-submit');

        if (methodName && methods[methodName]) {
            element.addEventListener('submit', (event) => {
                event.preventDefault();

                const id = (element as HTMLElement).dataset.luscentRenderedId;

                // Update state using the method
                context.state = methods[methodName](context.state, event, id);
                // Update DOM with new state
                updateDOM(context, getters, methods, conditions, lists);
            });
        }
    });
}

export default bindEvents;
