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

    const xpathExpression = `//*[./@*[starts-with(name(), "data-luscent-on-")]]`;

    // Execute the XPath query
    const xpathResult = document.evaluate(
        xpathExpression,
        target,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    // Convert XPath result to array
    for (let i = 0; i < xpathResult.snapshotLength; i++) {
        const node = xpathResult.snapshotItem(i);
        if (node instanceof HTMLElement) {
            const keys = Object.keys(node.dataset);
            const isTwoWayBinding = keys.some((key) => key.endsWith("Bind"));

            if (isTwoWayBinding) {
                continue;
            }

            const luscentEventName = (keys.filter((key) => key.startsWith("luscentOn"))[0] ?? "")
            const eventName = luscentEventName.replace("luscentOn", "").toLowerCase();
            const methodName = node.dataset[luscentEventName];

            // Create the bound attribute name for this event
            const boundAttributeName = `luscentOn${eventName.charAt(0).toUpperCase() + eventName.slice(1)}Bound`;

            // Skip if already bound for this event
            if (node.dataset[boundAttributeName] === "true") {
                continue;
            }

            if (methodName && methods[methodName]) {
                node.addEventListener(eventName, (event) => {
                    if (eventName === "submit") {
                        event.preventDefault();
                    }

                    const id = node.dataset.luscentRenderedId;

                    // Update state using the method
                    context.state = methods[methodName](context.state, event, id);
                    // Update DOM with new state
                    updateDOM(context, getters, methods, conditions, lists);
                }, {
                    passive: eventName !== "submit",
                    capture: true
                });

                // Mark as bound with the specific event attribute
                node.dataset[boundAttributeName] = "true";
            }
        }
    }
}

export default bindEvents;
