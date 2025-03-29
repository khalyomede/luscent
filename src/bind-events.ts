import Method from "./method";
import findByXpath from "./find-by-xpath";
import Context from "./context";

/**
 * This method registers the event handler that react to DOM events.
 *
 * Each events goal is to return a new state to trigger a new UI change.
 */
const bindEvents = <T>(state: Partial<T>, context: Context<T>, methods: Record<string, Method<T>>, target: Document | HTMLElement): void => {
    console.debug("binding events");

    console.debug("target is", target);

    const nodes = findByXpath(`//*[./@*[starts-with(name(), "data-luscent-on-")]]`, target);

    // Convert XPath result to array
    for (const node of nodes) {
        console.debug("Found element matching data-luscent-on", node);

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
            console.log("binding event to element", {
                eventName,
                methodName,
                node,
            });

            node.addEventListener(eventName, async (event) => {
                if (eventName === "submit") {
                    event.preventDefault();
                }

                const id = node.dataset.luscentForId;

                // Update state using the method
                await methods[methodName](context.state, event, id);
            }, {
                passive: eventName !== "submit",
                capture: true
            });

            // Mark as bound with the specific event attribute
            node.dataset[boundAttributeName] = "true";
        }
    }
}

export default bindEvents;
