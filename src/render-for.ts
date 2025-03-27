import List from "./list";
import Context from "./context";
import Condition from "./condition";
import Getter from "./getter";
import updateDOM from "./update-dom";
import renderId from "./render-id";
import bindEvents from "./bind-events";
import Method from "./method";

/**
 * This method will find all [data-luscent-for] and render a template for each item in the list.
 *
 * For each element with data-luscent-for, it:
 * 1. Gets the list name from the attribute
 * 2. Gets the template ID from data-luscent-template
 * 3. Clears the element
 * 4. For each item in the list:
 *    a. Clones the template
 *    b. Finds all elements with data-luscent-value in the clone
 *    c. Sets each element's content to the corresponding property of the item
 *    d. Appends the clone to the element
 */
const renderFor = <T>(context: Context<T>, getters: Record<string, Getter<T>>, methods: Record<string, Method<T>>, conditions: Record<string, Condition<T>>, lists: Record<string, List<T>>, element?: HTMLElement): void => {
    const target = element ?? document;
    const elements = Array.from(target.querySelectorAll('[data-luscent-for]'));

    for (const element of elements) {
        if (!(element instanceof HTMLElement)) {
            continue;
        }

        const elementId = element.id;
        const elementHasId = elementId.length > 0;
        const key = element.dataset.luscentFor;

        if (key === undefined) {
            if (elementHasId) {
                console.warn(`The element with id "${elementId}" cannot iterate because data-luscent-for targets an empty key.`);
            } else {
                console.warn("An element cannot iterate because data-luscent-for targets an empty key.");
            }
            continue;
        }

        if (!(key in lists)) {
            if (elementHasId) {
                console.warn(`The element with id "${elementId}" could not iterate because it uses data-luscent-for="${key}" but no list was found with this key.`);
            } else {
                console.warn(`An element could not iterate because it uses data-luscent-for="${key}" but no list was found with this key.`);
            }
            continue;
        }

        const templateId = element.dataset.luscentTemplate;

        if (templateId === undefined) {
            if (elementHasId) {
                console.warn(`The element with id "${elementId}" could not iterate because it has an empty data-luscent-template.`);
            } else {
                console.warn(`An element could not iterate because it has an empty data-luscent-template.`);
            }
            continue;
        }

        const template = document.getElementById(templateId);

        if (template === null || !(template instanceof HTMLTemplateElement)) {
            if (elementHasId) {
                console.warn(`The element with id "${elementId}" could not iterate because no template exists with id data-luscent-template="${templateId}".`);
            } else {
                console.warn(`An element could not iterate because no template exists with id data-luscent-template="${templateId}".`);
            }
            continue;
        }

        // Get the list of items
        const items = lists[key](context.state);

        const keyName = element.dataset.luscentKey;

        if (keyName === undefined) {
            /**
             * @todo console.warn
             */
            continue;
        }

        // For each item, clone the template and fill in the values
        for (const item of items) {
            // We search for an HTMLElement within "element" that would have the same key as the one in "item".
            // If this is the case, we just skip appending this element.
            const keyValue = item[keyName];
            const existingElement = element.querySelector(`[data-luscent-key="${keyValue}"]`);

            if (existingElement !== null) {
                console.debug(`skipping rendering for element with id ${keyValue}`);

                continue;
            }

            const clone = template.content.cloneNode(true);

            const cloneChildren = Array.from(clone.childNodes).filter((child) => child instanceof HTMLElement);

            for (const child of cloneChildren) {
                child.dataset.luscentKey = keyValue;
            }

            // Append the filled-in template to the element
            element.appendChild(clone);

            const addedElements = Array.from(document.querySelectorAll(`[data-luscent-key="${keyValue}"]`));

            for (const addedElement of addedElements) {
                renderId(addedElement as HTMLElement, item);

                updateDOM(context, getters, methods, conditions, lists, addedElement as HTMLElement, item);
            }
        }
    }
};

export default renderFor;
