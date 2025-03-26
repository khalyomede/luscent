import Condition from "./condition";
import Context from "./context";
import Getter from "./getter";
import updateDOM from "./update-dom";
import List from "./list";
import Method from "./method";
import findByXpath from "./find-by-xpath";

const bindTwoWay = <T>(context: Context<T>, getters: Record<string, Getter<T>>, methods: Record<string, Method<T>>, conditions: Record<string, Condition<T>>, lists: Record<string, List<T>>): void => {
    const elements = findByXpath(`//*[./@*[starts-with(name(), "data-luscent-on-") and substring(name(), string-length(name()) - 4) = "-bind"]]`);

    // Process each element
    for (const element of elements) {
        const elementId = element.id;
        const elementHasId = elementId.trim().length > 0;

        // Get the dataset keys that match our pattern
        const keys = Object.keys(element.dataset).filter(key =>
            key.startsWith('luscentOn') && key.endsWith('Bind')
        );

        for (const key of keys) {
            // Extract the event name (e.g., "input" from "luscentOnInputBind")
            const eventName = key.replace('luscentOn', '').replace('Bind', '').toLowerCase();
            const stateKey = element.dataset[key];

            // Create a bound attribute name for this binding
            const boundAttributeName = `luscentOn${eventName.charAt(0).toUpperCase() + eventName.slice(1)}BindBound`;

            // Skip if already bound
            if (element.dataset[boundAttributeName] === 'true') {
                continue;
            }

            if (!stateKey) {
                if (elementHasId) {
                    console.warn(`Please specify a key when using data-luscent-on-${eventName}-bind on the element with id "${elementId}".`);
                } else {
                    console.warn(`Please specify a key when using data-luscent-on-${eventName}-bind.`);
                }
                continue;
            }

            if (!(element instanceof HTMLInputElement)) {
                if (elementHasId) {
                    console.warn(`It seems you tried to bind a value (using data-luscent-on-${eventName}-bind="${stateKey}") on the element with id "${elementId}" that is not an HTMLInputElement. This won't make the data reactive.`);
                } else {
                    console.warn(`It seems you tried to bind a value (using data-luscent-on-${eventName}-bind="${stateKey}") on an element that is not an HTMLInputElement. This won't make the data reactive.`);
                }
                continue;
            }

            // Add the event listener
            element.addEventListener(eventName, (event: Event): void => {
                if (!(event instanceof InputEvent)) {
                    return;
                }

                const target = event.target as HTMLInputElement;

                context.state = {
                    ...context.state,
                    [stateKey]: target.value
                };

                updateDOM(context, getters, methods, conditions, lists);
            });

            // Mark as bound
            element.dataset[boundAttributeName] = 'true';
        }
    }
};

export default bindTwoWay;
