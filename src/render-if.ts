import Condition from "./condition";
import Context from "./context";

/**
 * This method will find all [data-luscent-if] and show the element if the condition met, or hide it otherwise.
 */
const renderIf = <T>(context: Context<T>, conditions: Record<string, Condition<T>>): void => {
    const elements = Array.from(document.querySelectorAll('[data-luscent-if]'));

    for (const element of elements) {
        if (!(element instanceof HTMLElement)) {
            return;
        }

        const elementId = element.id;
        const elementHasId = elementId.length > 0;
        const key = element.dataset.luscentIf;

        if (key === undefined) {
            if (elementHasId) {
                console.warn(`The element with id "${elementId}" cannot be shown/hidden because data-luscent-if target an empty key.`);
            } else {
                console.warn("An element cannot be shown/hidden because data-luscent-if target an empty key.");
            }

            return;
        }

        if (!(key in conditions)) {
            if (elementHasId) {
                console.warn(`The element with id "${elementId}" could not be shown/hidden because it uses data-luscent-if="${key}" but no conditions was found with this key`);
            } else {
                console.warn(`An element could not be shown/hidden because it uses data-luscent-if="${key}" but no conditions was found with this key`);

            }

            return;
        }

        const value = conditions[key](context.state);

        if (value) {
            element.style.removeProperty('display');
        } else {
            element.style.display = 'none';
        }
    }
};

export default renderIf;
