import List from "./list";
import Context from "./context";
import Condition from "./condition";

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
const renderFor = <T>(context: Context<T>, lists: Record<string, List<T>>): void => {
    const elements = Array.from(document.querySelectorAll('[data-luscent-for]'));

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

        // Clear the element's content
        element.textContent = "";

        // Get the list of items
        const items = lists[key](context.state);

        // For each item, clone the template and fill in the values
        for (const item of items) {
            const clone = template.content.cloneNode(true) as DocumentFragment;

            // Find all elements with data-luscent-value in the clone
            const valueElements = Array.from(clone.querySelectorAll('[data-luscent-value]'));

            for (const valueElement of valueElements) {
                if (!(valueElement instanceof HTMLElement)) {
                    continue;
                }

                const propName = valueElement.getAttribute('data-luscent-value');

                if (!propName) {
                    continue;
                }

                // Set the element's content to the item's property value
                if (propName in item) {
                    const value = item[propName];

                    if (valueElement instanceof HTMLInputElement) {
                        valueElement.value = value;
                    } else {
                        valueElement.textContent = value;
                    }
                }
            }

            // Append the filled-in template to the element
            element.appendChild(clone);
        }
    }
};

export default renderFor;
