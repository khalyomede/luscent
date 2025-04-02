import Method from "./method";
import Context from "./context";

/**
 * This method registers the event handler that react to DOM events.
 *
 * Each events goal is to return a new state to trigger a new UI change.
 */
const bindEvents = <T>(state: Partial<T>, context: Context<T>, methods: Record<string, Method<T>>, target: Document | HTMLElement): void => {
    const elements = Array.from(document.querySelectorAll("[data-luscent-on][data-luscent-trigger]:not([data-luscent-bound])"));

    for (const element of elements) {
        if (!(element instanceof HTMLElement)) {
            continue;
        }

        const methodName = element.dataset.luscentTrigger;

        if (methodName === undefined || !(methodName in methods)) {
            continue;
        }

        const eventName = element.dataset.luscentOn;

        if (eventName === undefined) {
            continue;
        }

        const prevent = element.dataset.luscentPreventDefault;

        element.addEventListener(eventName, async (event) => {
            if (prevent !== undefined) {
                event.preventDefault();
            }

            const id = element.dataset.luscentRenderedId;

            await methods[methodName](context.state, event, id);
        }, {
            passive: prevent === undefined,
            capture: true,
        });

        element.dataset.luscentBound = String(true);
    }
}

export default bindEvents;
